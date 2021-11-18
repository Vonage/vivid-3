import { test, expect } from '@playwright/test';
import { webkit } from 'playwright';

test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
});

describe('badge connotation', () => {
    it(`should have all connotations`, async function () {
        const browser = await webkit.launch();
        const page = await browser.newPage();
        await page.addScriptTag({
            content: `
                console.log('xxx');
                document.body.innerHTML = "<h1>Hello World</h1>";
            `
        });
        expect(await page.innerText('body')).toEqual('Hello World');
    });
});
