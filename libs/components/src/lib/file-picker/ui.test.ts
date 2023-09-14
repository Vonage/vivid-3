import { readFileSync } from 'fs';
import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['file-picker', 'button', 'layout', 'text-field'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<vwc-layout column-basis="block">
	  <vwc-file-picker label="Pick files" helper-text="multiple files of any type">
	  	Drag & Drop or click to upload
		</vwc-file-picker>
	  <vwc-file-picker label="Pick files" helper-text="multiple files of any type" size="expanded">
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

test.describe('form association', async () => {
	const FILE_NAME = 'file.pdf';
	const FILE_SIZE = 3;

	const addFile = async (page: Page) => {
		const dataTransfer = await page.evaluateHandle(([name, size]) => {
			const dt = new DataTransfer();
			const file = new File(
				[Array(size).fill('a').join('')],
				name,
				{ type: 'application/pdf' }
			);
			dt.items.add(file);
			return dt;
		}, [FILE_NAME, FILE_SIZE] as const);

		await page.dispatchEvent('vwc-file-picker .control', 'drop', { dataTransfer });
	};

	const getFileFromFormData = async (page: Page) => page.evaluate(() => {
		const form = document.querySelector('form') as HTMLFormElement;
		const formData = new FormData(form);
		const file = formData.get('file') as File;
		return {
			name: file.name,
			size: file.size,
		};
	});

	test.beforeEach(async ({ page }: { page: Page }) => {
		await loadComponents({
			page,
			components,
		});
	});

	test("should associate with a form and set added files as it's data", async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-file-picker name="file"></vwc-file-picker>
			</form>`
		});

		await addFile(page);

		const file = await getFileFromFormData(page);

		expect(file.name).toBe(FILE_NAME);
		expect(file.size).toBe(FILE_SIZE);
	});


	test('should have a validation error when required constraint is violated', async ({ page }: { page: Page }) => {
		await loadTemplate({
			page,
			template: `<form>
				<vwc-file-picker name="file" required></vwc-file-picker>
				<button type="submit">Submit</button>
			</form>`
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-file-picker .error-message')).toBeVisible();
	});
});
