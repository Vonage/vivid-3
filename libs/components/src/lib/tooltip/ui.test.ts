import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tooltip'];

function changeAnchor() {
	const tooltip = document.querySelector('#tooltip5');
	(tooltip as any).anchor = 'anchor2';
}
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
<style>
  .wrapper{
    width: 100%;
    height: 250px;
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
  <vwc-button id="anchor2"
  						style="position: absolute; top: 20px;"
  						aria-describedby="tooltip"
  						appearance='outlined'
  						label='This is an anchor'></vwc-button>
  <vwc-tooltip id="tooltip1" anchor="anchor" open text="right" placement="right">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip2" anchor="anchor" open text="left" placement="left">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip3" anchor="anchor" open text="top" placement="top">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip4" anchor="anchor" open text="bottom with custom width" placement="bottom"> </vwc-tooltip>
  <vwc-tooltip id="tooltip5" class="tooltip" anchor="anchor" open text="Dynamic Anchor Change" placement="right">
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

	await page.addScriptTag({content: changeAnchor.toString() + 'changeAnchor();'});

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/tooltip.png'
	);
});
