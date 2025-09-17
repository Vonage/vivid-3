import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['breadcrumb', 'breadcrumb-item'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
<style>
	#wrapper {
		padding: 12px;
	}
	.wrapper-div {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>

<div class="wrapper-div">
	<vwc-breadcrumb>
<vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
<vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
<vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>

<vwc-breadcrumb>
<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
<vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
</div>

	`;

	await page.setViewportSize({ width: 500, height: 300 });

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

	await takeScreenshot(page, 'breadcrumb');
});
