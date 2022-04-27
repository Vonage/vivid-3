import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils';

const components = ['calendar'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
    <vwc-calendar datetime="2022-01-01"></vwc-calendar>
    <vwc-calendar hour12 locales="he-IL" start-day="sunday" style="direction: rtl"></vwc-calendar>
	`;

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

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/calendar.png',
		);
});
