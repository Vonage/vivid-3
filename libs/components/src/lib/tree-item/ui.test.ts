import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tree-item', 'tree-view', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item"></vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item" icon="chat-line"></vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item" selected=""></vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item" disabled=""></vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item" expanded="">
		<vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
	</vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item 1">
		<vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
	</vwc-tree-item>
	<vwc-tree-item text="Tree Item 2"></vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-tree-item>
</vwc-tree-view>
</div></vwc-layout>
</div>`;

	await page.setViewportSize({ width: 250, height: 550 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-tree-item').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'tree-item');
});
