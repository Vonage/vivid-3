import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['calendar'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
    <vwc-calendar sticky-mode="none" datetime="2022-01-01"></vwc-calendar>
    <vwc-calendar sticky-mode="none" datetime="2022-01-01" hour12 locales="he-IL" start-day="sunday" style="direction: rtl"></vwc-calendar>
    <div class="wrapper">
			<vwc-calendar datetime="2022-01-01"></vwc-calendar>
			<style>
				.wrapper {
				--calendar-header-background-color: var(--vvd-color-neutral-100);
				--calendar-column-background-color: var(--vvd-color-neutral-100);

				display: block;
				max-inline-size: 550px;
				max-block-size: 550px;
				background-color: var(--vvd-color-neutral-100);
				padding: 32px;
				}
				</style>
    </div>
	`;

	page.setViewportSize({ width: 900, height: 720 });

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
		'snapshots/calendar.png'
	);
});
