import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import { useFakeTime } from '../../visual-tests/time';

const components = ['date-time-picker', 'contextual-help'];

test('selecting a date and time', async ({ page }: { page: Page }) => {
	const template = '<vwc-date-time-picker></vwc-date-time-picker>';

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

	await page.locator('vwc-date-time-picker #picker-button').click();

	await page.getByRole('gridcell', { name: '15' }).click();

	await page.locator('vwc-date-time-picker #hours-01').click();
	await page.locator('vwc-date-time-picker #minutes-45').click();
	await page.locator('vwc-date-time-picker #meridies-PM').click();

	await expect(page.locator('vwc-date-time-picker')).toHaveAttribute(
		'current-value',
		'2023-08-15T13:45:00'
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

	test('should have a validation error when the value violates required constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-time-picker name="date" required></vwc-date-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-time-picker .error-message')
		).toBeVisible();
	});

	test('should have a validation error when the value violates min constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-time-picker name="date" min="2012-12-12T12:12:12" value="2011-11-11T11:11:11"></vwc-date-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-time-picker .error-message')
		).toBeVisible();
	});

	test('should have a validation error when the value violates max constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-time-picker name="date" max="2011-11-11T11:11:11" value="2012-12-12T12:12:12"></vwc-date-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-time-picker .error-message')
		).toBeVisible();
	});

	test('should have a validation error when the user entered an invalid value manually', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-date-time-picker name="date"></vwc-date-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.locator('vwc-text-field input').fill('invalid');
		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(
			page.locator('vwc-date-time-picker .error-message')
		).toBeVisible();
	});
});
