import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['kbd-shortcut-text'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template: `
			<div style="margin: 5px">
				<vwc-kbd-shortcut-text>Control+C</vwc-kbd-shortcut-text>
			</div>
		`,
	});

	await takeScreenshot(page, 'kbd-shortcut-text');
});
