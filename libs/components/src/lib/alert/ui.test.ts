import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['alert', 'button', 'switch'];

test('should show the component', async ({ page }: { page: Page }) => {

	const CSS = `
		<style>
			#wrapper > div { height: 250px; transform: translateY(0px); }
		</style>`;

	const template = CSS + extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div>${block}</div>`,'');

	page.setViewportSize({ width: 1300, height: 2750 });
	
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
		'./snapshots/alert.png'
	);
});
