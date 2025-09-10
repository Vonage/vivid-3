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
			<vwc-simple-color-picker open>
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
	const simpleColorPicker = await page.$('vwc-simple-color-picker');

	await page.evaluate((picker) => {
		(picker as any).swatches = [
			{
				label: 'Black',
				value: '#000000',
			},
			{
				label: 'Maroon',
				value: '#6E0000',
			},
			{
				label: 'Burnt Orange',
				value: '#BE5702',
			},
			{
				label: 'Forest Green',
				value: '#183A1E',
			},
			{
				label: 'Navy Blue',
				value: '#0E306D',
			},
			{
				label: 'Indigo',
				value: '#440291',
			},
			{
				label: 'Magenta',
				value: '#620256',
			},
			{
				label: 'Grey',
				value: '#757575',
			},
			{
				label: 'Red',
				value: '#E61D1D',
			},
			{
				label: 'Yellow',
				value: '#FA9F00',
			},
			{
				label: 'Green',
				value: '#1C8731',
			},
			{
				label: 'Blue',
				value: '#0276D5',
			},
			{
				label: 'Purple',
				value: '#9941FF',
			},
			{
				label: 'Pink',
				value: '#D6219C',
			},
		];
	}, simpleColorPicker);

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/simple-color-picker.png'
	);
});
