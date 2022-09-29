import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'divider'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
		<style>
			div {
				width: 100%;
				height: 360px;
				position: relative
			}
		</style>

		<div>
			<vwc-menu open>
				<vwc-menu-item role="menuitem" text="Menu item 1"></vwc-menu-item>
				<vwc-menu-item role="menuitem" text="Menu item 2"></vwc-menu-item>
				<vwc-divider></vwc-divider>
				<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
				<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
				<vwc-divider></vwc-divider>
				<vwc-menu-item role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
				<vwc-menu-item role="menuitemradio" text="Radio 1.2"></vwc-menu-item>
				<vwc-divider></vwc-divider>
				<vwc-menu-item role="menuitemradio" text="Radio 2.1"></vwc-menu-item>
				<vwc-menu-item role="menuitemradio" text="Radio 2.2"></vwc-menu-item>
			</vwc-menu>
		</div>`;

	page.setViewportSize({ width: 160, height: 360 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/menu-item.png'
	);
});
