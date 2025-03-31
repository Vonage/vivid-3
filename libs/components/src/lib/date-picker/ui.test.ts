import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
	useFakeTime,
} from '../../visual-tests/visual-tests-utils.js';
import type { DatePicker } from './date-picker.ts';

const components = ['date-picker'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.space-for-popup {
			height: 450px;
			width: 380px;
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
			<vwc-date-picker id="date-picker"></vwc-date-picker>
		</div>
		<div class="space-for-popup">
			<vwc-date-picker id="month-picker"></vwc-date-picker>
		</div>
		<div class="grid">
			<vwc-date-picker label="Label"></vwc-date-picker>
			<vwc-date-picker helper-text="Helper text"></vwc-date-picker>
			<vwc-date-picker error-text="Error text"></vwc-date-picker>
			<vwc-date-picker value="2011-11-11"></vwc-date-picker>
		</div>
	</div>`;

	await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
	await page.setViewportSize({ width: 1100, height: 500 });

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

	await page.locator('#date-picker #picker-button').click();

	// Prevent clicking the month picker from closing the date picker
	await page.evaluate(() => {
		const datePicker = document.querySelector('#month-picker') as DatePicker;
		datePicker.addEventListener('click', (e) => e.stopPropagation());
	});

	await page.locator('#month-picker #picker-button').click();

	await page.locator('#month-picker .title-action').click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/date-picker.png'
	);
});

test('selecting a date', async ({ page }: { page: Page }) => {
	const template = '<vwc-date-picker></vwc-date-picker>';

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

	await page.locator('vwc-date-picker #picker-button').click();

	await page.getByRole('gridcell', { name: '15' }).click();

	await expect(page.locator('vwc-date-picker')).toHaveAttribute(
		'current-value',
		'2023-08-15'
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

	test('should have a validation error when the date violates required constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-picker name="date" required></vwc-date-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the date violates min constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-picker name="date" min="2012-12-12" value="2011-11-11"></vwc-date-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the date violates max constraint', async ({
		page,
	}: {
		page: Page;
	}) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-picker name="date" max="2011-11-11" value="2012-12-12"></vwc-date-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-picker .error-message')).toBeVisible();
	});

	test('should have a validation error when the user entered an invalid date manually', async ({
		page,
	}: {
		page: Page;
	}) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-date-picker name="date"></vwc-date-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.locator('vwc-text-field input').fill('invalid date');
		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-date-picker .error-message')).toBeVisible();
	});
});
