import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['time-picker', 'contextual-help'];

test('selecting a time', async ({ page }: { page: Page }) => {
	const template = '<vwc-time-picker></vwc-time-picker>';

	await page.setViewportSize({ width: 1100, height: 500 });

	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template,
	});

	await page.locator('vwc-time-picker #picker-button').click();

	await page.locator('vwc-time-picker #hours-01').click();
	await page.locator('vwc-time-picker #minutes-45').click();
	await page.locator('vwc-time-picker #meridies-PM').click();

	await expect(page.locator('vwc-time-picker')).toHaveAttribute(
		'current-value',
		'13:45:00'
	);
});

test.describe('constraints validation', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await page.setViewportSize({ width: 1100, height: 500 });

		await loadComponents({
			page,
			components,
		});
	});

	test('should have a validation error when the time violates required constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-time-picker name="time" required></vwc-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-time-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the time violates min constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-time-picker name="time" min="08:00:00" value="06:00:00"></vwc-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-time-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the time violates max constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-time-picker name="time" max="18:00:00" value="19:00:00"></vwc-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-time-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the user entered an invalid time manually', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-time-picker name="time"></vwc-time-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.locator('vwc-text-field input').fill('invalid time');
		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-time-picker .error-message')).toBeVisible();
	});
});
