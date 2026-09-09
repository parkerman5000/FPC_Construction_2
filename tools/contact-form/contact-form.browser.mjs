import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const root = new URL('../../', import.meta.url);
const accepted = { success: true, booking_id: 'synthetic-booking-receipt' };
const inquiry = {
  name: 'Synthetic Browser Check', email: 'browser-check@example.invalid',
  phone: '(803) 555-0123', service: 'concrete', message: 'Synthetic local-only inquiry retained on failure.'
};
let browser;
before(async () => { browser = await chromium.launch({ headless: true }); });
after(async () => { await browser?.close(); });

async function setup(asset, respond, options = {}) {
  const page = await browser.newPage();
  let requests = 0;
  const payloads = [];
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/webhook/lead-intake')) {
      requests++;
      payloads.push(route.request().postDataJSON());
      return respond(route);
    }
    // All other external requests are blocked; no production traffic is permitted.
    if (url.hostname !== 'fpc.test') return route.abort();
    const path = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    try {
      let body = await readFile(new URL(path, root));
      if (path === 'index.html') body = Buffer.from(body.toString().replace('assets/js/main.min.js', `assets/js/${asset}`));
      const ext = path.split('.').pop();
      await route.fulfill({ body, contentType: { html: 'text/html', js: 'text/javascript', css: 'text/css', json: 'application/json' }[ext] || 'application/octet-stream' });
    } catch { await route.fulfill({ status: 404, body: '' }); }
  });
  await page.goto('https://fpc.test/', { waitUntil: 'domcontentloaded' });
  if (options.noEndpoint) await page.evaluate(() => { globalThis.FPC_BOOKING_URL = ''; });
  await page.clock.install();
  return { page, requests: () => requests, payloads };
}
async function fill(page) {
  for (const field of ['name', 'email', 'phone', 'message']) await page.locator(`#${field}`).fill(inquiry[field]);
  await page.locator('#service').selectOption(inquiry.service);
}
async function submit(page) { await page.locator('#contact-form').dispatchEvent('submit'); }
async function settled(page) {
  await page.waitForFunction(() => !document.querySelector('#contact-form button[type="submit"]').disabled);
}
async function preserved(page) {
  for (const [field, value] of Object.entries(inquiry)) assert.equal(await page.locator(`#${field}`).inputValue(), value, `preserve ${field}`);
}
async function failed(page) {
  await settled(page);
  const text = await page.locator('#contact-form').innerText();
  assert.doesNotMatch(text, /Your message has been sent|Your inquiry has been received/);
  await preserved(page);
  const alert = page.locator('#contact-form [role="alert"]');
  assert.equal(await alert.count(), 1, 'one accessible inline failure');
  assert.match(await alert.innerText(), /try again/i);
  assert.equal(await alert.locator('a[href="tel:8038849305"]').count(), 1);
  assert.equal(page.url(), 'https://fpc.test/');
}
function json(status, body) { return route => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) }); }

