import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['breadcrumb', 'breadcrumb-item'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = [
		`<vwc-breadcrumb>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>`,
		`<vwc-breadcrumb>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>`
	].reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

	page.setViewportSize({ width: 500, height: 720 });

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

	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 10)));

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/breadcrumb.png'
	);
});
