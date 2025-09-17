import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['time-picker'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.space-for-popup {
			height: 350px;
			width: 275px;
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
			width: 275px;
		}
	</style>
	<div class="layout">
		<div class="space-for-popup">
			<vwc-time-picker id="time-picker" value="12:34:45"></vwc-time-picker>
		</div>
		<div class="space-for-popup">
			<vwc-time-picker id="time-picker-seconds" seconds-step="1"></vwc-time-picker>
		</div>
		<div class="space-for-popup">
			<vwc-time-picker id="time-picker-24h" clock="24h"></vwc-time-picker>
		</div>
		<div class="grid">
			<vwc-time-picker label="Label"></vwc-time-picker>
			<vwc-time-picker helper-text="Helper text"></vwc-time-picker>
			<vwc-time-picker error-text="Error text"></vwc-time-picker>
			<vwc-time-picker value="12:34:56"></vwc-time-picker>
			<vwc-time-picker disabled></vwc-time-picker>
			<vwc-time-picker readonly></vwc-time-picker>
		</div>
	</div>`;

	await page.setViewportSize({ width: 1100, height: 450 });

	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template,
		setup: async () => {
			// Prevent opening the time pickers from closing each other
			await page.evaluate(() => {
				document
					.querySelectorAll('vwc-time-picker')
					.forEach((timePicker) =>
						timePicker.addEventListener('click', (e) => e.stopPropagation())
					);
			});

			await page.locator('#time-picker #picker-button').click();
			await page.locator('#time-picker-seconds #picker-button').click();
			await page.locator('#time-picker-24h #picker-button').click();

			await page.keyboard.press('Tab');
		},
	});

	await takeScreenshot(page, 'time-picker');
});

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

test.describe('constraints validation', async () => {
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
