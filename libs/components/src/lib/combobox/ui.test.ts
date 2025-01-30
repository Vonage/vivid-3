import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['combobox', 'option', 'badge'];

async function testScaleOptions({ page }: { page: Page }) {
	const template = `<div style="margin: 5px; block-size: 400px">
			<vwc-combobox label="scale condensed" scale="condensed" open>
			<vwc-option icon="chat-line" value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
			</vwc-combobox>
	</div>`;

	await page.setViewportSize({ width: 300, height: 400 });

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
		'snapshots/combobox-scale-condensed.png'
	);
}

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
			<vwc-combobox shape="pill" placeholder="ghost appearance"></vwc-combobox>
			<vwc-combobox scale="condensed" placeholder="ghost appearance"></vwc-combobox>
			<vwc-combobox label="Country code" icon="warning-line"></vwc-combobox>
			<vwc-combobox label="Country code" icon="warning-line" disabled value="Value"></vwc-combobox>
			<vwc-combobox scale="condensed" label="Country code" icon="warning-line"></vwc-combobox>
			<vwc-combobox label="Label"></vwc-combobox>
			<vwc-combobox placeholder="Placeholder"></vwc-combobox>
			<vwc-combobox value="Value"></vwc-combobox>
			<vwc-combobox disabled></vwc-combobox>
			<vwc-combobox label="Combobox with custom icon" placeholder="placeholder">
				<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
			</vwc-combobox>
			<vwc-combobox label="Combobox with meta slot" placeholder="placeholder">
				<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
			</vwc-combobox>
			<vwc-combobox label="Combobox with meta slot + icon slot" placeholder="placeholder with very long text to check ellipsis">
				<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
				<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
			</vwc-combobox>
			<vwc-combobox value="Value with very long text to check ellipsis"></vwc-combobox>
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

test('combobox scale', testScaleOptions);
