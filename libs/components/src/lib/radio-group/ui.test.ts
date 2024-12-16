import {expect, test} from '@playwright/test';
import type {Page} from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['radio-group', 'radio'];

test('should show the component', async ({page}: { page: Page }) => {
	const template = `
			<style>
				#wrapper {
					width: 200px;
					height: 350px;
					padding: 12px;
				}
				.wrapper-div {
				display: grid;
				grid-template-columns: 1fr;
				gap: 16px;
				}
				</style>
<div class="wrapper-div">
<vwc-radio-group label="Pick a number" name="number">
<vwc-radio label="1" value="1"></vwc-radio>
<vwc-radio label="2" value="2"></vwc-radio>
<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>

<vwc-radio-group label="Pick a number" name="number" disabled>
<vwc-radio label="1" value="1" checked></vwc-radio>
<vwc-radio label="2" value="2"></vwc-radio>
<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>

<vwc-radio-group label="Pick a number" name="number" readonly>
<vwc-radio label="1" value="1" checked></vwc-radio>
<vwc-radio label="2" value="2"></vwc-radio>
<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>

<vwc-radio-group label="Pick a number" name="number" orientation="vertical">
<vwc-radio label="1" value="1"></vwc-radio>
<vwc-radio label="2" value="2"></vwc-radio>
<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>

<div role="toolbar" style="display: flex;">
<vwc-button label="Before"></vwc-button>
<vwc-radio-group>
<vwc-radio label="1" value="1"></vwc-radio>
<vwc-radio label="2" value="2"></vwc-radio>
<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
<vwc-button label="After"></vwc-button>
</div>
</div>`

	page.setViewportSize({width: 200, height: 350});

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
		'snapshots/radio-group.png'
	);
});
