import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['text-area'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

	await page.setViewportSize({ width: 300, height: 1400 });

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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/text-area.png'
	);
});

test.describe('max/min length validation', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await loadComponents({
			page,
			components,
		});
		await loadTemplate({
			page,
			template: `
				<vwc-text-area minlength='3' value='t'></vwc-text-area>
				<vwc-text-area maxlength='1' value='test'></vwc-text-area>
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
				.locator('vwc-text-area[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
		expect(
			await page
				.locator('vwc-text-area[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(true);
	});

	test('should apply min/max length constraints after a user has interacted with the field', async ({
		page,
	}: {
		page: Page;
	}) => {
		await page.locator('vwc-text-area[minlength] textarea').fill('te');
		await page.locator('vwc-text-area[maxlength] textarea').press('Backspace');

		expect(
			await page
				.locator('vwc-text-area[minlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
		expect(
			await page
				.locator('vwc-text-area[maxlength]')
				.evaluate((node: HTMLInputElement) => node.checkValidity())
		).toBe(false);
	});
});
