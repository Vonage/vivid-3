import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['simple-color-picker', 'button', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template: `
		<div style="margin: 5px; min-height: 150px;">
			<vwc-simple-color-picker>
				<vwc-button
					id="button"
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
	`,
		setup: async () => {
			await page.locator('vwc-simple-color-picker').evaluate((picker) => {
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
			});

			await page.locator('#button').click();
		},
	});

	await takeScreenshot(page, 'simple-color-picker');
});
