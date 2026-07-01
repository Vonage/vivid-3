import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = [
	'tabs',
	'tab',
	'tab-panel',
	'button',
	'menu',
	'empty-state',
];

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
	await renderTemplate({
		page,
		template,
	});

	await page.$('#wrapper');

	const body = await page.$('body');

	const bodyScrollTop = await body!.evaluate((e) => e.scrollTop);

	expect(bodyScrollTop).toEqual(0);
});
