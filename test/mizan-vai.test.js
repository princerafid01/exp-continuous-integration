const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const dotenv = require('dotenv').config();

jest.setTimeout(120000)

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: process.env.CAPTCHA_KEY,
    },
    visualFeedback: true,
  })
);

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome'
  });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

test('Load a page that has captcha in it', async () => {
  const respnse = await page.goto('https://www.google.com/recaptcha/api2/demo');
  const content = await respnse.text();
  expect(content.search('recaptcha')).toBeGreaterThan(0);
});

test('title is ReCAPTCHA demo', async () => {
  await page.solveRecaptchas();
  const title = await page.title();
  expect(title).toBe('ReCAPTCHA demo');
}, 120000);
