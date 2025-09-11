import * as path from 'path';
import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import { extractHTMLBlocksFromReadme } from '../../visual-tests/extract-code-examples';

const components = ['checkbox', 'button', 'divider', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = [
		...extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'VARIATIONS.md')
		),
		...extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'README.md')
		),
		...extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'USE-CASES.md')
		),
	].reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

	await page.setViewportSize({ width: 400, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-checkbox').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'checkbox');
});
