import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import type { Select } from './select.js';

const components = ['select', 'option', 'badge'];


test.only('should show the component', async ({ page }: { page: Page }) => {

	const template = '<style>#wrapper{height: 250px; width: 2500px; display: flex; flex-wrap: nowrap;}</style>'
		+ extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'README.md'))
			.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px;">${block}</div>`, '');

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
		'./snapshots/select.png'
	);
});
