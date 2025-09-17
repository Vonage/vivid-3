import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['contextual-help'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="padding: 20px 100px;">
			<vwc-contextual-help>Example contextual help</vwc-contextual-help>
		</div>
		<div style="padding: 20px 100px;">
			<vwc-contextual-help>
				Example contextual help
				<vwc-icon slot="icon" size="-6" name="info-solid"></vwc-icon>
			</vwc-contextual-help>
		</div>
	`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-contextual-help').nth(0).click();
		},
	});

	await takeScreenshot(page, 'contextual-help');
});
