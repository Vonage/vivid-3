import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['flag'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="display: grid; gap: 12px; margin: 8px;">
			<div style="display: flex; gap: 12px; align-items: center;">
				<vwc-flag code="DE" label="Germany"></vwc-flag>
				<vwc-flag code="JP" label="Japan"></vwc-flag>
				<vwc-flag code="US" label="United States"></vwc-flag>
			</div>

			<div style="display: flex; gap: 12px; align-items: center;">
				<vwc-flag code="DE" label="Germany" size="-4"></vwc-flag>
				<vwc-flag code="DE" label="Germany" size="0"></vwc-flag>
				<vwc-flag code="DE" label="Germany" size="2"></vwc-flag>
				<vwc-flag code="DE" label="Germany" size="4"></vwc-flag>
			</div>

			<div style="display: flex; gap: 12px; align-items: center;">
				<vwc-flag code="US"></vwc-flag>
				<span>Decorative (no label)</span>
				<vwc-flag code="US" label="United States"></vwc-flag>
				<span>Informative (label)</span>
			</div>
		</div>
	`;

	await page.setViewportSize({ width: 520, height: 220 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'flag');
});
