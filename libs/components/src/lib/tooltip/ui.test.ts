import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.ts';

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
  vwc-tooltip#tooltip{
    --tooltip-inline-size:100px;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor" aria-describedby="tooltip" appearance='outlined' label='This is an anchor'></vwc-button>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="right" corner="right">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="left" corner="left">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="top" corner="top">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip" anchor="anchor" open text="bottom" corner="bottom">
  </vwc-tooltip>
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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/tooltip.png'
	);
});
