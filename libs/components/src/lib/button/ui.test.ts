import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page, Browser } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['button'];
test('should show the component', async ({ page, browser }: { page: Page, browser: Browser }) => {
	const template = extractHTMLBlocksFromReadme(path.join(new URL('.', import.meta.url).pathname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px;">${block}</div>`, '');

	page.setViewportSize({ width: 500, height: 720 });

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
			'./snapshots/button.png',
		);
});
