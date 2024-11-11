import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['slider'];

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
		<vwc-slider></vwc-slider>
		<vwc-slider min="-5"></vwc-slider>
		<vwc-slider max="100"></vwc-slider>
		<vwc-slider step="0.5" markers></vwc-slider>
		<vwc-slider markers></vwc-slider>
		<vwc-slider markers disabled></vwc-slider>
		<vwc-slider connotation="cta" step="0.5" markers></vwc-slider>
		<vwc-slider connotation="cta" markers></vwc-slider>
		<vwc-slider connotation="cta" markers disabled></vwc-slider>
	</div>
	<div class="vertical">
		<vwc-slider orientation="vertical"></vwc-slider>
		<vwc-slider orientation="vertical" min="-5"></vwc-slider>
		<vwc-slider orientation="vertical" max="100"></vwc-slider>
		<vwc-slider orientation="vertical" step="0.5" markers></vwc-slider>
		<vwc-slider orientation="vertical" markers></vwc-slider>
		<vwc-slider orientation="vertical" markers disabled></vwc-slider>
		<vwc-slider orientation="vertical" connotation="cta" step="0.5" markers></vwc-slider>
		<vwc-slider orientation="vertical" connotation="cta" markers></vwc-slider>
		<vwc-slider orientation="vertical" connotation="cta" markers disabled></vwc-slider>
	</div>`;

	await page.setViewportSize({ width: 450, height: 700 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.keyboard.press('Tab');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/slider.png'
	);
});

test('should show a tooltip for horizontal slider', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<div style="height: 100px;">
			<vwc-slider value="5" pin></vwc-slider>
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
		'snapshots/slider-tooltip-horizontal.png'
	);
});

test('should show a tooltip for vertical slider', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
		<vwc-slider orientation="vertical" value="5" pin></vwc-slider>
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
		'snapshots/slider-tooltip-vertical.png'
	);
});
