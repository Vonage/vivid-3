import * as path from 'path';
import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import { extractHTMLBlocksFromReadme } from '../../visual-tests/extract-code-examples';

const components = ['icon'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = [
		...extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'VARIATIONS.md')
		),
		...extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'README.md')
		),
	].reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

	page.setViewportSize({ width: 560, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'icon');
});
