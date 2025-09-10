import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['switch', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="margin: 5px;">
  	<vwc-layout gutters="small"><div><vwc-switch ></vwc-switch></div></vwc-layout>
  </div>
  <div style="margin: 5px;">
  	<vwc-layout gutters="small"><div><vwc-switch checked id="focused"></vwc-switch></div></vwc-layout>
  </div>
	<div style="margin: 5px;">
  	<vwc-layout gutters="small">
  		<div><vwc-switch disabled=""></vwc-switch><vwc-switch disabled="" checked=""></vwc-switch></div>
    </vwc-layout>
  </div>
  <div style="margin: 5px;">
  	<vwc-layout gutters="small">
  		<div>
  			<vwc-switch readonly=""></vwc-switch>
  			<vwc-switch readonly="" checked=""></vwc-switch>
      </div>
    </vwc-layout>
  </div>
  <div style="margin: 5px;">
		<vwc-layout gutters="small">
			<div>
				<vwc-switch label="my-label"></vwc-switch>
      </div>
    </vwc-layout>
 	</div>
  <div style="margin: 5px;">
		<vwc-layout gutters="small">
			<div>
				<vwc-switch connotation="primary" checked=""></vwc-switch>
	      <vwc-switch connotation="cta" checked=""></vwc-switch>
	      <vwc-switch connotation="alert" checked=""></vwc-switch>
	      <vwc-switch connotation="success" checked=""></vwc-switch>
	      <vwc-switch connotation="announcement" checked=""></vwc-switch>
	    </div>
  	</vwc-layout>
  </div>`;

	page.setViewportSize({ width: 250, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('#focused').focus();
		},
	});

	await takeScreenshot(page, 'switch');
});
