import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['tag-group', 'tag'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<style>
			#wrapper{height: 250px; width: 1600px;}
			.wrapper{ width: 1600px; display: flex; flex-wrap: wrap;}
		</style>
		<div class="wrapper">
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag"></vwc-tag>
					<vwc-tag label="second tag"></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group id="removable">
					<vwc-tag label="first tag" selectable selected class="focus"></vwc-tag>
					<vwc-tag label="second tag" selectable></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" removable></vwc-tag>
					<vwc-tag label="second tag" removable></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" appearance="duotone"></vwc-tag>
					<vwc-tag label="second tag" appearance="duotone"></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" appearance="duotone" selectable selected></vwc-tag>
					<vwc-tag label="second tag" appearance="duotone" selectable></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" appearance="duotone" removable></vwc-tag>
					<vwc-tag label="second tag" appearance="duotone" removable></vwc-tag>
				</vwc-tag-group>
			</div>
		</div>
		<div class="wrapper">
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" connotation="cta"></vwc-tag>
					<vwc-tag label="second tag" connotation="cta"></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" connotation="cta" selectable selected></vwc-tag>
					<vwc-tag label="second tag" connotation="cta" selectable></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" connotation="cta" removable></vwc-tag>
					<vwc-tag label="second tag" connotation="cta" removable></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" connotation="cta" appearance="duotone"></vwc-tag>
					<vwc-tag label="second tag" connotation="cta" appearance="duotone"></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" connotation="cta" appearance="duotone" selectable selected></vwc-tag>
					<vwc-tag label="second tag" connotation="cta" appearance="duotone" selectable></vwc-tag>
				</vwc-tag-group>
			</div>
			<div style="margin: 5px;">
				<vwc-tag-group>
					<vwc-tag label="first tag" connotation="cta" appearance="duotone" removable></vwc-tag>
					<vwc-tag label="second tag" connotation="cta" appearance="duotone" removable></vwc-tag>
				</vwc-tag-group>
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
	const focusRemovableBtn = await page.$('#removable .focus .dismiss-button');
	await focusRemovableBtn?.focus();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/tag-group.png'
	);
});
