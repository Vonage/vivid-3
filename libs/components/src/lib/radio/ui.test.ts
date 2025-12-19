import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['radio'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = ` <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-radio label="A default radio"></vwc-radio>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-radio checked=""></vwc-radio>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-radio connotation="accent"></vwc-radio>
<vwc-radio connotation="accent" checked=""></vwc-radio>
<vwc-radio connotation="cta"></vwc-radio>
<vwc-radio connotation="cta" checked=""></vwc-radio>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-radio disabled=""></vwc-radio> <vwc-radio disabled="" checked=""></vwc-radio>
</div></vwc-layout>
</div> <div style="margin: 5px;">
    <vwc-layout gutters="small"><div><vwc-radio value="my-value"></vwc-radio>
</div></vwc-layout>
</div>`;

	await page.setViewportSize({ width: 200, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-radio').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'radio');
});
