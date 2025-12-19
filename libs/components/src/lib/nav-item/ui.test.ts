import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['nav', 'nav-item', 'badge', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item text="Account"></vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item href="#" text="Account"></vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item href="#" text="Account">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item href="#" aria-label="Account">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item href="#" text="Account" current=""></vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item appearance="ghost-light" href="#" text="Account">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item appearance="ghost-light" href="#" text="Settings" current="">
		<vwc-icon slot="icon" name="gear-line"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item appearance="ghost-light" connotation="cta" href="#" text="Account">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item appearance="ghost-light" connotation="cta" href="#" text="Settings" current="">
		<vwc-icon slot="icon" name="gear-line"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item href="#" text="Account">
		<vwc-badge slot="meta" text="beta" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
	</vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-item href="#" text="Account">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item href="#">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
</div></vwc-layout>
</div>`;

	await page.setViewportSize({ width: 200, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-nav-item').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'nav-item');
});
