import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tooltip'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
<style>
  .wrapper{
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  vwc-tooltip.tooltip{
    --tooltip-max-inline-size: 150px;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor" appearance='outlined' label='This is an anchor'></vwc-button>
  <vwc-button id="anchor2"
  						style="position: absolute; top: 20px;"
  						appearance='outlined'
  						label='This is an anchor'></vwc-button>
  <vwc-tooltip id="tooltip1" anchor="anchor" open text="right" placement="right">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip2" anchor="anchor" open text="left" placement="left">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip3" anchor="anchor" open text="top with some text that will wrap onto another line" placement="top">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip4" anchor="anchor" open text="bottom" placement="bottom"> </vwc-tooltip>
  <vwc-tooltip id="tooltip5" class="tooltip" anchor="anchor" text="Dynamic Anchor Change" placement="right">
  </vwc-tooltip>

</div>
	`;

	page.setViewportSize({ width: 600, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('#tooltip5').evaluate((tooltip) => {
				(tooltip as any).anchor = 'anchor2';
				(tooltip as any).open = true;
			});
		},
	});

	await takeScreenshot(page, 'tooltip');
});
