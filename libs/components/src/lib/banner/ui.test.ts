import * as path from 'path';
import { expect, test } from '@playwright/test'; 
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.ts';

const components = ['banner'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/banner.png'
	);
});

test('should remove the component when clicking on remove button', async ({ page }: { page: Page }) => {
	const template = `
			<vwc-banner removable icon="home" text="ET Phone!"></vwc-banner>	
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

	const removeButton = await page.locator('.dismiss-button');
	const element = await page.locator('vwc-banner');

	await removeButton.click();

	await element.waitFor({state: 'detached'});

	expect(await element.count()).toEqual(0);

});
