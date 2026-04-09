import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = [
	'text-field',
	'button',
	'select',
	'divider',
	'contextual-help',
];

test.describe('max/min length validation', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await loadComponents({
			page,
			components,
		});
		await renderTemplate({
			page,
			template: `
				<vwc-text-field minlength='3' value='t'></vwc-text-field>
				<vwc-text-field maxlength='1' value='test'></vwc-text-field>
			`,
		});
	});

	test('should ignore min/max length validation when user has not interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		expect(
			await page
				.locator('vwc-text-field[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
		expect(
			await page
				.locator('vwc-text-field[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
	});

	test('should apply min/max length constraints after a user has interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		await page.locator('vwc-text-field[minlength] input').fill('te');
		await page.locator('vwc-text-field[maxlength] input').press('Delete');

		expect(
			await page
				.locator('vwc-text-field[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
		expect(
			await page
				.locator('vwc-text-field[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
	});
});
