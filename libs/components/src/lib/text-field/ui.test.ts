import * as path from 'path';
import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['text-field'];

test('should show the component', async ({page}: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	)
		.reduce(
			(htmlString: string, block: string) =>
				`${htmlString} <div style="margin: 5px;">${block}</div>`,
			''
		);

	await page.setViewportSize({ width: 300, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/text-field.png'
		);
});

test.only('should invalidate the component', async ({page, browserName}: { page: Page, browserName: string }) => {
	const selector = browserName === 'chromium' ? 'input[name="submit-button"]' : '#submit-button';

	const template = `
		<form onsubmit="return false">
			<vwc-text-field id="invalid-text-field" 
																		label="invalid" 
																		required
																		name="invalid-text-field"></vwc-text-field>
																		<input id="submit-button"  
																					 name="submit-button" 
																					 type="submit" 
																					 label="Submit"/>
		</form>`;
	await page.pause();
	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	const submitButton = await page.locator(selector);
	await page.waitForLoadState('networkidle');

	await submitButton.click();

	await page.pause();
	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/text-field-invalidation.png'
		);
});

