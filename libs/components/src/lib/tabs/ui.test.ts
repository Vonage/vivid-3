import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = [
	'tabs',
	'tab',
	'tab-panel',
	'button',
	'menu',
	'empty-state',
];

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
		'snapshots/tabs-scroll.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-tabs gutters="none">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<vwc-tabs orientation="vertical">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<vwc-tabs connotation="cta">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<vwc-tabs activeid="two">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<style>
				.tabs {
					block-size: 200px;
				}
			</style>
			<vwc-tabs class="tabs" scrollable-panel>
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">
					<div class="my-panel">
						<ol>
							<li>Stuffed artichokes</li>
							<li>Bruschetta</li>
							<li>Oven-baked polenta</li>
							<li>Salami and Fig Crostini with Ricotta</li>
							<li>Rosemary-Potato Focaccia with Goat Cheese</li>
							<li>Stuffed artichokes</li>
							<li>Bruschetta</li>
							<li>Oven-baked polenta</li>
							<li>Salami and Fig Crostini with Ricotta</li>
							<li>Rosemary-Potato Focaccia with Goat Cheese</li>
						</ol>
					</div>
				</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<style>
				.tabs {
					block-size: 150px;
				}
			</style>
			<vwc-tabs class="tabs" scrollable-panel orientation="vertical">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">
					<div class="my-panel">
						<ol>
							<li>Stuffed artichokes</li>
							<li>Bruschetta</li>
							<li>Oven-baked polenta</li>
							<li>Salami and Fig Crostini with Ricotta</li>
							<li>Rosemary-Potato Focaccia with Goat Cheese</li>
							<li>Stuffed artichokes</li>
							<li>Bruschetta</li>
							<li>Oven-baked polenta</li>
							<li>Salami and Fig Crostini with Ricotta</li>
							<li>Rosemary-Potato Focaccia with Goat Cheese</li>
						</ol>
					</div>
				</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<vwc-tabs tabs-layout="stretch">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<vwc-tabs>
				<vwc-tab label="Tab one"></vwc-tab>
				<vwc-tab label="Tab two"></vwc-tab>
				<vwc-tab-panel>Tab one content</vwc-tab-panel>
				<vwc-tab-panel>Tab two content</vwc-tab-panel>
				<vwc-button
					slot="action-items"
					icon="plus-line"
					shape="pill"
					size="condensed"
					onclick="addTab()"
				></vwc-button>
			</vwc-tabs>
		</div>
		<div style="margin: 5px;">
			<style>
				.panel::part(tab-panel) {
					background-color: var(--vvd-color-cta-50);
				}
			</style>
			<vwc-tabs class="panel">
				<vwc-tab label="Tab one" id="one"></vwc-tab>
				<vwc-tab label="Tab two" id="two"></vwc-tab>
				<vwc-tab label="Tab three" id="tree"></vwc-tab>
				<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
				<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
				<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
			</vwc-tabs>
		</div>
		<div style="margin: 5px">
		<style>
			.flex-wrapper {
			display: flex;
			flex-direction: column;
			block-size: 100%;
			}

			.tabs-inside-flex {
			--tabs-block-size: 100%;
			flex: 1;
			block-size: 400px;
			}
		</style>
		<div class="flex-wrapper">
		<vwc-tabs scrollable-panel class="tabs-inside-flex">
			<vwc-tab icon="chat-line" label="Comments"></vwc-tab>
			<vwc-tab icon="playlist-line" label="Playlist"></vwc-tab>
			<vwc-tab icon="star-line" label="Favourites"></vwc-tab>
			<vwc-tab-panel>
			<div class="panel">
			<vwc-empty-state icon="error-solid" headline="No results" connotation="alert"></vwc-empty-state>
			</div>
			</vwc-tab-panel>
			<vwc-tab-panel>Playlist</vwc-tab-panel>
			<vwc-tab-panel>Favourites</vwc-tab-panel>
		</vwc-tabs>
</div>
</div>
		<div style="margin: 5px">
			<vwc-tabs>
				<vwc-tab label="Task" removable></vwc-tab>
				<vwc-tab-panel>Task content</vwc-tab-panel>
				<vwc-tab label="Event" removable></vwc-tab>
				<vwc-tab-panel>Event content</vwc-tab-panel>
				<vwc-menu
					slot="action-items"
					trigger="auto"
					auto-dismiss
					placement="bottom-end"
				>
					<vwc-button
						slot="anchor"
						icon="plus-line"
						shape="pill"
						size="condensed"
					></vwc-button>
					<vwc-menu-item text="New Task" onclick="addTab('Task')"></vwc-menu-item>
					<vwc-menu-item text="New Event" onclick="addTab('Event')"></vwc-menu-item>
				</vwc-menu>
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

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot('snapshots/tabs.png');
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

	const bodyScrollTop = await body!.evaluate((e) => e.scrollTop);

	expect(bodyScrollTop).toEqual(0);
});

test('tabs scroll shadow', testScroll);
