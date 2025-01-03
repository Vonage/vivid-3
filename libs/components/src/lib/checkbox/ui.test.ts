import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

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

	page.setViewportSize({ width: 400, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.locator('vwc-checkbox').nth(1).focus();

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/checkbox.png'
	);
});
