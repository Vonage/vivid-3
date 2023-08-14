import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['file-picker', 'button', 'layout', 'text-field'];

test.only('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-layout column-basis="block">
	  <vwc-file-picker label="Pick files" helper-text="multiple files of any type">
	  	Drag & Drop or click to upload
		</vwc-file-picker>
	  <vwc-file-picker label="Pick files" helper-text="multiple files of any type" size="expanded">
	  	Drag & Drop or click to upload
		</vwc-file-picker>
		<vwc-file-picker id="focused" label="Pick files focus" helper-text="multiple files of any type" size="expanded">
	  	Drag & Drop or click to upload
		</vwc-file-picker>
	</vwc-layout>`;

	page.setViewportSize({ width: 500, height: 720 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.keyboard.press('Tab');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/file-picker.png'
	);
});
