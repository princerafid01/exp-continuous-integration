const puppeteer = require('puppeteer');

console.log(process.env.TEST);

jest.setTimeout(120000);

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

test('Load a page that has captcha in it', async () => {
  const respnse = await page.goto('https://example.com/');
  const content = await respnse.text();
  expect(content.search('example')).toBeGreaterThan(0);
});

test('title is Example Domain', async () => {
  const title = await page.title();
  expect(title).toBe('Example Domain');
}, 120000);
