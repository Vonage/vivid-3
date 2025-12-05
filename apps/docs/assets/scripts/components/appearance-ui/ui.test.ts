import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadPage,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(__dirname, '../../../../content/designs/appearance.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

	await loadPage({
		page,
	});

	page.setViewportSize({ width: 900, height: 3600 });

	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(500);

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/appearance-ui.png'
	);
});
