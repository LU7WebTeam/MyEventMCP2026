import assert from 'node:assert/strict';
import test from 'node:test';
import { adminQuoteText, quoteDeliveries, validateQuote, visitorQuoteText } from '../src/lib/quote.mjs';

test('accepts a lead with no email and still notifies the team only', () => {
  const result = validateQuote({
    name: 'Aina Rahman',
    phone: '011 3307 8724',
    'event-date': '2026-12-01',
    message: 'Conference at KLCC',
    source: '/events/broadcast-video-production/',
  });
  assert.equal(result.ok, true);
  assert.equal(result.lead.email, '');
  const deliveries = quoteDeliveries(result.lead, 'hello@myeventmcp.com');
  assert.deepEqual(deliveries.map((item) => item.kind), ['admin']);
  const text = adminQuoteText(result.lead, 'https://myeventmcp.com');
  assert.match(text, /Email: -/);
  assert.match(text, /Event date: 2026-12-01/);
  assert.match(text, /broadcast-video-production/);
});

test('sends a visitor confirmation only when an email is present', () => {
  const result = validateQuote({
    name: 'Aina Rahman',
    email: 'Aina@Example.com',
    phone: '+60 3 8605 3563',
    'event-date': '2026-12-02',
  });
  assert.equal(result.lead.email, 'aina@example.com');
  const deliveries = quoteDeliveries(result.lead, 'hello@myeventmcp.com');
  assert.deepEqual(deliveries.map((item) => item.to), ['hello@myeventmcp.com', 'aina@example.com']);
  assert.match(visitorQuoteText(result.lead), /Thank you Aina Rahman/);
});

test('rejects a missing phone or event date, and a malformed optional email', () => {
  assert.equal(validateQuote({ name: 'Aina', phone: '123', 'event-date': '2026-12-01' }).status, 422);
  assert.equal(validateQuote({ name: 'Aina', phone: '0123456789' }).status, 422);
  const badEmail = validateQuote({ name: 'Aina', phone: '0123456789', 'event-date': '2026-12-01', email: 'not-an-email' });
  assert.equal(badEmail.ok, false);
  assert.match(badEmail.message, /email/i);
});

test('honeypot submissions are accepted without a lead', () => {
  const result = validateQuote({ website: 'https://spam.example', name: 'Bot' });
  assert.equal(result.ok, true);
  assert.equal(result.honeypot, true);
  assert.equal(result.lead, undefined);
});
