import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import { useFakeTime } from '../../visual-tests/time';
import type { DateTimePicker } from './date-time-picker';

const components = ['date-time-picker'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.space-for-popup {
			height: 450px;
			width: 500px;
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
			width: 300px;
		}
	</style>
	<div class="layout">
		<div class="space-for-popup">
			<vwc-date-time-picker id="date-picker"></vwc-date-time-picker>
		</div>
		<div class="space-for-popup">
			<vwc-date-time-picker id="month-picker"></vwc-date-time-picker>
		</div>
		<div class="grid">
			<vwc-date-time-picker label="Label"></vwc-date-time-picker>
			<vwc-date-time-picker helper-text="Helper text"></vwc-date-time-picker>
			<vwc-date-time-picker error-text="Error text"></vwc-date-time-picker>
			<vwc-date-time-picker value="2011-11-11T11:11:11"></vwc-date-time-picker>
		</div>
	</div>`;

	await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
	await page.setViewportSize({ width: 1300, height: 500 });

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
		const datePicker = document.querySelector(
			'#month-picker'
		) as DateTimePicker;
		datePicker.addEventListener('click', (e) => e.stopPropagation());
	});

	await page.locator('#month-picker #picker-button').click();

	await page.locator('#month-picker .title-action').click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/date-time-picker.png'
	);
});

test('selecting a date and time', async ({ page }: { page: Page }) => {
	const template = '<vwc-date-time-picker></vwc-date-time-picker>';

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

test.describe('constraints validation', async () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
		page.setViewportSize({ width: 1100, height: 500 });

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
		await loadTemplate({
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
		await loadTemplate({
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
		await loadTemplate({
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
		await loadTemplate({
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
