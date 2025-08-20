import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['contextual-help'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="padding: 20px 100px;">
			<vwc-contextual-help>Example contextual help</vwc-contextual-help>
		</div>
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.locator('vwc-contextual-help').nth(0).click();

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/contextual-help.png'
	);
});
