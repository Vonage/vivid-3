import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
const components = ['country-group', 'country', 'badge', 'popup', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	await page.setViewportSize({ width: 520, height: 420 });
	const template = ` <style> #wrapper { min-width: 420px; min-height: 220px; padding-bottom: 140px; } #wrap { display: grid; gap: 16px; padding: 16px; } #default { width: 320px; } #overflow { width: 160px; } </style> <div id="wrap"> <div id="default"> <vwc-country-group> <vwc-country code="UK"></vwc-country> <vwc-country code="NO"></vwc-country> <vwc-country code="US"></vwc-country> <vwc-country code="SE"></vwc-country> <vwc-country code="DE"></vwc-country> </vwc-country-group> </div> <div id="overflow"> <vwc-country-group> <vwc-country code="UK"></vwc-country> <vwc-country code="NO"></vwc-country> <vwc-country code="US"></vwc-country> <vwc-country code="SE"></vwc-country> <vwc-country code="DE"></vwc-country> </vwc-country-group> </div> </div>`;
	await loadComponents({ page, components });
	await renderTemplate({ page, template });
	const overflowGroup = page.locator('vwc-country-group').nth(1);
	const overflowBadge = overflowGroup.locator('vwc-badge');
	await overflowBadge.hover();
	const popupControl = overflowGroup.locator('vwc-popup .control.open');
	await popupControl.waitFor({ state: 'visible' });
	await overflowGroup.locator('.overflow-grid > *').first().waitFor();
	await takeScreenshot(page, 'country-group');
});
