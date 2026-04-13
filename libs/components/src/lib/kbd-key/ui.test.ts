import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['kbd-key'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template: `
			<div style="margin: 5px">
				<vwc-kbd-key name="A"></vwc-kbd-key>
			</div>
		`,
	});

	await takeScreenshot(page, 'kbd-key');
});
