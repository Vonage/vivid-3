import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['listbox', 'option'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(path.join(new URL('.', import.meta.url).pathname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px;">${block}</div>`, '');

	page.setViewportSize({ width: 440, height: 720 });

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
			'./snapshots/listbox.png',
		);
});

test('should show the component focus', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-listbox>
  		<vwc-option value="1" text="Option" role="option" id="option1"></vwc-option>
  		<vwc-option value="2" text="Option" role="option" id="option2"></vwc-option>
  		<vwc-option value="3" text="Option" role="option" id="option3"></vwc-option>
	</vwc-listbox>
  `;

	page.setViewportSize({ width: 1100, height: 720 });

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

	const element = await page.locator('vwc-option#option1');

	await element.click();

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/listbox-focus.png',
		);

});
