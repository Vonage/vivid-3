import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'button'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
		<style>
			.wrapper {
				width: 100%;
				height: 220px;
				position: relative
			}

			vwc-menu {
				--menu-max-inline-size: 300px;
				--menu-block-size: 150px;
			}
		</style>

		<div class="wrapper">
			<vwc-button id="button" label="Toggle Menu" onclick="menu.open = !menu.open" appearance="outlined"></vwc-button>

			<vwc-menu id="menu" anchor="button" placement="right-start" open>
				<vwc-menu-item text="Lorem ipsum dolor sit amet, consectetur adipisicing elit"></vwc-menu-item>
				<vwc-menu-item text="Menu item 1"></vwc-menu-item>
				<vwc-menu-item text="Menu item 2"></vwc-menu-item>
				<vwc-menu-item text="Menu item 3"></vwc-menu-item>
				<vwc-menu-item text="Menu item 4"></vwc-menu-item>
			</vwc-menu>
		</div>`;

	page.setViewportSize({ width: 560, height: 720 });

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
		'./snapshots/menu.png'
	);
});
