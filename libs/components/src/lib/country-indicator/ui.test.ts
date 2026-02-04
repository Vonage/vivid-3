import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['country-indicator'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-country-indicator code="UK"></vwc-country-indicator>
		</div>
	`;

	await page.setViewportSize({ width: 200, height: 100 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'country-indicator');
});
