import * as path from 'path';
import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.ts';

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

test('should invalidate the component', async ({page, browserName}: { page: Page, browserName: string }) => {
	const selector = browserName === 'chromium' ? 'input[name="invalid-text-field"]' : '#invalid-text-field';

	const template = `<vwc-text-field id="invalid-text-field" 
																		label="invalid" 
																		pattern="123" 
																		value="5" 
																		name="invalid-text-field"></vwc-text-field>`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	const invalidTextField = await page.locator(selector);
	await invalidTextField.type('55');
	await invalidTextField.evaluate(e => {
		e.blur();
	});

	await page.waitForLoadState('networkidle');
	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/text-field-invalidation.png'
		);
});
