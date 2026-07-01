import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['range-slider'];

test('selecting a range', async ({ page }: { page: Page }) => {
	const template =
		'<vwc-range-slider style="width: 1000px;"></vwc-range-slider>';

	await page.setViewportSize({ width: 1000, height: 600 });

	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template,
	});

	await page.locator('vwc-range-slider .thumb-container').first().hover();
	await page.mouse.down();
	await page.mouse.move(300, 0);
	await page.mouse.up();

	await page.locator('vwc-range-slider .thumb-container').last().hover();
	await page.mouse.down();
	await page.mouse.move(700, 0);
	await page.mouse.up();

	await expect(page.locator('vwc-range-slider')).toHaveAttribute(
		'current-start',
		'3'
	);
	await expect(page.locator('vwc-range-slider')).toHaveAttribute(
		'current-end',
		'7'
	);
});
