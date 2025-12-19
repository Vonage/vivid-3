import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['elevation', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><style>
	#card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>

<vwc-elevation id="elevation">
	<div id="card">Hover me!</div>
</vwc-elevation>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small" column-basis="block"><style>
	.card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>

<vwc-elevation dp="0">
	<div class="card">This is the content inside the elevation with DP 0</div>
</vwc-elevation>
<vwc-elevation dp="2">
	<div class="card">This is the content inside the elevation with DP 2</div>
</vwc-elevation>
<vwc-elevation dp="4">
	<div class="card">This is the content inside the elevation with DP 4</div>
</vwc-elevation>
<vwc-elevation dp="8">
	<div class="card">This is the content inside the elevation with DP 8</div>
</vwc-elevation>
<vwc-elevation dp="12">
	<div class="card">This is the content inside the elevation with DP 12</div>
</vwc-elevation>
<vwc-elevation dp="16">
	<div class="card">This is the content inside the elevation with DP 16</div>
</vwc-elevation>
<vwc-elevation dp="24">
	<div class="card">This is the content inside the elevation with DP 24</div>
</vwc-elevation>
</vwc-layout>
</div>`;

	await page.setViewportSize({ width: 560, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'elevation');
});
