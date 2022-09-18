import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu-item', 'menu', 'divider'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
		<vwc-menu open>
		<vwc-menu-item role="menuitem">Menu item 1</vwc-menu-item>
		<vwc-menu-item role="menuitem">Menu item 2</vwc-menu-item>
		<vwc-divider></vwc-divider>
		<vwc-menu-item role="menuitemcheckbox" checked>Checkbox 1</vwc-menu-item>
		<vwc-menu-item role="menuitemcheckbox">Checkbox 2</vwc-menu-item>
		<vwc-divider></vwc-divider>
		<vwc-menu-item role="menuitemradio">Radio 1.1</vwc-menu-item>
		<vwc-menu-item role="menuitemradio">Radio 1.2</vwc-menu-item>
		<vwc-divider></vwc-divider>
		<vwc-menu-item role="menuitemradio" checked>Radio 2.1</vwc-menu-item>
		<vwc-menu-item role="menuitemradio">Radio 2.2</vwc-menu-item>
		</vwc-menu>`;

	page.setViewportSize({ width: 900, height: 720 });

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
