import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['rich-text-editor'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-rich-text-editor></vwc-rich-text-editor>Tmp Text`;
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
		'snapshots/rich-text-editor.png'
	);
});
