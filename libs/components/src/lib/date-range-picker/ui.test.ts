import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
	useFakeTime,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['date-range-picker'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.space-for-popup {
			height: 450px;
			width: 680px;
			flex-shrink: 0;
		}
		.layout {
			display: flex;
			padding: 8px;
			box-sizing: border-box;
		}
		.grid {
			display: flex;
			flex-direction: column;
			gap: 20px;
			width: 220px;
		}
	</style>
	<div class="layout">
		<div class="space-for-popup">
			<vwc-date-range-picker id="date-range-picker" start="2011-11-11" end="2011-11-22"></vwc-date-range-picker>
		</div>
		<div class="grid">
			<vwc-date-range-picker label="Label"></vwc-date-range-picker>
			<vwc-date-range-picker helper-text="Helper text"></vwc-date-range-picker>
			<vwc-date-range-picker error-text="Error text"></vwc-date-range-picker>
		</div>
	</div>`;

	await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
	await page.setViewportSize({ width: 1000, height: 500 });

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

	await page.locator('#date-range-picker #calendar-button').click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/date-range-picker.png'
	);
});

test('selecting a date range', async ({ page }: { page: Page }) => {
	const template = '<vwc-date-range-picker></vwc-date-range-picker>';

	await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
	page.setViewportSize({ width: 1100, height: 500 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

	await page.locator('vwc-date-range-picker #calendar-button').click();

	await page.getByRole('gridcell', { name: '10' }).click();
	await page.getByRole('gridcell', { name: '20' }).click();

	await expect(page.locator('vwc-date-range-picker')).toHaveAttribute(
		'current-start',
		'2023-08-10'
	);
	await expect(page.locator('vwc-date-range-picker')).toHaveAttribute(
		'current-end',
		'2023-08-20'
	);

});

test.describe('constraints validation', async () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
		page.setViewportSize({ width: 1100, height: 500 });

		await loadComponents({
			page,
			components,
		});
	});

	test('should have a validation error when the date range violates required constraint', async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker required></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-range-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the date range violates min constraint', async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker min="2012-12-12" start="2011-11-11" end="2011-11-11"></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-range-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the date range violates max constraint', async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker max="2012-12-12" start="2013-11-11" end="2013-11-11"></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-range-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the user entered an invalid date range manually', async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker></vwc-date-range-picker>
				<button type="submit">Submit</button>
			</form>`
		});

		await page.locator('vwc-text-field #control').fill('invalid date range');
		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-range-picker .error-message')).toBeVisible();
	});

	test('should hide a validation error after resetting the form', async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-range-picker required></vwc-date-range-picker>
				<button type="reset">Reset</button>
			</form>`
		});

		await page.locator('vwc-text-field #control').fill('09/01/2023 – 09/02/2023');
		await page.getByRole('button', { name: 'Reset' }).click();

		await expect(page.locator('vwc-date-range-picker .error-message')).not.toBeVisible();
	});
});
