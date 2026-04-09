import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
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
	await renderTemplate({
		page,
		template,
	});

	const input = page.locator('#input');

	await input.focus();
	const typedValue = 'abc';
	await page.keyboard.type(typedValue);

	expect(await input.inputValue()).toBe(typedValue);
});

test('should leave the dialog open on pressing ESC twice when cancel event is cancelled', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<div style="height: 800px">
			<vwc-dialog
				icon="info-line"
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
	await renderTemplate({
		page,
		template,
	});

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
