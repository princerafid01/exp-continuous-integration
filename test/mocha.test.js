const assert = require('assert');
const puppeteer = require('puppeteer');

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

describe('rejaul karim', () => {
  before(async () => {
    this.browser = new Browser();
    await this.browser.init();
  });

  after(async () => {
    await this.browser.close();
  });

  describe('vai jekhane', () => {
    it('amra nai sekhane', async () => {
      const title = await this.browser.navigation();
      assert.strictEqual(title, 'Example Domain');
    });
  });
});
