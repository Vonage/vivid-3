import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
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

	page.setViewportSize({ width: 400, height: 300 });

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
		'snapshots/sub-menu.png',
		{ maxDiffPixelRatio: 0.01 }
	);
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
			<vwc-menu-item role="menuitem" text="Menu item 2"></vwc-menu-item>
			<vwc-menu-item icon="home" text="primary text" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item icon="home"></vwc-menu-item>
			<vwc-menu-item text="menu item" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item icon="home" text="primary text" text-secondary="secondary text" disabled></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1" checked></vwc-menu-item>
			<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
			<vwc-menu-item id="focused" role="menuitemcheckbox" text="Checkbox 3"></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
			<vwc-menu-item role="menuitemradio" text="Radio 1.2" checked></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item role="menuitemradio" text="Radio 2.1"></vwc-menu-item>
			<vwc-menu-item role="menuitemradio" text="Radio 2.2"></vwc-menu-item>
			<vwc-menu-item icon="layout-1-solid" role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
			<vwc-menu-item icon="apps-solid" role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item icon="layout-1-solid" role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
			<vwc-menu-item icon="apps-solid" role="menuitemradio" text="Radio 1."></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1" checked check-trailing></vwc-menu-item>
			<vwc-menu-item role="menuitemradio" text="Radio 1" checked check-trailing></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1" check-appearance="tick-only"></vwc-menu-item>
			<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2" checked check-appearance="tick-only"></vwc-menu-item>
			<vwc-menu-item role="menuitemradio" text="Radio 1" check-appearance="tick-only"></vwc-menu-item>
			<vwc-menu-item role="menuitemradio" text="Radio 2" checked check-appearance="tick-only"></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item icon="home" text="primary text with long text and default line clamp"
			text-secondary="secondary text with long text and default line clamp" role="menuitemradio" ></vwc-menu-item>
			<vwc-menu-item style="--text-primary-line-clamp:2; --text-secondary-line-clamp: 2;"
			icon="home" text="primary text with long text and default line clamp"
			text-secondary="secondary text with long text and default line clamp" role="menuitemradio" ></vwc-menu-item>
			<vwc-menu-item style="--text-primary-line-clamp: auto; --text-secondary-line-clamp: auto;"
			icon="home" text="primary text with long text and default line clamp"
			text-secondary="secondary text with long text and default line clamp" role="menuitemradio" ></vwc-menu-item>
			<vwc-menu-item icon="file-pdf-line" text="Export to PDF">
			<vwc-badge slot="meta" appearance='subtle' connotation='cta' shape='pill' icon='check-solid'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Available" role="menuitemradio">
				<vwc-badge slot="meta" appearance='filled' connotation='success' shape='pill' icon='check-solid'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Busy" role="menuitemcheckbox" checked>
				<vwc-badge slot="meta" appearance='filled' connotation='alert' shape='pill' icon='minus-solid'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Available" icon="image-line">
			 	<vwc-badge slot="meta" appearance='filled' connotation='success' shape='pill' icon='check-solid'></vwc-badge>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Away" role="menuitemradio" icon="image-line">
				<vwc-badge slot="meta" appearance='filled' connotation='warning' shape='pill' icon='clock-line'></vwc-badge>
				<vwc-badge slot="trailing-meta" appearance='subtle' connotation='cta' text='new'></vwc-badge>
			</vwc-menu-item>
			<vwc-menu-item text="Busy" role="menuitemcheckbox" icon="image-line">
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
			<vwc-menu-item connotation='cta' role='menuitemradio' text="Radio 2.1" checked></vwc-menu-item>
			<vwc-menu-item connotation='cta' role='menuitemradio' text="Radio 2.2"></vwc-menu-item>
			<vwc-menu-item connotation='cta' icon='layout-1-solid' role='menuitemcheckbox' text="Checkbox 1" checked></vwc-menu-item>
			<vwc-divider></vwc-divider>
			<vwc-menu-item disabled text="Disabled item"></vwc-menu-item>
			<vwc-menu-item disabled icon="home" text="primary text" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item disabled connotation="cta" icon="home" text="primary text" text-secondary="secondary text"></vwc-menu-item>
			<vwc-menu-item disabled role="menuitemcheckbox" text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled role="menuitemcheckbox" checked text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled role="menuitemradio" text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled role="menuitemradio" checked text="Menu item 1"></vwc-menu-item>
			<vwc-menu-item disabled role="menuitemcheckbox" checked check-appearance="tick-only" text="Menu item 1"></vwc-menu-item>
		</vwc-menu>`;

	page.setViewportSize({ width: 200, height: 2300 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.locator('#focused').focus();

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/menu-item.png'
	);
});

test('menu-item with submenu', testSubMenu);
