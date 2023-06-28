/* eslint-disable max-len */
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['file-picker', 'button', 'layout', 'divider'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = 
	`<form id='form'>
		<vwc-layout column-basis="block">
			<vwc-file-picker id='filePicker' label='Pick files' helper-text="multiple files of any type" max-files="50" upload-multiple>Drag & Drop or click to upload</vwc-file-picker>
			<vwc-divider></vwc-divider>
			<vwc-button label='Submit' appearance='filled' shape='pill' type="submit"></vwc-button>
		</vwc-layout>
	</form>`;

	page.setViewportSize({ width: 500, height: 500 });

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
		'./snapshots/file-picker.png'
	);
});
