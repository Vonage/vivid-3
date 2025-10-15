import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
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
				<vwc-selectable-box checked style="--selectable-box-checked-bg: #ffff00;">
					Custom selected background
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
						src="/assets/ui-tests/illustrations/ideas-350x200.png"
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
						src="/assets/ui-tests/illustrations/sitting-on-floor-350x200.png"
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
						src="/assets/ui-tests/illustrations/map-350x200.png"
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
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-selectable-box').nth(0).focus();
		},
	});

	await takeScreenshot(page, 'selectable-box');
});
