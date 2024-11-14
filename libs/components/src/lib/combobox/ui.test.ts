import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['combobox', 'option'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template: `
			<style>
				#wrapper {
					display: grid;
					width: 300px;
					gap: 8px;
					padding: 8px;
				}
			</style>
			<vwc-combobox></vwc-combobox>
			<vwc-combobox appearance="ghost" placeholder="ghost appearance"></vwc-combobox>
			<vwc-combobox label="Label"></vwc-combobox>
			<vwc-combobox placeholder="Placeholder"></vwc-combobox>
			<vwc-combobox value="Value"></vwc-combobox>
			<vwc-combobox disabled></vwc-combobox>
			<vwc-combobox open style="margin-bottom: 100px">
				<vwc-option text="Option 1"></vwc-option>
				<vwc-option text="Option 2"></vwc-option>
			</vwc-combobox>
		`,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/combobox.png'
	);
});
