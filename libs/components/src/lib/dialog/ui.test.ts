import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['dialog'];

test('should set preventDefault to false on keydown event', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-dialog id="dialog" open>
			<div slot="main"><input id="input"/></div>
		</vwc-dialog>
	`;
	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const input = await page.locator('#input');

	await page.waitForLoadState('networkidle');

	await input.focus();
	const typedValue = 'abc';
	await page.keyboard.type(typedValue);

	expect(await input.inputValue()).toBe(typedValue);
});

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 300px;
		}
		.wrapper {
			position: relative;
		}
	</style>
	<div class="grid">
		<div class="wrapper">
			<vwc-dialog
				icon="info"
				headline="Headline"
				subtitle="This is the content that I want to show and I will show it!!!"
				open
				>
				<div slot="main">This is the main content now - replacing EVERYTHING!</div>
			</vwc-dialog>
		</div>
		<div class="wrapper">
			<vwc-dialog
				icon="heart-solid"
				icon-placement="side"
				headline="Horizontal icon"
				open
				>
				</vwc-dialog>
		</div>
		<div class="wrapper">
			<vwc-dialog
				icon="info"
				headline="Dialog with overridden graphic slot"
				subtitle="This is the content that I want to show and I will show it!!!"
				open
				>
				<vwc-icon name="home" slot="graphic"></vwc-icon>
			</vwc-dialog>
		</div>
		<div class="wrapper">
			<vwc-dialog
				icon="info"
				headline="Dialog with footer"
				subtitle="This is the content that I want to show and I will show it!!"
				open
				>
				<div slot="body">
					This text should appear instead of the text property value
				</div>
				<div slot="footer">footer</div>
				<vwc-button slot="action-items" appearance="outlined" label="Cancel"></vwc-button>
				<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
			</vwc-dialog>
		</div>
		<div class="wrapper" style="white-space: nowrap">
			<vwc-dialog
				headline="Dialog with very long headline that should wrap to the next line"
				open
				>
			</vwc-dialog>
		</div>
		<div class="wrapper" style="white-space: nowrap">
			<vwc-dialog
				headline="Dialog without dismiss button"
				subtitle="Subtitle content"
				non-dismissible
				open
				>
			</vwc-dialog>
		</div>
	</div>
	`;

	await page.setViewportSize({ width: 1000, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

	const testWrapper = await page.locator('#wrapper');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/dialog.png'
	);
});

test('should show the the dialog as a modal when calling .showModal()', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<div style="height: 800px">
			<vwc-dialog
				icon="info"
				headline="Headline"
				subtitle="This is the content that I want to show and I will show it!!!"
				open
				modal
			></vwc-dialog>
		</div>
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.locator('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/dialog-modal.png'
	);
});

test('should leave the dialog open on pressing ESC twice when cancel event is cancelled', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<div style="height: 800px">
			<vwc-dialog
				icon="info"
				headline="Headline"
				open
				modal
			></vwc-dialog>
		</div>
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

	await page.evaluate(() => {
		const dialog = document.querySelector('vwc-dialog')!;
		dialog.addEventListener('cancel', (event) => {
			event.preventDefault();
		});
	});

	await page.keyboard.press('Escape');
	await page.keyboard.press('Escape');

	await expect(page.locator('dialog')).toHaveAttribute('open', '');
});
