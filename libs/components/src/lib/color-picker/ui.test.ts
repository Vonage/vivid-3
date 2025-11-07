import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';
import type { ColorPicker } from './color-picker.js';

const components = ['color-picker', 'contextual-help'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			.layout {
				display: grid;
				grid-template-columns: 420px 420px 280px;
				padding: 8px;
				box-sizing: border-box;
				gap: 16px;
			}
			.with-popup {
				height: 480px;
				padding-right: 140px;
				box-sizing: border-box;
			}
			.grid {
				display: flex;
				flex-direction: column;
				gap: 16px;
				box-sizing: border-box;
			}
		</style>
		<div class="layout">
			<div class="with-popup">
				<vwc-color-picker id="basic-picker" label="Primary color" value="#FA7454"></vwc-color-picker>
			</div>
			<div class="with-popup">
				<vwc-color-picker id="swatches-picker" label="Primary color" placeholder="#ffffff" disable-saved-colors></vwc-color-picker>
			</div>
			<div class="grid">
				<vwc-color-picker label="Primary color"></vwc-color-picker>
				<vwc-color-picker helper-text="Helper text"></vwc-color-picker>
				<vwc-color-picker error-text="Error text"></vwc-color-picker>
				<vwc-color-picker success-text="Success text"></vwc-color-picker>
				<vwc-color-picker value="#D6219C"></vwc-color-picker>
				<vwc-color-picker label="Primary color">
					<vwc-contextual-help slot="contextual-help">Example contextual help</vwc-contextual-help>
				</vwc-color-picker>
				<vwc-color-picker value="#80C7F5" disabled></vwc-color-picker>
			</div>
		</div>
	`;

	await page.setViewportSize({ width: 1200, height: 600 });

	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.waitForFunction(() =>
				customElements.whenDefined('vwc-color-picker')
			);
			await page.locator('#basic-picker').evaluate((picker: ColorPicker) => {
				picker.open = true;
			});
			await page.locator('#swatches-picker').evaluate((picker: ColorPicker) => {
				picker.swatches = [
					{
						label: 'Magenta',
						value: '#D6219C',
					},
					{
						label: 'Blue',
						value: '#80C7F5',
					},
					{
						label: 'Orange',
						value: '#FA7454',
					},
					{
						label: 'Peach',
						value: '#FCAC98',
					},
				];
				picker.open = true;
			});
		},
	});

	const swatches = await page.locator('#swatches-picker .swatch');
	await swatches.nth(3).hover();

	await takeScreenshot(page, 'color-picker');
});
