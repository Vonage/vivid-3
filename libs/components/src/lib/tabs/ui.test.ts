import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tabs', 'tab', 'tab-panel'];

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

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/tabs.png'
	);
});

test('should scroll only inside tabs', async ({ page }: { page: Page }) => {
	const template = `
			<div style="height: 5000px"></div>
	 		<vwc-tabs>
				<vwc-tab label="Tab 1" id="tab1"></vwc-tab>
				<vwc-tab label="Tab 2" id="tab2"></vwc-tab>
				<vwc-tab label="Tab 3" id="tab3"></vwc-tab>

				<vwc-tab-panel label="Tab 1" id="tabpanel1">
					<p>Tab 1 Content</p>
				</vwc-tab-panel>
				<vwc-tab-panel label="Tab 2" id="tabpanel2">
					<p>Tab 2 Content</p>
				</vwc-tab-panel>
				<vwc-tab-panel label="Tab 3" id="tabpanel3">
					<p>Tab 3 Content</p>
				</vwc-tab-panel>
			</vwc-tabs>
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	const body = await page.$('body');

	const bodyScrollTop = await body.evaluate((e) => e.scrollTop);

	expect(bodyScrollTop).toEqual(0);
});
