import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['country-group', 'country', 'badge', 'popup', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>#wrap { width: 320px; padding: 16px; }</style>
		<div id="wrap">
			<vwc-country-group>
				<vwc-country code="UK"></vwc-country>
				<vwc-country code="NO"></vwc-country>
				<vwc-country code="US"></vwc-country>
				<vwc-country code="SE"></vwc-country>
				<vwc-country code="DE"></vwc-country>
			</vwc-country-group>
		</div>`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'country-group');
});
