import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['data-grid'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `<div style="margin: 5px; max-width: 700px;">
			<vwc-data-grid></vwc-data-grid>
	</div>`;

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

	await page.addScriptTag({
		content: `
	const grid = document.querySelector('vwc-data-grid');
	grid.columnDefinitions = [
		{columnDataKey: 'data1', title: 'Data 1'},
		{columnDataKey: 'data2', title: 'Data 2'},
	];
	grid.rowsData = [
		{data1: 'data11 with very long text that is having a text-overflow data11 with very long text', data2: 'data12'},
		{data1: 'data11 with very long text that is having a text-overflow data11 with very long text', data2: 'data22'},
		{data1: 'data11 with very long text that is having a text-overflow data11 with very long text', data2: 'data32'},
	];
	`,
	});

	const text = await page
		.locator('vwc-data-grid-cell:has-text("data22")')
		.nth(2);
	await text.isVisible();

	const clickableCells = await page.locator('vwc-data-grid-cell');
	await clickableCells.nth(3).click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});

test('should use dynamic row height in data-cells by default', async ({
	page,
}: {
	page: Page;
}) => {
	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template: `
			<vwc-data-grid>
				<vwc-data-grid-row row-type='header'>
					<vwc-data-grid-cell cell-type='columnheader'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius
						sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus.
					</vwc-data-grid-cell>
					<vwc-data-grid-cell cell-type='columnheader'>
						Column 2
					</vwc-data-grid-cell>
				</vwc-data-grid-row>
				<vwc-data-grid-row>
					<vwc-data-grid-cell>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius
						sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus.
					</vwc-data-grid-cell>
					<vwc-data-grid-cell>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</vwc-data-grid-cell>
				</vwc-data-grid-row>
				<vwc-data-grid-row style="--data-grid-cell-block-size: 100px">
					<vwc-data-grid-cell>
						Lorem ipsum.
					</vwc-data-grid-cell>
					<vwc-data-grid-cell>
						Lorem ipsum.
					</vwc-data-grid-cell>
				</vwc-data-grid-row>
				<vwc-data-grid-row style="--data-grid-cell-white-space: nowrap">
					<vwc-data-grid-cell>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius
						sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus.
					</vwc-data-grid-cell>
					<vwc-data-grid-cell>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</vwc-data-grid-cell>
				</vwc-data-grid-row>
			</vwc-data-grid>
		`,
	});

	await page.setViewportSize({ width: 400, height: 400 });

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-multiline-text.png'
	);
});

test('single cell selection', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-data-grid id="clicked-cell" selection-mode="single-cell"></vwc-data-grid>
	</div>`;

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

	await page.addScriptTag({
		content: `
	const grid = document.querySelector('vwc-data-grid');
	grid.columnDefinitions = [
		{columnDataKey: 'data1', title: 'Data 1'},
		{columnDataKey: 'data2', title: 'Data 2'},
	];
	grid.rowsData = [
		{data1: 'data11', data2: 'data12'},
		{data1: 'data21', data2: 'data22'},
		{data1: 'data31', data2: 'data32'},
	];
	`,
	});

	const text = await page
		.locator('vwc-data-grid-cell:has-text("data22")')
		.nth(2);
	await text.isVisible();

	const clickableCell = await page.locator('#clicked-cell vwc-data-grid-cell');
	await clickableCell.nth(4).click();
	await clickableCell.nth(3).hover();
	await clickableCell.nth(3).focus();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-single-cell-select.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});

test('multi cell selection', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-data-grid id="clicked-cells" selection-mode="multi-cell"></vwc-data-grid>
	</div>`;

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

	await page.addScriptTag({
		content: `
	const grid = document.querySelector('vwc-data-grid');
	grid.columnDefinitions = [
		{columnDataKey: 'data1', title: 'Data 1'},
		{columnDataKey: 'data2', title: 'Data 2'},
	];
	grid.rowsData = [
		{data1: 'data11', data2: 'data12'},
		{data1: 'data21', data2: 'data22'},
		{data1: 'data31', data2: 'data32'},
	];
	`,
	});

	const text = await page
		.locator('vwc-data-grid-cell:has-text("data22")')
		.nth(2);
	await text.isVisible();

	const clickableCells = await page.locator(
		'#clicked-cells vwc-data-grid-cell'
	);
	await clickableCells.nth(3).click();
	await clickableCells.nth(5).click({
		modifiers: ['Meta'],
	});

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-multi-cell-select.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});

test('single row selection', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;" class="vivid-root">
			<vwc-data-grid id="clicked-row" selection-mode="single-row"
			style="--data-grid-row-background: var(--vvd-color-cta-50);"></vwc-data-grid>
	</div>`;

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

	await page.addScriptTag({
		content: `
	const grid = document.querySelector('vwc-data-grid');
	grid.columnDefinitions = [
		{columnDataKey: 'data1', title: 'Data 1'},
		{columnDataKey: 'data2', title: 'Data 2'},
	];
	grid.rowsData = [
		{data1: 'data11', data2: 'data12'},
		{data1: 'data21', data2: 'data22'},
		{data1: 'data31', data2: 'data32'},
	];
		grid.generateHeader = 'sticky';
	`,
	});

	const text = await page
		.locator('vwc-data-grid-cell:has-text("data22")')
		.nth(2);
	await text.isVisible();

	const clickableCell = await page.locator('#clicked-row vwc-data-grid-row');
	await clickableCell.nth(1).click();
	await clickableCell.nth(1).hover();
	await clickableCell.nth(2).focus();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-single-row-select.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});

test('multi row selection', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-data-grid id="clicked-row" selection-mode="multi-row"></vwc-data-grid>
	</div>`;

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

	await page.addScriptTag({
		content: `
	const grid = document.querySelector('vwc-data-grid');
	grid.columnDefinitions = [
		{columnDataKey: 'data1', title: 'Data 1'},
		{columnDataKey: 'data2', title: 'Data 2'},
	];
	grid.rowsData = [
		{data1: 'data11', data2: 'data12'},
		{data1: 'data21', data2: 'data22'},
		{data1: 'data31', data2: 'data32'},
	];
	`,
	});

	const text = await page
		.locator('vwc-data-grid-cell:has-text("data22")')
		.nth(2);
	await text.isVisible();

	const clickableCell = await page.locator('#clicked-row vwc-data-grid-row');
	await clickableCell.nth(1).click();
	await clickableCell.nth(2).click({
		modifiers: ['Meta'],
	});
	await clickableCell.nth(1).hover();
	await clickableCell.nth(2).focus();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-multi-row-select.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});

