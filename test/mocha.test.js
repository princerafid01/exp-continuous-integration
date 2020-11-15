const assert = require('assert');
const puppeteer = require('puppeteer');

console.log(`${process.env.TEST}`);

class Browser {
  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
  }
  async navigation() {
    const page = await this.browser.newPage();
    await page.goto('https://example.com/');
    return await page.title();
  }
  async close() {
    await this.browser.close();
  }
}

describe('Browser test', () => {
  before(async () => {
    this.browser = new Browser();
    await this.browser.init();
  });

  after(async () => {
    await this.browser.close();
  });

  describe('example.com', () => {
    it('gets the title', async () => {
      const title = await this.browser.navigation();
      assert.strictEqual(title, 'Example Domain');
    });
  });
});
