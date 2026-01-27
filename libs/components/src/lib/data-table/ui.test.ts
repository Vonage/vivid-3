import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['data-table'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<div style="margin: 5px; max-width: 700px;">
			<vwc-table>
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Product</vwc-table-header-cell>
						<vwc-table-header-cell>Type</vwc-table-header-cell>
						<vwc-table-header-cell>Threshold</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>SMS</vwc-table-cell>
						<vwc-table-cell>Volumetric Changes</vwc-table-cell>
						<vwc-table-cell>1000</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Voice</vwc-table-cell>
						<vwc-table-cell>Volumetric Changes</vwc-table-cell>
						<vwc-table-cell>5000</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			</vwc-table>
	</div>`;

	await page.setViewportSize({ width: 800, height: 400 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	const text = await page.locator('vwc-table-cell:has-text("Voice")');
	await text.isVisible();

	await takeScreenshot(page, 'data-table');
});

test('should allow row scoped header cells', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `<div style="margin: 5px; max-width: 700px;">
			<vwc-table>
				<vwc-table-row>
					<vwc-table-header-cell>Product</vwc-table-header-cell>
					<vwc-table-cell>SMS</vwc-table-cell>
					<vwc-table-cell>Voice</vwc-table-cell>
				</vwc-table-row>
				<vwc-table-row>
					<vwc-table-header-cell>Type</vwc-table-header-cell>
					<vwc-table-cell>Volumetric Changes</vwc-table-cell>
					<vwc-table-cell>Volumetric Changes</vwc-table-cell>
				</vwc-table-row>
				<vwc-table-row>
					<vwc-table-header-cell>Threshold</vwc-table-header-cell>
					<vwc-table-cell>1000</vwc-table-cell>
					<vwc-table-cell>5000</vwc-table-cell>
				</vwc-table-row>
			</vwc-table>
	</div>`;

	await page.setViewportSize({ width: 800, height: 400 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	const text = await page.locator('vwc-table-cell:has-text("Voice")');
	await text.isVisible();

	await takeScreenshot(page, 'data-table-row-scoped-headers');
});

test('should handle long content with text wrapping', async ({
	page,
}: {
	page: Page;
}) => {
	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template: `
			<vwc-table>
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Product</vwc-table-header-cell>
						<vwc-table-header-cell>Description</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>SMS</vwc-table-cell>
						<vwc-table-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius
							sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus.
						</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Voice</vwc-table-cell>
						<vwc-table-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			</vwc-table>
		`,
	});

	await page.setViewportSize({ width: 400, height: 400 });

	await takeScreenshot(page, 'data-table-multiline-text');
});

test('should render multiple rows and columns', async ({
	page,
}: {
	page: Page;
}) => {
	const template = `<div style="margin: 5px;">
			<vwc-table>
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Column 1</vwc-table-header-cell>
						<vwc-table-header-cell>Column 2</vwc-table-header-cell>
						<vwc-table-header-cell>Column 3</vwc-table-header-cell>
						<vwc-table-header-cell>Column 4</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Row 1, Cell 1</vwc-table-cell>
						<vwc-table-cell>Row 1, Cell 2</vwc-table-cell>
						<vwc-table-cell>Row 1, Cell 3</vwc-table-cell>
						<vwc-table-cell>Row 1, Cell 4</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Row 2, Cell 1</vwc-table-cell>
						<vwc-table-cell>Row 2, Cell 2</vwc-table-cell>
						<vwc-table-cell>Row 2, Cell 3</vwc-table-cell>
						<vwc-table-cell>Row 2, Cell 4</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Row 3, Cell 1</vwc-table-cell>
						<vwc-table-cell>Row 3, Cell 2</vwc-table-cell>
						<vwc-table-cell>Row 3, Cell 3</vwc-table-cell>
						<vwc-table-cell>Row 3, Cell 4</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			</vwc-table>
	</div>`;

	await page.setViewportSize({ width: 1000, height: 500 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	const text = await page.locator('vwc-table-cell:has-text("Row 2, Cell 2")');
	await text.isVisible();

	await takeScreenshot(page, 'data-table-multiple-rows-columns');
});

test('should handle responsive scrolling', async ({ page }: { page: Page }) => {
	const template = `<div style="margin: 5px;">
			<vwc-table style="max-height: 200px; width: 100%;">
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Product</vwc-table-header-cell>
						<vwc-table-header-cell>Type</vwc-table-header-cell>
						<vwc-table-header-cell>Threshold</vwc-table-header-cell>
						<vwc-table-header-cell>Countries</vwc-table-header-cell>
						<vwc-table-header-cell>Notification</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>SMS</vwc-table-cell>
						<vwc-table-cell>Volumetric Changes</vwc-table-cell>
						<vwc-table-cell>1000</vwc-table-cell>
						<vwc-table-cell>Germany, UK, US</vwc-table-cell>
						<vwc-table-cell>Notify</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Voice</vwc-table-cell>
						<vwc-table-cell>Volumetric Changes</vwc-table-cell>
						<vwc-table-cell>5000</vwc-table-cell>
						<vwc-table-cell>All countries</vwc-table-cell>
						<vwc-table-cell>Don't notify</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Email</vwc-table-cell>
						<vwc-table-cell>Rate Changes</vwc-table-cell>
						<vwc-table-cell>2000</vwc-table-cell>
						<vwc-table-cell>US, Canada</vwc-table-cell>
						<vwc-table-cell>Notify</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Chat</vwc-table-cell>
						<vwc-table-cell>Volumetric Changes</vwc-table-cell>
						<vwc-table-cell>3000</vwc-table-cell>
						<vwc-table-cell>UK, France</vwc-table-cell>
						<vwc-table-cell>Notify</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Video</vwc-table-cell>
						<vwc-table-cell>Rate Changes</vwc-table-cell>
						<vwc-table-cell>1500</vwc-table-cell>
						<vwc-table-cell>Germany, Italy</vwc-table-cell>
						<vwc-table-cell>Don't notify</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			</vwc-table>
	</div>`;

	await page.setViewportSize({ width: 1200, height: 400 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	const text = await page.locator('vwc-table-cell:has-text("Video")');
	await text.isVisible();

	await takeScreenshot(page, 'data-table-scrolling');
});
