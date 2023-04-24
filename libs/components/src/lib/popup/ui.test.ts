import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['popup'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
	<style>
  .contentWrapper{
    width: 70px;
    padding: 4px;
  }
	.square {
		height: 150px;
		width: 400px;
	  }
	  .small {
	  height: 20px;
	  }
	.wrapper{
		width: 100%;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: grey;
	  }
	  .element{
	  width: 300px;
	  height: 50px;
	  position: relative;
	  z-index: 11;
	  background-color: #0074D9;
	  margin-top: 20px;
	  }
	</style>
	<div>
	<div class="wrapper">
	<div id="anchor5" class="square"></div>
	<vwc-popup id="popup" anchor="anchor5" open placement="right-end" alternate>
    <div class="contentWrapper">
			right-end
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="right" arrow>
    <div class="contentWrapper">
		  right
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="right-start" dismissible>
    <div class="contentWrapper">
		  right-start
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="left-end" alternate>
    <div class="contentWrapper">
			left-end
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="left" arrow>
    <div class="contentWrapper">
		  left
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="left-start" dismissible>
    <div class="contentWrapper">
			left-start
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="top-end" alternate>
    <div class="contentWrapper">
			top-end
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="top" arrow>
    <div class="contentWrapper">
		  top
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="top-start" dismissible>
    <div class="contentWrapper">
			top-start
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="bottom-end" alternate>
    <div class="contentWrapper">
			bottom-end
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="bottom" arrow>
    <div class="contentWrapper">
			bottom
    </div>
	</vwc-popup>
	<vwc-popup id="popup" anchor="anchor5" open placement="bottom-start" dismissible>
    <div class="contentWrapper">
			bottom-start
    </div>
	</vwc-popup>
	</div>
	<hr>
	<div class="wrapper" style="flex-direction: column; height: 100px;">
	<div id="anchor-index" class="square small"></div>
	<vwc-popup id="popup" anchor="anchor-index" open placement="bottom-center" strategy="absolute" style="z-index: 12;">
    <div class="contentWrapper">
			z-index checks
    </div>
    </vwc-popup>
    <div class="element">I have z-index: 11</div>
	</div>
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
	await page.waitForLoadState('networkidle');+

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/popup.png',
		);
});
