import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.ts';

const components = ['side-drawer', 'text', 'button', 'sidenav-item', 'layout'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open>
	<div slot="top-bar">
        <vwc-text font-face="subtitle-1">VIVID</vwc-text>
    </div>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<vwc-layout slot="app-content" column-basis="block" gutters="medium">
		<vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
		<vwc-text font-face="body-1">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa.
			In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet.
			Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci.
			Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
			Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>
		</vwc-text>

		<vwc-text font-face="body-1">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in.
			 Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
			  Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales.
			   Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci.
			    Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
				 Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>
		</vwc-text>
	</vwc-layout>
</vwc-side-drawer>`;

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

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/side-drawer.png',
		);
});

test('should show the component 2', async ({ page }: { page: Page }) => {
	const template = `<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open position="end" alternate modal>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<vwc-layout slot="app-content" column-basis="block" gutters="medium">
		<vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
		<vwc-text font-face="body-1">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in.
			 Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
			  Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales.
			   Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci.
			    Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
				 Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>
		</vwc-text>

		<vwc-text font-face="body-1">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in.
			 Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus.
			  Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales.
			   Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci.
			    Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui.
				 Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>
		</vwc-text>
	</vwc-layout>
</vwc-side-drawer>`;

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

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/side-drawer-modal.png',
		);
});
