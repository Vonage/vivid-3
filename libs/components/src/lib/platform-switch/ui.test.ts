import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['platform-switch'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template: `
			<style>
				#wrapper { display: inline-block; }
			</style>
			<vwc-platform-switch>
				<span>Default content</span>
			</vwc-platform-switch>
		`,
	});

	await takeScreenshot(page, 'platform-switch');
});
