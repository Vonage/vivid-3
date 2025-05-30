import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tag-group', 'tag'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>#wrapper{height: 250px; width: 1600px; display: flex; flex-wrap: wrap;}</style>
		<div style="margin: 5px;">
			<vwc-tag-group>
				<vwc-tag label="first tag"></vwc-tag>
				<vwc-tag label="second tag"></vwc-tag>
				<vwc-tag label="third tag"></vwc-tag>
			</vwc-tag-group>
		</div>
		<div style="margin: 5px;">
			<vwc-tag-group>
				<vwc-tag label="first tag" selectable selected></vwc-tag>
				<vwc-tag label="second tag" selectable></vwc-tag>
				<vwc-tag label="third tag" selectable selected></vwc-tag>
			</vwc-tag-group>
		</div>
		<div style="margin: 5px;">
			<vwc-tag-group>
				<vwc-tag label="first tag" removable></vwc-tag>
				<vwc-tag label="second tag" removable></vwc-tag>
				<vwc-tag label="third tag" removable></vwc-tag>
			</vwc-tag-group>
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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/tag-group.png'
	);
});
