import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['nav-disclosure', 'nav-item', 'badge'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure label="1st level item">
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure label="1st level item" open="">
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure label="1st level item">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure>
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure label="1st level item" current="">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item" current=""></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure appearance="ghost-light" label="1st level item" current="">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item appearance="ghost-light" href="#" text="2nd level item" current=""></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure appearance="ghost-light" connotation="cta" label="1st level item" current="">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item appearance="ghost-light" connotation="cta" href="#" text="2nd level item" current=""></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure label="1st level item">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-nav>
	<vwc-nav-disclosure label="1st level item">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-badge slot="meta" text="beta" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
</div></vwc-layout>
</div>`;

	await page.setViewportSize({ width: 300, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.keyboard.press('Tab');
		},
	});

	await takeScreenshot(page, 'nav-disclosure');
});
