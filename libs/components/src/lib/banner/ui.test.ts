import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils';

const components = ['banner'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(__dirname, 'README.md')
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

	const removeButton = await page.$('.dismiss-button');
	const element = await page.$('vwc-banner');

	await removeButton.click();

	await element.waitForElementState('hidden');

	const elementHeight = (await element.boundingBox()).height;

	expect(elementHeight).toEqual(0);

});
