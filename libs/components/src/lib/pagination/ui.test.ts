import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['pagination'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-pagination total="10"></vwc-pagination>
		</div>
		<div style="margin: 5px;">
			<vwc-pagination total="20"></vwc-pagination>
		</div>
		<div style="margin: 5px;">
			<vwc-pagination size="super-condensed" total="20"></vwc-pagination>
			<vwc-pagination size="condensed" total="20"></vwc-pagination>
			<vwc-pagination size="normal" total="20"></vwc-pagination>
		</div>
		<div style="margin: 5px;">
			<vwc-pagination shape="rounded" total="20"></vwc-pagination>
			<vwc-pagination shape="pill" total="20"></vwc-pagination>
		</div>
		<div style="margin: 5px;">
			<vwc-pagination total="20" selected-index="5"></vwc-pagination>
		</div>
		<div style="margin: 5px;">
			<vwc-pagination total="20"></vwc-pagination>
			<vwc-pagination total="20" nav-icons></vwc-pagination>
		</div>
		<div style="margin: 5px;">
			<style>
				vwc-pagination#outlined {
					border: 1px solid var(--vvd-color-neutral-400);
					padding: 6px;
					border-radius: 24px;
					display: inline-block;
				}
			</style>

			<vwc-pagination id="outlined" total="10" shape="pill"></vwc-pagination>
		</div>
	`;

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
		'snapshots/pagination.png'
	);
});
