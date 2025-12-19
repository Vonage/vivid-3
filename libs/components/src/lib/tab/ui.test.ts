import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tab', 'tabs', 'tab-panel'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tabs>
	<vwc-tab label="Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tabs>
	<vwc-tab aria-label="tab" id="tab">
		<vwc-icon slot="icon" name="chat-line"></vwc-icon>
	</vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tabs>
	<vwc-tab label="Tab" id="tab">
		<vwc-icon slot="icon" name="chat-line"></vwc-icon>
	</vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
<vwc-tabs>
	<vwc-tab icon-trailing="" label="Tab" id="tab">
		<vwc-icon slot="icon" name="chat-line"></vwc-icon>
	</vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tabs>
	<vwc-tab shape="sharp" label="Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
</div></vwc-layout>
</div> <div style="margin: 5px;"><vwc-tabs>
	<vwc-tab label="Tab one" removable=""></vwc-tab>
	<vwc-tab label="Tab two" removable=""></vwc-tab>
	<vwc-tab label="Tab three" removable=""></vwc-tab>
	<vwc-tab-panel>Tab one content</vwc-tab-panel>
	<vwc-tab-panel>Tab two content</vwc-tab-panel>
	<vwc-tab-panel>Tab three content</vwc-tab-panel>
</vwc-tabs>

<script>
	document.querySelector('vwc-tabs').addEventListener('close', (e) => {
		const tab = e.srcElement;
		const tabs = tab.parentElement;
		const tabPanelId = tab.getAttribute('aria-controls');
		const tabPanel = document.getElementById(tabPanelId);
		if (tabs.querySelectorAll('vwc-tab').length === 1) {
			tabs.remove();
			return;
		}
		if (tabPanel) {
			tabPanel.remove();
			e.srcElement.remove();
		}
	});
</script>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tabs>
	<vwc-tab disabled="" label="Disabled Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-tab-panel>
</vwc-tabs>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tabs>
	<vwc-tab label="Tab with custom icon" id="tab">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
</div></vwc-layout>
</div>`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-tab').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'tab');
});
