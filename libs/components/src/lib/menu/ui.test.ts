import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'button', 'text-field'];

async function testAbsolutStrategy({ page }: { page: Page }) {
	const template = `
<style>
			.wrapper {
				width: 100%;
				height: 700px;
				position: relative;
			}
		</style>
		<div class="wrapper"><div style="container-type: inline-size">
 <vwc-menu id="menu-1" placement="right-start" open strategy-absolute>
  <vwc-button slot="anchor" label="Toggle Menu" appearance="outlined"></vwc-button>
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
  <vwc-menu-item text="Menu item 3"></vwc-menu-item>
 </vwc-menu>
 </div></div>`;

	page.setViewportSize({ width: 500, height: 400 });

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
		'snapshots/absolute-menu.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.wrapper {
				width: 100%;
				height: 700px;
				position: relative;
			}
		</style>

		<div class="wrapper">
			<vwc-menu id="menu" placement="right-start" open>
				<vwc-button slot="anchor" label="Toggle Menu" onclick="menu.open = !menu.open" appearance="outlined"></vwc-button>
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

	expect(await testWrapper?.screenshot()).toMatchSnapshot('snapshots/menu.png');
});

test('menu with absolute strategy', testAbsolutStrategy);
