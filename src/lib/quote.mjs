const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuote(body = {}) {
  const honeypot = String(body.website || '').trim();
  if (honeypot !== '') return { ok: true, honeypot: true };

  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().toLowerCase().slice(0, 200);
  const phone = String(body.phone || '').trim().slice(0, 60);
  const eventType = String(body['event-type'] || '').trim().slice(0, 120);
  const eventDate = String(body['event-date'] || '').trim().slice(0, 40);
  const message = String(body.message || '').trim().slice(0, 5000);
  const source = String(body.source || '').trim().slice(0, 200);
  const phoneDigits = phone.replace(/\D/g, '');

  if (!name || phoneDigits.length < 8 || !eventDate) {
    return {
      ok: false,
      status: 422,
      message: 'Please provide your name, phone number and event date.',
    };
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      status: 422,
      message: 'Please check the email address, or leave it blank.',
    };
  }

  return {
    ok: true,
    lead: { name, email, phone, eventType, eventDate, message, source },
  };
}

export function adminQuoteText(lead, siteUrl) {
  return [
    `New quote request from ${siteUrl}`,
    lead.source ? `Page: ${lead.source}` : null,
    '----------------------------------',
    `Name: ${lead.name}`,
    `Email: ${lead.email || '-'}`,
    `Phone: ${lead.phone}`,
    `Event date: ${lead.eventDate}`,
    `Event type: ${lead.eventType || '-'}`,
    'Message:',
    lead.message || '-',
    '----------------------------------',
  ].filter((line) => line !== null).join('\n');
}

export function visitorQuoteText(lead) {
  return [
    `Thank you ${lead.name}.`,
    '',
    'We have received your enquiry and will be in touch shortly.',
    `Event date: ${lead.eventDate}`,
    lead.message ? `Your note: ${lead.message}` : null,
    '',
    'If your event is urgent, call 03-8605 3563 or WhatsApp us.',
  ].filter((line) => line !== null).join('\n');
}

export function quoteDeliveries(lead, admin) {
  const deliveries = [{ to: admin, subject: `New quote request - ${lead.name}`, kind: 'admin' }];
  if (lead.email) {
    deliveries.push({ to: lead.email, subject: 'Thank you - your MyEventMCP enquiry', kind: 'visitor' });
  }
  return deliveries;
}
