import * as path from 'path';
import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import { extractHTMLBlocksFromReadme } from '../../visual-tests/extract-code-examples';

const components = ['tree-view', 'tree-item'];

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
		'snapshots/tree-view.png'
	);
});
