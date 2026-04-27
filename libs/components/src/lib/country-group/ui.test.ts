import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
const components = ['country-group', 'country', 'badge', 'popup', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	await page.setViewportSize({ width: 560, height: 740 });
	const template = `
		<style>
			#wrap {
				display: grid;
				gap: 40px;
				padding: 16px;
				inline-size: 520px;
			}
			.example {
				border: 1px dashed rgba(0, 0, 0, 0.2);
				padding: 12px;
				background: repeating-linear-gradient(
					45deg,
					transparent,
					transparent 6px,
					rgba(0, 0, 0, 0.04) 6px,
					rgba(0, 0, 0, 0.04) 12px
				);
			}
			#two-rows {
				width: 260px;
				height: 85px;
				overflow: hidden;
			}
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
			<div class="example" id="popup-open">
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
			<div class="example" id="two-rows">
				<vwc-country-group>
					<vwc-country code="UK"></vwc-country>
					<vwc-country code="NO"></vwc-country>
					<vwc-country code="US"></vwc-country>
					<vwc-country code="SE"></vwc-country>
					<vwc-country code="DE"></vwc-country>
					<vwc-country code="FR"></vwc-country>
					<vwc-country code="ES"></vwc-country>
					<vwc-country code="IT"></vwc-country>
				</vwc-country-group>
			</div>
			<div class="example" id="two-rows-with-badge">
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

	await popupGroup.evaluate((el) => {
		(el as any).popupOpen = true;
	});

	await page.waitForSelector('#popup-open vwc-country-group vwc-popup[open]', {
		state: 'attached',
	});
	await page.waitForSelector(
		'#popup-open vwc-country-group vwc-popup[open] .overflow-grid > *',
		{ state: 'attached' }
	);

	await takeScreenshot(page, 'country-group');
});
