import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['breadcrumb', 'breadcrumb-item'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
</vwc-breadcrumb>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
</div></vwc-layout>
</div>`;

	await page.setViewportSize({ width: 500, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.keyboard.press('Tab');
		},
	});

	await takeScreenshot(page, 'breadcrumb-item');
});
