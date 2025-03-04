import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['range-slider'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<style>
		.horizontal {
			display: flex;
			flex-direction: column;
		}
		.vertical {
			display: flex;
			height: 300px;
		}
	</style>
	<div class="horizontal">
		<vwc-range-slider start="3" end="7"></vwc-range-slider>
		<vwc-range-slider start="3" end="7" markers></vwc-range-slider>
		<vwc-range-slider start="3" end="7" disabled></vwc-range-slider>
		<vwc-range-slider start="3" end="7" markers disabled></vwc-range-slider>
		<vwc-range-slider connotation="cta" start="3" end="7"></vwc-range-slider>
		<vwc-range-slider connotation="cta" start="3" end="7" markers></vwc-range-slider>
		<vwc-range-slider connotation="cta" start="3" end="7" disabled></vwc-range-slider>
		<vwc-range-slider connotation="cta" start="3" end="7" markers disabled></vwc-range-slider>
	</div>
	<div class="vertical">
		<vwc-range-slider orientation="vertical" start="3" end="7"></vwc-range-slider>
		<vwc-range-slider orientation="vertical" start="3" end="7" markers></vwc-range-slider>
		<vwc-range-slider orientation="vertical" start="3" end="7" disabled></vwc-range-slider>
		<vwc-range-slider orientation="vertical" start="3" end="7" markers disabled></vwc-range-slider>
		<vwc-range-slider orientation="vertical" connotation="cta" start="3" end="7"></vwc-range-slider>
		<vwc-range-slider orientation="vertical" connotation="cta" start="3" end="7" markers></vwc-range-slider>
		<vwc-range-slider orientation="vertical" connotation="cta" start="3" end="7" disabled></vwc-range-slider>
		<vwc-range-slider orientation="vertical" connotation="cta" start="3" end="7" markers disabled></vwc-range-slider>
	</div>`;

	await page.setViewportSize({ width: 600, height: 600 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	await page.keyboard.press('Tab');

	await page.waitForLoadState('networkidle');

	const testWrapper = await page.$('#wrapper');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/range-slider.png'
	);
});

test('should show a tooltip for horizontal range slider', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<div style="height: 100px;">
			<vwc-range-slider start="3" end="7" pin></vwc-range-slider>
		</div>
	`;

	await page.setViewportSize({ width: 600, height: 600 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	await page.keyboard.press('Tab');

	await page.waitForLoadState('networkidle');

	const testWrapper = await page.$('#wrapper');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/range-slider-tooltip-horizontal.png'
	);
});

test('should show a tooltip for vertical range slider', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-range-slider orientation="vertical" start="3" end="7" pin></vwc-range-slider>
	`;

	await page.setViewportSize({ width: 100, height: 600 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	await page.keyboard.press('Tab');

	await page.waitForLoadState('networkidle');

	const testWrapper = await page.$('#wrapper');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/range-slider-tooltip-vertical.png'
	);
});

test('selecting a range', async ({ page }: { page: Page }) => {
	const template =
		'<vwc-range-slider style="width: 1000px;"></vwc-range-slider>';

	await page.setViewportSize({ width: 1000, height: 600 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

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
