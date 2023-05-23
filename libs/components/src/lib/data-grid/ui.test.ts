import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['data-grid'];

export const gridTestFunction = async ({ page }: { page: Page }) => {

	const template = `<div style="margin: 5px;">
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

	await page.addScriptTag({content: `
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
	`});

	const text = await page.locator('vwc-data-grid-cell:has-text("data22")').nth(2);
	await text.isVisible();

	const clickableCells = await page.locator('vwc-data-grid-cell');
	await clickableCells.nth(3).click();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/data-grid.png',
		{ maxDiffPixelRatio: 0.01 }
	);
};

async function testCellSelection({ page }: { page: Page }) {
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

	await page.addScriptTag({content: `
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
	`});

	const text = await page.locator('vwc-data-grid-cell:has-text("data22")').nth(2);
	await text.isVisible();

	const clickableCell = await page.locator('#clicked-cell vwc-data-grid-cell');
	await clickableCell.nth(4).click();
	await clickableCell.nth(3).hover();
	await clickableCell.nth(3).focus();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/data-grid-single-cell-select.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}

async function testMultiCellSelection({ page }: { page: Page }) {
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

	await page.addScriptTag({content: `
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
	`});

	const text = await page.locator('vwc-data-grid-cell:has-text("data22")').nth(2);
	await text.isVisible();

	const clickableCells = await page.locator('#clicked-cells vwc-data-grid-cell');
	await clickableCells.nth(3).click();
	await clickableCells.nth(5).click({
		modifiers: ['Meta']
	});

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/data-grid-multi-cell-select.png',
		{ maxDiffPixelRatio: 0.01 }
	);
}

test('should show the component', gridTestFunction);
test('single cell selection', testCellSelection);
test('multi cell selection', testMultiCellSelection);