test('sort columns', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-data-grid>
				<vwc-data-grid-row role="row" class="header" row-type="header">
					<vwc-data-grid-cell aria-sort="ascending" cell-type="columnheader" role="columnheader">
					data1
					</vwc-data-grid-cell>
					<vwc-data-grid-cell aria-sort="none" cell-type="columnheader">
					data2
					</vwc-data-grid-cell>
					<vwc-data-grid-cell aria-sort="descending" cell-type="columnheader">
					data3
					</vwc-data-grid-cell>
				</vwc-data-grid-row>
			</vwc-data-grid>
	</div>`;

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

	const text = await page
		.locator('vwc-data-grid-cell:has-text("data22")')
		.nth(2);
	await text.isVisible();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-sortable-headers.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});

test('cell link click', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
			<vwc-data-grid>
				<vwc-data-grid-row role="row" class="header" row-type="header">
					<vwc-data-grid-cell aria-sort="ascending" cell-type="columnheader" role="columnheader">
					data1
					</vwc-data-grid-cell>
					<vwc-data-grid-cell aria-sort="none" cell-type="columnheader">
					data2
					</vwc-data-grid-cell>
					<vwc-data-grid-cell aria-sort="descending" cell-type="columnheader">
					data3
					</vwc-data-grid-cell>
				</vwc-data-grid-row>
				<vwc-data-grid-row role="row">
					<vwc-data-grid-cell role="gridcell" cell-type="default">
						<a href="https://google.com">Link</a>
					</vwc-data-grid-cell>
        data11
    </vwc-data-grid-cell>
				</vwc-data-grid-row>
			</vwc-data-grid>
	</div>`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.waitForLoadState('networkidle');

	const link = await page.locator('vwc-data-grid-cell a');
	await link.isVisible();
	await link.click();
	await page.pause();
	expect(await page.url()).toEqual('https://www.google.com/');
});

test('fixed columns', async function ({ page }: { page: Page }) {
	const template = `<div style="margin: 5px;">
		<style>
			.scroll-wrapper{
				width: 900px;
			}
			[data-vvd-component='data-grid-row'] {
				width: 1200px;
				display: block;
				box-sizing: border-box;
			}
		</style>
		<div class="scroll-wrapper">
			<vwc-data-grid id="fixed-columns-grid" fixed-columns="1">
				<vwc-data-grid-row row-type="sticky-header">
					<vwc-data-grid-cell cell-type="columnheader">Name</vwc-data-grid-cell>
					<vwc-data-grid-cell cell-type="columnheader">Email Address</vwc-data-grid-cell>
					<vwc-data-grid-cell cell-type="columnheader">Age</vwc-data-grid-cell>
					<vwc-data-grid-cell cell-type="columnheader">Phone Number</vwc-data-grid-cell>
					<vwc-data-grid-cell cell-type="columnheader">Full Address</vwc-data-grid-cell>
				</vwc-data-grid-row>
				<vwc-data-grid-row>
					<vwc-data-grid-cell>John Smith</vwc-data-grid-cell>
					<vwc-data-grid-cell>john.smith@email.com</vwc-data-grid-cell>
					<vwc-data-grid-cell>25</vwc-data-grid-cell>
					<vwc-data-grid-cell>(555) 123-4567</vwc-data-grid-cell>
					<vwc-data-grid-cell>123 Main St, City, State</vwc-data-grid-cell>
				</vwc-data-grid-row>
				<vwc-data-grid-row>
					<vwc-data-grid-cell>Jane Doe</vwc-data-grid-cell>
					<vwc-data-grid-cell>jane.doe@email.com</vwc-data-grid-cell>
					<vwc-data-grid-cell>30</vwc-data-grid-cell>
					<vwc-data-grid-cell>(555) 987-6543</vwc-data-grid-cell>
					<vwc-data-grid-cell>456 Oak Ave, City, State</vwc-data-grid-cell>
				</vwc-data-grid-row>
			</vwc-data-grid>
		</div>
  </div>`;

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

	const grid = await page.locator('#fixed-columns-grid');
	await grid.isVisible();

	await page.waitForTimeout(100);

	const scrollTarget = await page
		.locator('vwc-data-grid')
		.evaluateHandle((el) => {
			return el.shadowRoot?.querySelector('.base');
		});

	await scrollTarget.evaluate((el) => {
		if (el) el.scrollLeft = 50;
	});

	await page.waitForTimeout(100);

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/data-grid-fixed-columns.png',
		{ maxDiffPixelRatio: 0.01 }
	);
});
