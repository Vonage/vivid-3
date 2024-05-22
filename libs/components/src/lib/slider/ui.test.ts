import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['slider'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

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
		'./snapshots/slider.png'
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
		'./snapshots/slider-tooltip-horizontal.png'
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
		'./snapshots/slider-tooltip-vertical.png'
	);
});
