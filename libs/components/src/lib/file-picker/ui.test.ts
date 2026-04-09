import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = [
	'file-picker',
	'button',
	'layout',
	'text-field',
	'contextual-help',
];

const addFile = async (
	page: Page,
	fileName: string,
	fileSize: number,
	fileType: string,
	selector = 'vwc-file-picker:first-child .control'
) => {
	const dataTransfer = await page.evaluateHandle(
		([name, size, type]) => {
			const dt = new DataTransfer();
			const file = new File([Array(size).fill('a').join('')], name, { type });
			dt.items.add(file);
			return dt;
		},
		[fileName, fileSize, fileType] as const
	);

	await page.dispatchEvent(selector, 'drop', {
		dataTransfer,
	});
};

test.describe('form association', () => {
	const getFileFromFormData = async (page: Page) =>
		page.evaluate(() => {
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

	test("should associate with a form and set added files as it's data", async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-file-picker name="file"></vwc-file-picker>
			</form>`,
		});

		await addFile(page, 'file.txt', 1024, 'text/plain');

		const file = await getFileFromFormData(page);

		expect(file.name).toBe('file.txt');
		expect(file.size).toBe(1024);
	});

	test('should have a validation error when required constraint is violated', async ({
		page,
	}: {
		page: Page;
	}) => {
		await renderTemplate({
			page,
			template: `<form>
				<vwc-file-picker name="file" required></vwc-file-picker>
				<button type="submit">Submit</button>
			</form>`,
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page.locator('vwc-file-picker .error-message')).toBeVisible();
	});
});