for (const asset of ['main.js', 'main.min.js']) {
  for (const [label, respond] of [
    ['HTTP503 JSON', json(503, { error: 'Unavailable' })],
    ['HTTP400 JSON', json(400, { error: 'Invalid' })],
    ['HTTP403 permission', json(403, accepted)],
    ['HTTP500 with success-shaped body', json(500, accepted)],
    ['false success', json(200, { ...accepted, success: false })],
    ['string success', json(200, { ...accepted, success: 'true' })],
    ['missing receipt (honeypot)', json(200, { message: 'Received.' })],
    ['empty receipt', json(200, { ...accepted, booking_id: '  ' })],
    ['nonnumeric receipt required', json(200, { ...accepted, booking_id: 123 })],
    ['null JSON', json(200, null)],
    ['malformed JSON', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{' })],
    ['offline network failure', route => route.abort('internetdisconnected')],
  ]) {
    test(`${asset}: ${label} preserves inquiry and never claims delivery`, async () => {
      const { page, requests } = await setup(asset, respond);
      try {
        await fill(page); await submit(page); await failed(page); assert.equal(requests(), 1);
        if (label === 'HTTP503 JSON' && asset === 'main.min.js' && process.env.SCREENSHOT_DIR) {
          await page.locator('#contact-form').screenshot({ path: `${process.env.SCREENSHOT_DIR}/error-desktop.png` });
          await page.setViewportSize({ width: 390, height: 844 });
          await page.locator('#contact-form').screenshot({ path: `${process.env.SCREENSHOT_DIR}/error-mobile.png` });
        }
      }
      finally { await page.close(); }
    });
  }

  test(`${asset}: absent endpoint preserves inquiry without opening an email composer`, async () => {
    const { page, requests } = await setup(asset, json(201, accepted), { noEndpoint: true });
    try { await fill(page); await submit(page); await failed(page); assert.equal(requests(), 0); }
    finally { await page.close(); }
  });

  for (const status of [200, 201]) {
    test(`${asset}: ${status} durable receipt confirms capture and clears inquiry`, async () => {
      const { page, requests, payloads } = await setup(asset, json(status, accepted));
      try {
        await fill(page); await submit(page); await settled(page);
        assert.match(await page.locator('#contact-form').innerText(), /Your (?:message has been sent|inquiry has been received)/);
        assert.equal(await page.locator('#name').inputValue(), '');
        assert.equal(await page.locator('#message').inputValue(), '');
        assert.equal(requests(), 1);
        assert.equal(payloads[0].email, inquiry.email);
        assert.equal(payloads[0].phone, '8035550123');
        assert.equal(payloads[0].company_website, '');
        assert.equal(await page.locator('#contact-form [role="status"]').count(), 1);
      } finally { await page.close(); }
    });
  }

  test(`${asset}: first visit and empty/invalid fields do not submit`, async () => {
    const { page, requests } = await setup(asset, json(201, accepted));
    try {
      assert.doesNotMatch(await page.locator('#contact-form').innerText(), /inquiry has been received|message has been sent/i);
      await submit(page); assert.equal(requests(), 0);
      assert.equal(await page.locator('#contact-form .form__error').count(), 4);
      await fill(page); await page.locator('#email').fill('invalid'); await submit(page);
      assert.equal(requests(), 0);
      assert.match(await page.locator('#contact-form').innerText(), /valid email/);
    } finally { await page.close(); }
  });

  test(`${asset}: ten repeated submissions during loading send one request`, async () => {
    let release;
    const response = new Promise(resolve => { release = resolve; });
    const { page, requests } = await setup(asset, async route => { await response; await json(201, accepted)(route); });
    try {
      await fill(page); await submit(page);
      await page.waitForFunction(() => document.querySelector('#contact-form button[type="submit"]').disabled);
      assert.match(await page.locator('#contact-form button[type="submit"]').innerText(), /Sending/);
      for (let i = 0; i < 10; i++) await submit(page);
      release(); await settled(page);
      assert.equal(requests(), 1);
      assert.match(await page.locator('#contact-form button[type="submit"]').innerText(), /Request Free Estimate/);
    } finally { release(); await page.close(); }
  });

  test(`${asset}: timeout restores retry and preserves inquiry`, async () => {
    const { page } = await setup(asset, () => {});
    try {
      await fill(page); await submit(page);
      await page.clock.fastForward(15001);
      await failed(page);
    } finally { await page.close(); }
  });

  test(`${asset}: deadline covers a pending JSON body and ignores its late receipt`, async () => {
    const { page } = await setup(asset, json(201, accepted));
    try {
      await page.evaluate(() => {
        const parse = Response.prototype.json;
        Response.prototype.json = function() {
          if (this.url.endsWith('/webhook/lead-intake')) {
            return new Promise(resolve => { globalThis.releaseReceipt = () => resolve({ success: true, booking_id: 'late' }); });
          }
          return parse.call(this);
        };
      });
      await fill(page); await submit(page);
      await page.waitForFunction(() => typeof globalThis.releaseReceipt === 'function');
      await page.clock.fastForward(15001);
      await failed(page);
      await page.evaluate(() => globalThis.releaseReceipt());
      await page.clock.fastForward(1);
      await failed(page);
    } finally { await page.close(); }
  });

  test(`${asset}: retries replace prior status (failure, success, failure)`, async () => {
    let count = 0;
    const { page } = await setup(asset, route => json(++count === 2 ? 201 : 503, count === 2 ? accepted : { error: 'Unavailable' })(route));
    try {
      await fill(page); await submit(page); await failed(page);
      await submit(page); await settled(page);
      assert.equal(await page.locator('#contact-form [role="alert"]').count(), 0);
      assert.equal(await page.locator('#contact-form [role="status"]').count(), 1);
      await fill(page); await submit(page); await failed(page);
      assert.equal(await page.locator('#contact-form [role="status"]').count(), 0);
    } finally { await page.close(); }
  });
}
