import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tabs', 'tab', 'tab-panel', 'button', 'menu'];

async function testScroll({ page }: { page: Page }) {
	const template = `<div style="margin-inline: 16px;"><vwc-tabs style="inline-size: 300px;">
<vwc-tab label="Tab one" id="one"></vwc-tab>
<vwc-tab label="Tab two" id="two"></vwc-tab>
<vwc-tab label="Tab three" id="tree"></vwc-tab>
<vwc-tab label="Tab four" id="four"></vwc-tab>
<vwc-tab label="Tab five" id="five"></vwc-tab>
<vwc-tab label="Tab six" id="six"></vwc-tab>
<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
<vwc-tab-panel id="fourPanel">Tab one content</vwc-tab-panel>
<vwc-tab-panel id="fivePanel">Tab two content</vwc-tab-panel>
<vwc-tab-panel id="sixPanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
</div>

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

	const wrapperElement = await page.locator('.tablist-wrapper');
	await wrapperElement.evaluate((element) => {
		if (element) {
			element.scrollTo(95, 0);
		}
	});

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/tabs-scroll.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}
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

test('tabs scroll shadow', testScroll);
