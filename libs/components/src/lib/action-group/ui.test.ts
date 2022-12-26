import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['action-group', 'button', 'text-field', 'layout', 'popup', 'divider'];

/**
 *
 *
 * @returns  HTMLElement
 */
function runActionGroupTest() {
	return async ({page}: { page: Page }) => {
		const template = extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'README.md')
		)
			.reduce(
				(htmlString: string, block: string) =>
					`${htmlString} <div style="margin: 5px;">${block}</div>`,
				''
			) + '<style> .center { text-align: center; } </style>';

		await page.setViewportSize({
			width: 380,
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

		expect(await testWrapper?.screenshot({animations: 'disabled'}))
			.toMatchSnapshot(
				'./snapshots/action-group.png',
				{
					maxDiffPixelRatio: 0.02
				}
			);
	};
}

test('should show the component', runActionGroupTest());

