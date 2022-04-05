import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils';

const components = ['popup', 'text', 'icon', 'button'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(path.join(__dirname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px; position:relative;">${block}</div>`, '');

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
			'./snapshots/popup.png',
		);
});

test('should show all positionings', async ({ page }: { page: Page }) => {
	const template = `
	<style>
	.square {
		height: 150px;
		width: 200px;
		background-color: #555;
	  }
	.wrapper{
		width: 100%;
		height: 250px;
		display: flex;
		align-items: center;
		justify-content: center;
	  }
	</style>
	<div class="wrapper">
	<div id="anchor" class="square"></div>
	<vwc-popup id="popup" anchor="anchor" open corner="right-end" arrow>
			<vwc-text tight font-face="body-2">right-end</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="right" arrow>
		<vwc-text tight font-face="body-2">right</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="right-start" arrow>
			<vwc-text tight font-face="body-2">right-start</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="left-end" arrow>
			<vwc-text tight font-face="body-2">left-end</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="left" arrow>
		<vwc-text tight font-face="body-2">left</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="left-start" arrow>
			<vwc-text tight font-face="body-2">left-start</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="top-end" arrow>
			<vwc-text tight font-face="body-2">top-end</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="top" arrow>
		<vwc-text tight font-face="body-2">top</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="top-start" arrow>
			<vwc-text tight font-face="body-2">top-start</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="bottom-end" arrow>
			<vwc-text tight font-face="body-2">bottom-end</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="bottom" arrow>
			<vwc-text tight font-face="body-2">bottom</vwc-text>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor" open corner="bottom-start" arrow>
			<vwc-text tight font-face="body-2">bottom-start</vwc-text>
	</vwc-popup>
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

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/popup-positioning.png',
		);
});
