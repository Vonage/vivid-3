import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['menu', 'menu-item', 'divider', 'badge'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
		<style>
			div {
				width: 100%;
				height: 1300px;
				position: relative
			}
		</style>

		<div>
			<vwc-menu open style="--menu-block-size: auto; --menu-max-inline-size: 184px;">
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
				<vwc-menu-item text="Bussy" role="menuitemcheckbox" checked>
					<vwc-badge slot="meta" appearance='filled' connotation='alert' shape='pill' icon='minus-solid'></vwc-badge>
				</vwc-menu-item>
			</vwc-menu>
		</div>`;

	page.setViewportSize({ width: 200, height: 1300 });

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
		'./snapshots/menu-item.png'
	);
});
