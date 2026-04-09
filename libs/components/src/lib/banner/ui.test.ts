import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['banner', 'icon', 'button'];

test('should remove the component when clicking on remove button', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `
			<vwc-banner removable icon="home" text="ET Phone!"></vwc-banner>
	`;

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	const removeButton = page.locator('.dismiss-button');
	const element = page.locator('vwc-banner');

	await removeButton.click();

	await element.waitFor({ state: 'detached' });

	expect(await element.count()).toEqual(0);
});
