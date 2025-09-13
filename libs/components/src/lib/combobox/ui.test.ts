import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['combobox', 'option', 'badge'];

test('should show the component', async ({ page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
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
			<vwc-combobox helper-text="We use this information in to help inform our marketing strategy"
				label="Where did you hear about us?" placeholder="Select an option"></vwc-combobox>
				<vwc-combobox success-text="Rome is the correct answer" placeholder="Select an option" label="Success Text"></vwc-combobox>
				<vwc-combobox error-text="Rome is the correct answer" placeholder="Select an option" label="Error Text"></vwc-combobox>
		`,
	});
	await takeScreenshot(page, 'combobox');

	// For some unknown reason firefox fails to render the popup ~10% of the time when included in main test
	// Moving it to a separate one seems to fix the issue
	await renderTemplate({
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
			<vwc-combobox open style="margin-bottom: 100px">
				<vwc-option text="Option 1"></vwc-option>
				<vwc-option text="Option 2"></vwc-option>
			</vwc-combobox>
		`,
	});
	await takeScreenshot(page, 'combobox-open');

	await renderTemplate({
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
			<vwc-combobox label="scale condensed" scale="condensed" open style="margin-bottom: 100px">
				<vwc-option icon="chat-line" value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
			</vwc-combobox>
		`,
	});
	await takeScreenshot(page, 'combobox-scale-condensed');
});
