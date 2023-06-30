import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import type {Dialog} from './dialog';

const components = ['dialog'];

test('should set preventDefault to false on keydown event', async ({ page }: { page: Page }) => {
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
		#bottom-left-dialog {
			position: relative;
			top: 500px;
			left: 0;
		}
		#bottom-right-dialog {
			position: relative;
			top: 500px;
			left: 300px;
		}
		#horizontal-icon {
			position: relative;
			top: 50px;
			left: 0;
		}
	</style>
	<div style="height: 800px">
		<vwc-dialog id="top-dialog"
								icon="info"
								headline="Headline"
								subtitle="This is the content that I want to show and I will show it!!!"
								open>
								<div slot="main">This is the main content now - replacing EVERYTHING!</div>
								</vwc-dialog>
		<vwc-dialog id="modal"
								icon="info"
								headline="Headline"
								subtitle="This is the content that I want to show and I will show it!!!"
								>
								</vwc-dialog>
								<vwc-dialog
								id="horizontal-icon"
								icon="heart-solid"
								icon-placement="side"
								headline="Horizontal icon"
								open
								>
								</vwc-dialog>
		<vwc-dialog id="bottom-left-dialog"
								icon="info"
								headline="Dialog with overridden graphic slot"
								subtitle="This is the content that I want to show and I will show it!!!"
								open>
								<vwc-icon name="home" slot="graphic"></vwc-icon>
								</vwc-dialog>
		<vwc-dialog id="bottom-right-dialog"
								icon="info"
								headline="Dialog with footer"
								subtitle="This is the content that I want to show and I will show it!!"
								open>
								<div slot="body">
									This text should appear instead of the text property value
								</div>
								<div slot="footer">footer</div>
						    <vwc-button slot="secondary-action" appearance="outlined" label="Cancel"></vwc-button>
						    <vwc-button slot="primary-action" appearance="filled" label="Action"></vwc-button>
								</vwc-dialog>
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
	await page.locator('#modal');

	await page.waitForLoadState('networkidle');

	await page.evaluate(() => {
		const modal = (document.getElementById('modal') as Dialog);
		modal.showModal();
		return modal;
	});

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/dialog.png'
	);
});
