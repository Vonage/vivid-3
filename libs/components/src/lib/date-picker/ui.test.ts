import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
	useFakeTime,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['date-picker'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.space-for-popup {
			height: 450px;
			width: 380px;
		}
		.layout {
			display: flex;
		}
		.grid {
			display: flex;
			flex-direction: column;
			gap: 20px;
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
	page.setViewportSize({ width: 1000, height: 500 });

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

	await page.locator('#date-picker').click();

	// Prevent clicking the month picker from closing the date picker
	await page.evaluate(() => {
		const datePicker = document.querySelector('#month-picker') as any;
		datePicker.addEventListener('click', (e) => e.stopPropagation());
	});

	await page.locator('#month-picker').click();

	await page.locator('#month-picker .title-action').click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/date-picker.png'
	);
});

test('selecting a date', async ({ page }: { page: Page }) => {
	const template = '<vwc-date-picker></vwc-date-picker>';

	await useFakeTime(page, new Date('August 11 2023 11:11:11').valueOf());
	page.setViewportSize({ width: 1000, height: 500 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

	await page.locator('vwc-date-picker').click();

	await page.getByRole('gridcell', { name: '15' }).click();

	await expect(page.locator('vwc-date-picker')).toHaveAttribute(
		'value',
		'2023-08-15'
	);
});
