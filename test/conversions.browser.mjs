import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const EMAIL_CONVERSION_SEND_TO = 'AW-16949747149/luaeCNeJtbIaEM27opI_';
const QUOTE_CONVERSION_SEND_TO = 'AW-16949747149/lyEpCMaitbIaEM27opI_';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const WHATSAPP_SEND_TO = 'AW-16949747149/3oz2CL6Xub0aEM27opI_';

const PAGES = [
  '/',
  '/privacy-policy/',
  '/terms-services/',
  '/silver-mcp-package/',
  '/gold-mcp-package/',
  '/diamond-mcp-package/',
  '/ptz-robocam-setup/',
  '/customised-solution/',
  '/events/',
  '/events/corporate-conferences/',
  '/events/broadcast-video-production/',
  '/locations/',
  '/locations/kuala-lumpur/',
  '/locations/penang/',
];

const FORM_PAGES = [
  ['/', 'homepage-enquiry'],
  ['/events/broadcast-video-production/', 'events-broadcast-video-production'],
  ['/locations/kuala-lumpur/', 'locations-kuala-lumpur'],
];

function pageBundle(file) {
  const html = fs.readFileSync(file, 'utf8');
  let source = html;
  for (const match of html.matchAll(/\ssrc="([^"]+\.js)"/g)) {
    const src = match[1].split('?')[0];
    if (/^https?:/i.test(src)) continue;
    const resolved = src.startsWith('/') ? path.join(dist, src) : path.join(path.dirname(file), src);
    if (fs.existsSync(resolved)) source += `\n${fs.readFileSync(resolved, 'utf8')}`;
  }
  return { html, source };
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('\0') || pathname.includes('..')) {
      res.writeHead(400);
      res.end();
      return;
    }
    let file = path.join(dist, pathname);
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
    else if (!path.extname(file) && fs.existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html');
    if (!file.startsWith(dist) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    const types = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.webp': 'image/webp',
      '.png': 'image/png',
      '.woff2': 'font/woff2',
      '.svg': 'image/svg+xml',
      '.xml': 'application/xml',
      '.txt': 'text/plain',
    };
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function conversionCalls(pushes, sendTo) {
  return pushes.filter((entry) => entry.kind === 'gtag' && entry.name === 'conversion' && entry.params?.send_to === sendTo);
}

async function arm(page) {
  await page.waitForFunction(() => document.querySelectorAll('script[src*="gtag/js?id=AW-16949747149"]').length === 1, null, { timeout: 15000 });
  await page.evaluate(() => {
    window.__pushes = [];
    const orig = window.dataLayer.push;
    window.dataLayer.push = function pushRecorded() {
      const first = arguments[0];
      if (first && typeof first === 'object') {
        if (first[0] === 'event') {
          const params = first[2] && typeof first[2] === 'object' ? { ...first[2] } : undefined;
          window.__pushes.push({ kind: 'gtag', name: first[1], params });
        } else if (typeof first.event === 'string') {
          window.__pushes.push({ kind: 'dataLayer', event: first.event, transaction_id: first.transaction_id || '' });
        }
      }
      return orig.apply(this, arguments);
    };
  });
}

async function pushes(page) {
  return page.evaluate(() => window.__pushes || []);
}

async function tagCounts(page) {
  return page.evaluate(() => ({
    aw: document.querySelectorAll('script[src*="gtag/js?id=AW-16949747149"]').length,
    ga4: document.querySelectorAll('script[src*="gtag/js?id=G-1MP8QE5GML"]').length,
    gtm: document.querySelectorAll('script[src*="gtm.js?id=GTM-525XZTSF"]').length,
  }));
}

async function clickLink(page, selector) {
  await page.locator(selector).first().evaluate((el) => el.click());
}

async function fillLead(page, { website = '' } = {}) {
  await page.locator('[data-quote-form] input[name="name"]').fill('Aina Rahman');
  await page.locator('[data-quote-form] input[name="phone"]').fill('0123456789');
  await page.locator('[data-quote-form] input[name="event-date"]').fill('2026-12-01');
  if (website) await page.locator('[data-quote-form] input[name="website"]').fill(website);
}

test('built pages ship one email conversion and do not hardcode a second Ads loader', () => {
  assert.equal(fs.existsSync(dist), true, 'run npm run build before this test');
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
  assert.ok(htmlFiles.length > 10);
  const evidence = [];
  for (const file of htmlFiles) {
    const { html } = pageBundle(file);
    const rel = path.relative(dist, file);
    const emailHits = html.split(EMAIL_CONVERSION_SEND_TO).length - 1;
    const hardcodedLoader = (html.match(/<script[^>]+src=["'][^"']*gtag\/js\?id=AW-16949747149/g) || []).length;
    const gtm = (html.match(/'GTM-525XZTSF'/g) || []).length;
    const gtmNoscript = (html.match(/ns\.html\?id=GTM-525XZTSF/g) || []).length;
    assert.equal(emailHits, 1, `${rel} should include the email send_to once`);
    assert.equal(hardcodedLoader, 0, `${rel} should not embed a second AW gtag.js loader`);
    assert.equal(gtm, 1, `${rel} should load GTM once`);
    assert.equal(gtmNoscript, 1, `${rel} should include one GTM noscript iframe`);
    assert.equal((html.match(/601133078724/g) || []).length > 0, true, `${rel} should keep the WhatsApp number`);
    evidence.push(rel);
  }
  const quoted = htmlFiles.filter((file) => pageBundle(file).html.includes('data-quote-form'));
  assert.deepEqual(quoted.map((file) => '/' + path.relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/')).sort(), [
    '/',
    '/events/broadcast-video-production/',
    '/locations/kuala-lumpur/',
  ]);
  for (const file of quoted) {
    const { source } = pageBundle(file);
    assert.equal(source.split(QUOTE_CONVERSION_SEND_TO).length - 1, 1, path.relative(dist, file));
  }
  assert.equal(evidence.length, htmlFiles.length);
});

test('gtag conversions fire once on success and on mailto clicks, and the Ads tag loads once', { timeout: 180000 }, async () => {
  const { server, port } = await startServer();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const adsLabels = [];
  page.on('request', (req) => {
    const url = req.url();
    if (!url.startsWith('https://www.googleadservices.com/pagead/conversion/')) return;
    const label = new URL(url).searchParams.get('label');
    const order = new URL(url).searchParams.get('oid') || '';
    if (label) adsLabels.push({ label, order });
  });
  const base = `http://127.0.0.1:${port}`;

  try {
    const runtime = [];
    for (const pathname of PAGES) {
      await page.goto(base + pathname, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('script[src*="gtag/js?id=AW-16949747149"]').length === 1 && document.querySelectorAll('script[src*="gtag/js?id=G-1MP8QE5GML"]').length === 1, null, { timeout: 15000 });
      const counts = await tagCounts(page);
      assert.deepEqual(counts, { aw: 1, ga4: 1, gtm: 1 }, pathname);
      runtime.push({ pathname, ...counts });
    }

    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await arm(page);

    await page.locator('[data-quote-submit]').click();
    await page.waitForTimeout(300);
    let seen = await pushes(page);
    assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 0, 'invalid submit must not convert');
    assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 0);

    await page.route('**/api/quote', (route) => route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, message: 'We could not send your enquiry.' }),
    }));
    await fillLead(page);
    await page.locator('[data-quote-submit]').click();
    await page.waitForSelector('[data-quote-form-status].is-error');
    seen = await pushes(page);
    assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 0, 'failed submit must not convert');
    assert.equal(await page.locator('[data-quote-submit]').isEnabled(), true);

    await page.unroute('**/api/quote');
    await page.route('**/api/quote', (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, tracked: false, message: 'OK' }),
    }));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await arm(page);
    await fillLead(page, { website: 'https://spam.example' });
    await page.locator('[data-quote-submit]').click();
    await page.waitForSelector('[data-form-thanks]:not([hidden])');
    seen = await pushes(page);
    assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 0, 'honeypot must not convert');

    await page.unroute('**/api/quote');
    await page.route('**/api/quote', (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Thank you. We have received your enquiry and will be in touch shortly.' }),
    }));

    const formEvidence = [];
    for (const [pathname, formName] of FORM_PAGES) {
      adsLabels.length = 0;
      await page.goto(base + pathname, { waitUntil: 'domcontentloaded' });
      await arm(page);
      assert.equal(await page.locator('[data-quote-form]').getAttribute('data-form-name'), formName);
      await fillLead(page);
      await page.locator('[data-quote-submit]').click();
      await page.waitForSelector('[data-form-thanks]:not([hidden])');
      await page.waitForFunction((sendTo) => (window.__pushes || []).some((entry) => entry.kind === 'gtag' && entry.name === 'conversion' && entry.params && entry.params.send_to === sendTo), QUOTE_CONVERSION_SEND_TO);
      seen = await pushes(page);
      const quoteHits = conversionCalls(seen, QUOTE_CONVERSION_SEND_TO);
      assert.equal(quoteHits.length, 1, pathname);
      assert.equal(quoteHits[0].params.value, 100);
      assert.equal(quoteHits[0].params.currency, 'MYR');
      assert.ok(quoteHits[0].params.transaction_id);
      assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 0, 'form success must not call the email gtag conversion');
      assert.equal(conversionCalls(seen, WHATSAPP_SEND_TO).length, 0);
      assert.equal(seen.filter((entry) => entry.kind === 'dataLayer' && entry.event === 'quote_form_submit').length, 1);
      await page.locator('[data-quote-form]').evaluate((form) => form.requestSubmit());
      await page.waitForTimeout(200);
      seen = await pushes(page);
      assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 1, 'a second submit must not double count');
      formEvidence.push({ pathname, formName, send_to: quoteHits[0].params.send_to, transaction_id: quoteHits[0].params.transaction_id });
    }

    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await arm(page);
    adsLabels.length = 0;
    await clickLink(page, 'footer a[href^="mailto:"]');
    await page.waitForFunction((sendTo) => (window.__pushes || []).some((entry) => entry.kind === 'gtag' && entry.name === 'conversion' && entry.params && entry.params.send_to === sendTo), EMAIL_CONVERSION_SEND_TO);
    seen = await pushes(page);
    assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 1);
    assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 0);
    assert.equal(seen.filter((entry) => entry.event === 'email_click').length, 1);
    const firstEmail = conversionCalls(seen, EMAIL_CONVERSION_SEND_TO)[0];
    assert.equal(firstEmail.params.value, 20);
    assert.equal(firstEmail.params.currency, 'MYR');
    await clickLink(page, 'footer a[href^="mailto:"]');
    await page.waitForFunction((sendTo) => (window.__pushes || []).filter((entry) => entry.kind === 'gtag' && entry.name === 'conversion' && entry.params && entry.params.send_to === sendTo).length === 2, EMAIL_CONVERSION_SEND_TO);
    seen = await pushes(page);
    const emailIds = conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).map((entry) => entry.params.transaction_id);
    assert.equal(new Set(emailIds).size, 2, 'each mailto click gets its own transaction id');

    await page.goto(base + '/privacy-policy/', { waitUntil: 'domcontentloaded' });
    await arm(page);
    const privacyMails = await page.locator('a[href^="mailto:"]').count();
    assert.ok(privacyMails >= 3);
    await clickLink(page, 'main a[href^="mailto:"]');
    await page.waitForFunction((sendTo) => (window.__pushes || []).some((entry) => entry.kind === 'gtag' && entry.params && entry.params.send_to === sendTo), EMAIL_CONVERSION_SEND_TO);
    seen = await pushes(page);
    assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 1);

    await page.goto(base + '/terms-services/', { waitUntil: 'domcontentloaded' });
    await arm(page);
    await clickLink(page, 'main a[href^="mailto:"]');
    await page.waitForFunction((sendTo) => (window.__pushes || []).some((entry) => entry.kind === 'gtag' && entry.params && entry.params.send_to === sendTo), EMAIL_CONVERSION_SEND_TO);
    seen = await pushes(page);
    assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 1);

    await page.goto(base + '/silver-mcp-package/', { waitUntil: 'domcontentloaded' });
    await arm(page);
    await clickLink(page, 'a[href^="tel:"]');
    await page.waitForTimeout(300);
    seen = await pushes(page);
    assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 0);
    assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 0);
    assert.equal(seen.filter((entry) => entry.event === 'phone_click').length, 1);

    adsLabels.length = 0;
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await arm(page);
    await clickLink(page, 'a[href*="wa.me/601133078724"]');
    await page.waitForFunction(() => (window.__pushes || []).some((entry) => entry.event === 'whatsapp_click'));
    await page.waitForTimeout(2000);
    seen = await pushes(page);
    assert.equal(seen.filter((entry) => entry.event === 'whatsapp_click').length, 1);
    assert.equal(conversionCalls(seen, WHATSAPP_SEND_TO).length, 0, 'WhatsApp stays on the existing dataLayer path');
    assert.equal(conversionCalls(seen, EMAIL_CONVERSION_SEND_TO).length, 0);
    assert.equal(conversionCalls(seen, QUOTE_CONVERSION_SEND_TO).length, 0);
    const waNetwork = adsLabels.filter((hit) => hit.label === '3oz2CL6Xub0aEM27opI_');
    assert.ok(waNetwork.length >= 1, 'existing WhatsApp Ads conversion still pings');

    console.log(JSON.stringify({
      runtimeTags: runtime,
      forms: formEvidence,
      emailSendTo: EMAIL_CONVERSION_SEND_TO,
      quoteSendTo: QUOTE_CONVERSION_SEND_TO,
      whatsappNetworkPings: waNetwork.length,
    }, null, 2));
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
