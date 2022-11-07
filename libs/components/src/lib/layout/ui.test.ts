import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['layout', 'card', 'divider'];

/**
 *
 */
function runLayoutUiTest() {
	return async ({page}: { page: Page }) => {
		const template = extractHTMLBlocksFromReadme(path.join(new URL('.', import.meta.url).pathname, 'README.md'))
			.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px;">${block}</div>`, '');

		page.setViewportSize({
			width: 1100,
			height: 720
		});

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
				'./snapshots/layout.png',
				{
					maxDiffPixelRatio: 0.02
				}
			);
	};
}

test('should show the component', runLayoutUiTest());
