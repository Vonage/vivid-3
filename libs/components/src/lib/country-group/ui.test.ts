import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['country-group', 'country', 'badge', 'popup', 'icon'];

test('should show overflow badge', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			#two-rows-with-badge {
				width: 130px;
				height: 90px;
				overflow: hidden;
			}
			#popup-open {
				width: 220px;
				height: 30px;
				overflow: hidden;
				margin-block-start: 120px;
			}
		</style>
		<div id="wrap">
			<div id="popup-open">
				<vwc-country-group>
					<vwc-country code="UK"></vwc-country>
					<vwc-country code="NO"></vwc-country>
					<vwc-country code="US"></vwc-country>
					<vwc-country code="SE"></vwc-country>
					<vwc-country code="DE"></vwc-country>
					<vwc-country code="FR"></vwc-country>
					<vwc-country code="ES"></vwc-country>
					<vwc-country code="IT"></vwc-country>
					<vwc-country code="NL"></vwc-country>
					<vwc-country code="PL"></vwc-country>
				</vwc-country-group>
			</div>
			<div id="two-rows-with-badge">
				<vwc-country-group>
					<vwc-country code="UK"></vwc-country>
					<vwc-country code="NO"></vwc-country>
					<vwc-country code="US"></vwc-country>
					<vwc-country code="SE"></vwc-country>
					<vwc-country code="DE"></vwc-country>
					<vwc-country code="FR"></vwc-country>
					<vwc-country code="ES"></vwc-country>
					<vwc-country code="IT"></vwc-country>
					<vwc-country code="NL"></vwc-country>
					<vwc-country code="PL"></vwc-country>
				</vwc-country-group>
			</div>
		</div>
	`;
	await loadComponents({ page, components });
	await renderTemplate({ page, template });

	const withBadgeGroup = page.locator('#two-rows-with-badge vwc-country-group');
	await expect(withBadgeGroup.locator('vwc-badge')).toBeVisible();

	const popupGroup = page.locator('#popup-open vwc-country-group');
	const popupWrap = popupGroup.locator('.overflow-wrap');
	const popupBadge = popupWrap.locator('vwc-badge');
	await expect(popupBadge).toBeVisible();
	await expect(popupBadge).toHaveAttribute('text', /^\+\d+$/);
});
