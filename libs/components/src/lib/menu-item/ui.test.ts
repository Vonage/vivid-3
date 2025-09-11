import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'divider', 'badge'];

async function testSubMenu({ page }: { page: Page }) {
	const template = `
<style>
	#wrapper {
		width: 100%;
		height: 300px;
	}
</style>
<vwc-menu open aria-label="Example menu">
<vwc-menu-item text="Menu item 1">
</vwc-menu-item>
<vwc-menu-item text="Menu item 2">
<vwc-menu slot="submenu" open>
<vwc-menu-item text="Menu item 2.1"></vwc-menu-item>
<vwc-menu-item text="Menu item 2.2"></vwc-menu-item>
<vwc-menu-item text="Menu item 2.3"></vwc-menu-item>
</vwc-menu>
</vwc-menu-item>
<vwc-menu-item text="Menu item 3">
</vwc-menu-item>
</vwc-menu>
 `;

	await page.setViewportSize({ width: 400, height: 300 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'sub-menu');
}

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			#wrapper {
				width: 250px;
				height: 2300px;
				box-sizing: border-box;
			}
		</style>

		<vwc-menu open style="--menu-block-size: auto; --menu-max-inline-size: 230px;">
			<vwc-menu-item text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 2"></vwc-menu-item>
			<vwc-menu-item icon="home" text="primary text" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item icon="home"></vwc-menu-item>
			<vwc-menu-item text="menu item" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item icon="home" text="primary text" text-secondary="secondary text" disabled></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item control-type="checkbox" text="Checkbox 1" checked></vwc-menu-item>
			<vwc-menu-item control-type="checkbox" text="Checkbox 2"></vwc-menu-item>
			<vwc-menu-item id="focused" control-type="checkbox" text="Checkbox 3"></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item control-type="radio" text="Radio 1.1"></vwc-menu-item>
			<vwc-menu-item control-type="radio" text="Radio 1.2" checked></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item control-type="radio" text="Radio 2.1"></vwc-menu-item>
			<vwc-menu-item control-type="radio" text="Radio 2.2"></vwc-menu-item>
			<vwc-menu-item icon="layout-1-solid" control-type="checkbox" text="Checkbox 1"></vwc-menu-item>
			<vwc-menu-item icon="apps-solid" control-type="checkbox" text="Checkbox 2"></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item icon="layout-1-solid" control-type="radio" text="Radio 1.1"></vwc-menu-item>
			<vwc-menu-item icon="apps-solid" control-type="radio" text="Radio 1."></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item control-type="checkbox" text="Checkbox 1" checked check-trailing></vwc-menu-item>
			<vwc-menu-item control-type="radio" text="Radio 1" checked check-trailing></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item control-type="checkbox" text="Checkbox 1" check-appearance="tick-only"></vwc-menu-item>
			<vwc-menu-item control-type="checkbox" text="Checkbox 2" checked check-appearance="tick-only"></vwc-menu-item>
			<vwc-menu-item control-type="radio" text="Radio 1" check-appearance="tick-only"></vwc-menu-item>
			<vwc-menu-item control-type="radio" text="Radio 2" checked check-appearance="tick-only"></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item icon="home" text="primary text with long text and default line clamp"
			text-secondary="secondary text with long text and default line clamp" control-type="radio" ></vwc-menu-item>
			<vwc-menu-item style="--text-primary-line-clamp:2; --text-secondary-line-clamp: 2;"
			icon="home" text="primary text with long text and default line clamp"
			text-secondary="secondary text with long text and default line clamp" control-type="radio" ></vwc-menu-item>
			<vwc-menu-item style="--text-primary-line-clamp: auto; --text-secondary-line-clamp: auto;"
			icon="home" text="primary text with long text and default line clamp"
			text-secondary="secondary text with long text and default line clamp" control-type="radio" ></vwc-menu-item>
			<vwc-menu-item icon="file-pdf-line" text="Export to PDF">
			<vwc-badge slot="meta" appearance='subtle' connotation='cta' shape='pill' icon='check-solid'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Available" control-type="radio">
				<vwc-badge slot="meta" appearance='filled' connotation='success' shape='pill' icon='check-solid'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Busy" control-type="checkbox" checked>
				<vwc-badge slot="meta" appearance='filled' connotation='alert' shape='pill' icon='minus-solid'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Available" icon="image-line">
			 	<vwc-badge slot="meta" appearance='filled' connotation='success' shape='pill' icon='check-solid'></vwc-badge>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Away" control-type="radio" icon="image-line">
				<vwc-badge slot="meta" appearance='filled' connotation='warning' shape='pill' icon='clock-line'></vwc-badge>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Busy" control-type="checkbox" icon="image-line">
				<vwc-badge slot="meta" appearance='filled' connotation='alert' shape='pill' icon='minus-solid'></vwc-badge>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Available" icon="image-line">
				<vwc-badge slot="meta" appearance='filled' connotation='success' shape='pill' icon='check-solid'></vwc-badge>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
				<vwc-menu slot="submenu"><vwc-menu-item text="Menu item 1.1"></vwc-menu-item></vwc-menu>
			</vwc-menu-item>
			<vwc-menu-item text="Go to AI Studio" icon="ai-3-line">
				<vwc-icon name='open-line' slot="trailing-meta"></vwc-icon>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item connotation='cta' control-type="radio" text="Radio 2.1" checked></vwc-menu-item>
			<vwc-menu-item connotation='cta' control-type="radio" text="Radio 2.2"></vwc-menu-item>
			<vwc-menu-item connotation='cta' icon='layout-1-solid' control-type="checkbox" text="Checkbox 1" checked></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item disabled text="Disabled item"></vwc-menu-item>
			<vwc-menu-item disabled icon="home" text="primary text" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item disabled connotation="cta" icon="home" text="primary text" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item disabled control-type="checkbox" text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled control-type="checkbox" checked text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled control-type="radio" text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled control-type="radio" checked text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled control-type="checkbox" checked check-appearance="tick-only" text="Menu item 1"></vwc-menu-item>
		</vwc-menu>`;

	await page.setViewportSize({ width: 200, height: 2300 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('#focused').focus();
		},
	});

	await takeScreenshot(page, 'menu-item');
});

test('menu-item with submenu', testSubMenu);
