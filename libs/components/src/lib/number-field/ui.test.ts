import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['number-field', 'divider'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="display: flex; flex-direction: column; row-gap: 5px; inline-size: 260px; margin: 6px;">
	</div>
`;

	await page.setViewportSize({ width: 300, height: 1500 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/number-field.png'
	);
});
