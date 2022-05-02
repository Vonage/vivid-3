import { expect, test } from '@playwright/test'; 
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.ts';

const components = ['side-drawer', 'text', 'button', 'sidenav-item'];
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
	<div slot="app-content">
        <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
        <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
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
	<div slot="app-content">
        <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
        <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
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
