import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	InFlightRequests,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['file-picker', 'button', 'layout', 'text-field'];

const addFile = async (
	page: Page,
	fileName: string,
	fileSize: number,
	fileType: string
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

	await page.dispatchEvent('vwc-file-picker:first-child .control', 'drop', {
		dataTransfer,
	});
};

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<div style="background-color: var(--vvd-color-neutral-50); padding: 8px;"><vwc-layout column-basis="block">
  <vwc-file-picker label="Pick files" helper-text="multiple files of any type" max-file-size="0.001" accept="image/*">
  	Drag & Drop or click to upload
		</vwc-file-picker>
		</div>
  <vwc-file-picker label="Pick files" helper-text="multiple files of any type" size="expanded">
  	Drag & Drop or click to upload
		</vwc-file-picker>
		<vwc-file-picker label="Pick files" helper-text="multiple files of any type" error-text="error-text">
  	Drag & Drop or click to upload
		</vwc-file-picker>
	</vwc-layout>`;

	page.setViewportSize({ width: 500, height: 1000 });

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

	const atLeastOneImageWasRequested = page.waitForRequest(
		(request) => request.resourceType() === 'image'
	);
	const requests = new InFlightRequests(page);

	await addFile(page, 'valid.png', 100, 'image/png');
	await addFile(page, 'tooBig.png', 100000, 'image/png');
	await addFile(page, 'wrongType.exe', 100, 'application/x-msdownload');

	// blur show error
	await page.mouse.click(0, 0);

	await page.keyboard.press('Tab');

	// Wait for icons to load
	await atLeastOneImageWasRequested;
	await requests.noneInFlight((request) => request.resourceType() === 'image');

	expect(
		await testWrapper?.screenshot({
			animations: 'disabled',
		})
	).toMatchSnapshot('snapshots/file-picker.png');
});

test.describe('form association', async () => {
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
		await loadTemplate({
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
		await loadTemplate({
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
