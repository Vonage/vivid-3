import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['select', 'option', 'badge'];

async function testGhostSelect({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-select label="choose" success-text="Success" appearance="ghost">
			<vwc-option value="1" text="Option 1"></vwc-option></vwc-select>
	</div>
<div style="margin: 5px;">
			<vwc-select label="choose" error-text="Error" appearance="ghost">
			<vwc-option value="1" text="Option 1"></vwc-option></vwc-select>
	</div>`;

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
		'snapshots/select-ghost.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}

async function testScaleOptions({ page }: { page: Page }) {
	const template = `<div style="margin: 5px; block-size: 400px">
			<vwc-select label="scale condensed" scale="condensed" open>
			<vwc-option icon="chat-line" value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
			</vwc-select>
	</div>`;

	await page.setViewportSize({ width: 300, height: 400 });

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
		'snapshots/select-scale-condensed.png'
	);
}

test('should show the component', async ({ page }: { page: Page }) => {
	const template =
		`
			<style>
				#wrapper {
					width: 2300px;
					display: grid;
					grid-auto-rows: 250px;
					grid-template-columns: repeat(8, 1fr);
				}
			</style>` +
		extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'README.md')
		).reduce(
			(htmlString: string, block: string) =>
				`${htmlString} <div style="margin: 5px;">${block}</div>`,
			''
		);

	await page.setViewportSize({ width: 2300, height: 720 });

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
		'snapshots/select.png'
	);
});
test('select ghost', testGhostSelect);
test('select scale', testScaleOptions);
