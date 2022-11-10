import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['switch', 'layout'];

test('should show the component', async ({page}: { page: Page }) => {

	const template = `
	<div style="margin: 5px;">
  	<vwc-layout gutters="small"><div><vwc-switch id="focused"></vwc-switch></div></vwc-layout>
  </div>
  <div style="margin: 5px;">
  	<vwc-layout gutters="small"><div><vwc-switch checked></vwc-switch></div></vwc-layout>
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
	    </div>
  	</vwc-layout>
  </div>`;

	page.setViewportSize({ width: 200, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');
	const focusedElement = await page.$('#focused');
	await focusedElement?.focus();

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/switch.png'
		);
});
