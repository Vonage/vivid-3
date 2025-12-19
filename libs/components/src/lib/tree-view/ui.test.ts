import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tree-view', 'tree-item'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-tree-view>
	<vwc-tree-item text="Tree Item 1"></vwc-tree-item>
	<vwc-tree-item text="Tree Item 2"></vwc-tree-item>
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
</div>`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'tree-view');
});
