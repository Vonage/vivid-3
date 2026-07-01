import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['data-grid', 'button'];

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
	await renderTemplate({
		page,
		template,
	});

	const link = page.locator('vwc-data-grid-cell a');
	await link.isVisible();
	await link.click();
	await page.pause();
	expect(page.url()).toEqual('https://www.google.com/');
});
