import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tooltip','button'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
<style>
  .wrapper{
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  vwc-tooltip.tooltip{
    --tooltip-inline-size:150px;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor" aria-describedby="tooltip" appearance='outlined' label='This is an anchor'></vwc-button>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="right" placement="right">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="left" placement="left">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="top" placement="top">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip" class="tooltip" anchor="anchor" open text="bottom with custom width" placement="bottom">
  </vwc-tooltip>
</div>
	`;

	page.setViewportSize({ width: 600, height: 720 });

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
		'./snapshots/tooltip.png'
	);
});
