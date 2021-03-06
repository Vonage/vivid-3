import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['popup', 'text', 'icon', 'button'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
	<style>
  .contentWrapper{
    width: 70px;
    padding: 0.25rem;
  }
	.square {
		height: 150px;
		width: 400px;
	  }
	.wrapper{
		width: 100%;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: grey;

	  }
	</style>
	<div class="wrapper">
	<div id="anchor5" class="square"></div>
	<vwc-popup id="popup" anchor="anchor5" open placement="right-end" alternate>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">right-end</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="right" arrow>
    <div class="contentWrapper">
		  <vwc-text tight font-face="body-2">right</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="right-start" dismissible>
    <div class="contentWrapper">
		  <vwc-text tight font-face="body-2">right-start</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="left-end" alternate>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">left-end</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="left" arrow>
    <div class="contentWrapper">
		  <vwc-text tight font-face="body-2">left</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="left-start" dismissible>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">left-start</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="top-end" alternate>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">top-end</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="top" arrow>
    <div class="contentWrapper">
		  <vwc-text tight font-face="body-2">top</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="top-start" dismissible>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">top-start</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="bottom-end" alternate>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">bottom-end</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="bottom" arrow>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">bottom</vwc-text>
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="bottom-start" dismissible>
    <div class="contentWrapper">
			<vwc-text tight font-face="body-2">bottom-start</vwc-text>
    </div>
	</vwc-popup>
	</div>
	`;

	page.setViewportSize({ width: 800, height: 720 });

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
