import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import { useFakeTime } from '../../visual-tests/time';

const components = ['date-range-picker', 'contextual-help'];

test('selecting a date range', async ({ page }: { page: Page }) => {
	const template = '<vwc-date-range-picker></vwc-date-range-picker>';

	await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
	await page.setViewportSize({ width: 1100, height: 500 });

	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template,
	});

	await page.locator('vwc-date-range-picker #picker-button').click();

	await page.getByRole('gridcell', { name: '10' }).first().click();
	await page.getByRole('gridcell', { name: '20' }).first().click();

	await expect(page.locator('vwc-date-range-picker')).toHaveAttribute(
		'current-start',
		'2023-08-10'
	);
	await expect(page.locator('vwc-date-range-picker')).toHaveAttribute(
		'current-end',
		'2023-08-20'
	);
});

test.describe('constraints validation', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
		await page.setViewportSize({ width: 1100, height: 500 });

		await loadComponents({
			page,
			components,
		});
	});

	test('should have a validation error when the date range violates required constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker required></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-range-picker .error-message')
		).toBeVisible();
	});

	test('should have a validation error when the date range violates min constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker min="2012-12-12" start="2011-11-11" end="2011-11-11"></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-range-picker .error-message')
		).toBeVisible();
	});

	test('should have a validation error when the date range violates max constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker max="2012-12-12" start="2013-11-11" end="2013-11-11"></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-range-picker .error-message')
		).toBeVisible();
	});

	test('should have a validation error when the user entered an invalid date range manually', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.locator('vwc-text-field input').fill('invalid date range');
		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-range-picker .error-message')
		).toBeVisible();
	});

	test('should hide a validation error after resetting the form', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker required></vwc-date-range-picker>
				<button type="reset">Reset</button>
			</form>`,
		});

		await page.locator('vwc-text-field input').fill('09/01/2023 – 09/02/2023');
		await page.getByRole('button', { name: 'Reset' }).click();

		await expect(
			page.locator('vwc-date-range-picker .error-message')
		).not.toBeVisible();
	});
});
