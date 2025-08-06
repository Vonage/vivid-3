import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['selectable-box', 'checkbox', 'radio', 'layout', 'card'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div class="wrapper">
			<vwc-layout column-basis="large" row-spacing="small" column-spacing="small">
				<vwc-selectable-box aria-label="Box 1">Box content</vwc-selectable-box>
				<vwc-selectable-box control-type="checkbox">
					Checkbox accent box
				</vwc-selectable-box>
				<vwc-selectable-box control-type="radio">
					Radio accent box
				</vwc-selectable-box>
				<vwc-selectable-box control-type="checkbox" connotation="cta">
					Checkbox CTA box
				</vwc-selectable-box>
				<vwc-selectable-box connotation="cta" control-type="radio">
					Radio CTA box
				</vwc-selectable-box>
				<vwc-selectable-box connotation="accent">
					Accent box
				</vwc-selectable-box>
				<vwc-selectable-box connotation="cta">
					CTA box
				</vwc-selectable-box>
				<vwc-selectable-box clickable-box>
					Clickable accent box
				</vwc-selectable-box>
				<vwc-selectable-box
					clickable-box
					connotation="cta"
				>
					Clickable CTA box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="checkbox"
					checked
				>
					Checked checkbox box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="radio"
					checked
				>
					Checked radio box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="checkbox"
					connotation="cta"
					checked
				>
					Checked CTA checkbox box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="radio"
					connotation="cta"
					checked
				>
					Checked CTA radio box
				</vwc-selectable-box>
				<vwc-selectable-box tight>
					Tight box
				</vwc-selectable-box>
				<vwc-selectable-box style="--selectable-box-spacing: 8px;">
					Custom spaced box
				</vwc-selectable-box>
				<vwc-selectable-box control-placement="start-stacked">
					Control placement: <strong>start-stacked</strong>
				</vwc-selectable-box>
				<vwc-selectable-box control-placement="end">
					Control placement: <strong>end</strong>
				</vwc-selectable-box>
				<vwc-selectable-box control-placement="start">
					Control placement: <strong>start</strong>
				</vwc-selectable-box>
			</vwc-layout>
			<vwc-layout role="group" aria-label="pick your ios" gutters="small-block">
				<vwc-selectable-box tight clickable-box style="max-inline-size: 450px">
					<vwc-card
						headline="Card Component"
						subtitle="My IOS is Android"
						appearance="ghost"
					>
						<vwc-icon
							slot="graphic"
							name="android-mono"
							style="font-size: 44px; color: #A4C439"
						></vwc-icon>
					</vwc-card>
				</vwc-selectable-box>
				<vwc-selectable-box tight clickable-box style="max-inline-size: 450px">
					<vwc-card
						headline="Card Component"
						subtitle="My IOS is Apple"
						appearance="ghost"
					>
						<vwc-icon
							slot="graphic"
							name="apple-color"
							style="font-size: 44px; color: #555555"
						></vwc-icon>
					</vwc-card>
				</vwc-selectable-box>
				<vwc-selectable-box tight clickable-box style="max-inline-size: 450px">
					<vwc-card
						headline="Card Component"
						subtitle="My IOS is Windows"
						appearance="ghost"
					>
						<vwc-icon
							slot="graphic"
							name="windows-color"
							style="font-size: 44px;"
						></vwc-icon>
					</vwc-card>
				</vwc-selectable-box>
			</vwc-layout>
			<vwc-layout role="group">
				<vwc-selectable-box
					aria-label="Bright ideas"
					tight
					style="inline-size: fit-content"
					clickable-box
				>
					<img
						style="display: block"
						src="https://doodleipsum.com/350x200?bg=C863D9&i=0b3f4112a9c5e358c439c4be74380e54"
						alt="Lots of ideas"
					/>
				</vwc-selectable-box>
				<vwc-selectable-box
					aria-label="Take a load off"
					tight
					style="inline-size: fit-content"
					clickable-box
				>
					<img
						style="display: block"
						src="https://doodleipsum.com/350x200/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
						alt="Sitting on Floor"
					/>
				</vwc-selectable-box>
				<vwc-selectable-box
					aria-label="Get located"
					tight
					style="inline-size: fit-content"
					clickable-box
				>
					<img
						style="display: block"
						src="https://doodleipsum.com/350x200?bg=7463D9&i=6af2fcb146f3b99cfa1371242b2eee55"
						alt="Get located"
					/>
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<style>
			.wrapper{
				padding: 16px 8px;	
			}
		</style>
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

	await page.locator('vwc-selectable-box').nth(0).focus();

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/selectable-box.png'
	);
});
