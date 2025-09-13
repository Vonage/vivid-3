import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['number-field', 'divider', 'contextual-help'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="display: flex; flex-direction: column; row-gap: 5px; inline-size: 260px; margin: 6px;">
<vwc-number-field label="Quantity" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="My Label" current-value="" step="1"></vwc-number-field>
<vwc-number-field placeholder="My Placeholder" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="With default value" value="5" current-value="5" step="1"></vwc-number-field>
<vwc-number-field label="Quantity" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="With step" step="0.1" value="1.5" current-value="1.5"></vwc-number-field>
<vwc-number-field label="With minimum" min="100" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="With maximum" max="2" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="Helper text below" helper-text="Help text" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="Valid value" success-text="Great success" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="Condensed" scale="condensed" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="Normal" scale="normal" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="Pill" shape="pill" current-value="" step="1"></vwc-number-field>
<vwc-number-field label="Rounded" shape="rounded" current-value="" step="1"></vwc-number-field>
<vwc-number-field placeholder="appearance" label="fieldset" appearance="fieldset" current-value="" step="1"></vwc-number-field>
<vwc-number-field placeholder="appearance" label="ghost" appearance="ghost" current-value="" step="1"></vwc-number-field>
<vwc-number-field disabled="" value="disabled" label="fieldset" appearance="fieldset" class="disabled" current-value="" step="1"></vwc-number-field>
<vwc-number-field readonly="" value="8" label="fieldset" appearance="fieldset" current-value="8" step="1"></vwc-number-field>
<vwc-number-field label="Timeout" current-value="" step="1">
<span slot="helper-text">The timeout in seconds. <a href="#">Guide to setting timeouts</a></span>
</vwc-number-field>
<vwc-number-field label="Quantity" current-value="" step="1">
	<vwc-contextual-help slot="contextual-help">This is the contextual help</vwc-contextual-help>
</vwc-number-field>
	</div>
`;

	await page.setViewportSize({ width: 300, height: 1500 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'number-field');
});
