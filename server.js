import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
  // Honeypot: a real human never fills this hidden field.
  const honeypot = String(req.body.website || '').trim();
  if (honeypot !== '') return res.json({ success: true, message: 'OK' });

  const name = String(req.body.name || '').trim().slice(0, 120);
  const email = String(req.body.email || '').trim().toLowerCase().slice(0, 200);
  const phone = String(req.body.phone || '').trim().slice(0, 60);
  const eventType = String(req.body['event-type'] || '').trim().slice(0, 120);
  const message = String(req.body.message || '').trim().slice(0, 5000);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ success: false, message: 'Please provide your name and a valid email address.' });
  }

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

  const body = [
    `New quote request from ${process.env.SITE_URL || 'https://myeventmcp.com'}`,
    '----------------------------------',
    `Name: ${name || '-'}`,
    `Email: ${email}`,
    `Phone: ${phone || '-'}`,
    `Event type: ${eventType || '-'}`,
    'Message:',
    message || '-',
    '----------------------------------',
  ].join('\n');

  const send = (to, subject) =>
    transporter.sendMail({ from, to, subject, text: body });

  Promise.all([
    send(admin, `New quote request - ${name || 'website'}`),
    send(email, 'Thank you - your MyEventMCP enquiry'),
  ])
    .then(() => res.json({ success: true, message: 'Thank you! Your enquiry has been received. We will be in touch shortly.' }))
    .catch((err) => {
      console.error('[quote] send failed', err);
      res.status(500).json({ success: false, message: 'Your enquiry could not be sent right now. Please try again or message us on WhatsApp.' });
    });
});

app.listen(PORT, () => {
  console.log(`MyEventMCP server running on http://localhost:${PORT}`);
});