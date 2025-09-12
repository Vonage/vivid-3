import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'button', 'text-field'];

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

	await page.setViewportSize({ width: 720, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'menu');
});

test('menu with absolute strategy', async function ({ page }: { page: Page }) {
	const template = `
		<style>
			#wrapper {
				width: 300px;
				height: 200px;
			}
		</style>
		<vwc-menu id="menu-1" placement="right-start" open strategy-absolute>
			<vwc-button slot="anchor" label="Toggle Menu" appearance="outlined"></vwc-button>
			<vwc-menu-item text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 2"></vwc-menu-item>
			<vwc-menu-item text="Menu item 3"></vwc-menu-item>
		</vwc-menu>
		`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'absolute-menu');
});

test('menu with max-inline-size in mobile', async function ({
	page,
}: {
	page: Page;
}) {
	const template = `
<style>
			.wrapper {
				width: 360px;
				height: 405px;
				position: relative;
			}
		</style>
<div class="wrapper">
 <vwc-menu open placement="bottom-start" position-strategy="absolute">
  <vwc-menu-item text="Menu item 1 with long text that gets ellipsis"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2 with long text that gets ellipsis"></vwc-menu-item>
  <vwc-menu-item text="Menu item 3 with long text that gets ellipsis"></vwc-menu-item>
 </vwc-menu>
</div>`;

	await page.setViewportSize({ width: 360, height: 400 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'mobile-menu');
});
