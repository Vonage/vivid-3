import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['kbd-shortcut', 'kbd-key'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template: `
			<style>
			#wrapper {
				padding: 8px;
				display: inline-block;
			}
			</style>
			<vwc-kbd-shortcut>
				<vwc-kbd-key name="Shift"></vwc-kbd-key>
				<vwc-kbd-key name="Alt" keyboard="standard"></vwc-kbd-key>
				<vwc-kbd-key name="A"></vwc-kbd-key>
			</vwc-kbd-shortcut>
		`,
	});

	await takeScreenshot(page, 'kbd-shortcut');
});
