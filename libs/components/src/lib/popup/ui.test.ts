import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils';

const components = ['popup', 'text', 'icon', 'button'];
test.only('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(path.join(__dirname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px; position:relative;">${block}</div>`, '');

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
	await page.pause();
	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/popup.png',
		);
});
