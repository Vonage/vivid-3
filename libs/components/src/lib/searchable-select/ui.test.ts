import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['searchable-select', 'option', 'icon', 'contextual-help'];

test('should contribute values to form data', async ({
	page,
}: {
	page: Page;
}) => {
	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template: `
			<form id="form">
				<vwc-searchable-select name="select" multiple>
					<vwc-option value="1" text="Option 1" selected></vwc-option>
					<vwc-option value="2" text="Option 2" selected></vwc-option>
				</vwc-searchable-select>
			</form>
		`,
	});

	const form = await page.$('#form');

	const formDataValues = await page.evaluate((form) => {
		const formElement = form as HTMLFormElement;
		const formData = new FormData(formElement);
		return formData.getAll('select');
	}, form);

	expect(formDataValues).toEqual(['1', '2']);
});

test.describe('focus management', () => {
	const setupWithAllFocusableElements = async (page: Page) => {
		await loadComponents({
			page,
			components,
		});
		await renderTemplate({
			page,
			template: `
			<button>before</button>
			<vwc-searchable-select helper-text='helper-text' multiple crearable>
				<vwc-option value='1' text='Option 1' selected></vwc-option>
			</vwc-searchable-select>
			<button>after</button>
		`,
		});
	};

	test('should not autofocus component when inserted into page', async ({
		page,
	}) => {
		await setupWithAllFocusableElements(page);

		await expect(page.locator('body')).toBeFocused();
	});

	test('should always focus the input when the tabbing into the component', async ({
		page,
	}: {
		page: Page;
	}) => {
		await setupWithAllFocusableElements(page);

		await page.getByRole('button', { name: 'before' }).focus();
		await page.keyboard.press('Tab');

		await expect(page.locator('vwc-searchable-select input')).toBeFocused();

		await page.getByRole('button', { name: 'after' }).focus();
		await page.keyboard.press('Shift+Tab');

		await expect(page.locator('vwc-searchable-select input')).toBeFocused();
	});

	test('should focus the input when a non-interactive part of the component is clicked', async ({
		page,
	}: {
		page: Page;
	}) => {
		await setupWithAllFocusableElements(page);

		await page.getByRole('button', { name: 'before' }).focus();
		await page.getByText('helper-text').click();

		await expect(page.locator('vwc-searchable-select input')).toBeFocused();
	});
});
