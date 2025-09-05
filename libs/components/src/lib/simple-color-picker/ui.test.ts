import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['simple-color-picker', 'button', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px; min-height: 150px;">
			<vwc-simple-color-picker open 
				swatches="['#000000','#6E0000','#BE5702','#183A1E','#0E306D','#440291','#620256','#757575','#E61D1D','#FA9F00','#1C8731','#0276D5','#9941FF','#D6219C']">
				<vwc-button
					aria-label="Pick color"
					slot="anchor"
					size="super-condensed"
					shape="pill"
					appearance="outlined"
				>
					<vwc-icon id="icon" slot="icon" name="textcolor-solid"></vwc-icon>
				</vwc-button>
			</vwc-simple-color-picker>
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
		'snapshots/simple-color-picker.png'
	);
});
