import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'button', 'text-field'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
		<style>
			.wrapper {
				width: 300px;
				height: 700px;
				position: relative;
			}
		</style>

		<div class="wrapper">
			<vwc-button id="button" label="Toggle Menu" onclick="menu.open = !menu.open" appearance="outlined"></vwc-button>

			<vwc-menu id="menu" anchor="button" placement="right-start" open>
				<vwc-text-field slot="header" placeholder="Search" icon="search"></vwc-text-field>
				<vwc-menu-item text="Lorem ipsum dolor sit amet, consectetur adipisicing elit"></vwc-menu-item>
				<vwc-menu-item text="Menu item 1"></vwc-menu-item>
				<vwc-menu-item text="Menu item 2"></vwc-menu-item>
				<vwc-menu-item text="Menu item 3"></vwc-menu-item>
				<vwc-menu-item text="Menu item 4"></vwc-menu-item>
				<vwc-button slot="action-items" appearance="outlined" label="Close"></vwc-button>
				<vwc-button slot="action-items" appearance="filled" label="Select"></vwc-button>
			</vwc-menu>
		</div>`;

	page.setViewportSize({ width: 720, height: 720 });

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
