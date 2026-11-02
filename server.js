import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { adminQuoteText, quoteDeliveries, validateQuote, visitorQuoteText } from './src/lib/quote.mjs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 4321);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Quote request endpoint.
// Configure SMTP via env vars (see .env.example). Never commit real credentials.
// Works with SendGrid SMTP (host smtp.sendgrid.net, user "apikey", pass = SG API key)
// and any other SMTP provider.
app.post('/api/quote', (req, res) => {
  const parsed = validateQuote(req.body || {});
  if (!parsed.ok) return res.status(parsed.status).json({ success: false, message: parsed.message });
  // Honeypot: acknowledge it without emailing anyone or asking the page to count a conversion.
  if (parsed.honeypot) return res.json({ success: true, tracked: false, message: 'OK' });

  const smtpPass = process.env.SMTP_PASS || '';
  if (!smtpPass) {
    console.error('[quote] SMTP_PASS not configured on server.');
    return res.status(500).json({ success: false, message: 'Our quote service is not configured on the server yet.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'apikey',
      pass: smtpPass,
    },
  });

  const from = process.env.FROM_EMAIL || 'hello@myeventmcp.com';
  const admin = process.env.ADMIN_EMAIL || 'hello@myeventmcp.com';
  const siteUrl = process.env.SITE_URL || 'https://myeventmcp.com';
  const lead = parsed.lead;

  const deliveries = quoteDeliveries(lead, admin).map((delivery) => transporter.sendMail({
    from,
    to: delivery.to,
    subject: delivery.subject,
    text: delivery.kind === 'visitor' ? visitorQuoteText(lead) : adminQuoteText(lead, siteUrl),
    replyTo: delivery.kind === 'admin' && lead.email ? lead.email : undefined,
  }));

  Promise.all(deliveries)
    .then(() => res.json({ success: true, message: 'Thank you. We have received your enquiry and will be in touch shortly.' }))
    .catch((err) => {
      console.error('[quote] send failed', err);
      res.status(500).json({ success: false, message: 'Your enquiry could not be sent right now. Please try again or message us on WhatsApp.' });
    });
});

app.listen(PORT, () => {
  console.log(`MyEventMCP server running on http://localhost:${PORT}`);
});