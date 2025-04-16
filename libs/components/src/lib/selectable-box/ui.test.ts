import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['selectable-box', 'checkbox', 'radio', 'layout', 'card'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin:5px">
			<vwc-selectable-box aria-label="Box 1">Box content</vwc-selectable-box>
		</div>
		<div style="margin:5px">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-selectable-box control-type="checkbox" style="max-inline-size: 450px">
					Checkbox accent box
				</vwc-selectable-box>
				<vwc-selectable-box control-type="radio" style="max-inline-size: 450px">
					Radio accent box
				</vwc-selectable-box>
				<vwc-selectable-box control-type="checkbox" connotation="cta" style="max-inline-size: 450px">
					Checkbox CTA box
				</vwc-selectable-box>
				<vwc-selectable-box connotation="cta" control-type="radio" style="max-inline-size: 450px">
					Radio CTA box
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<div style="margin:5px">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-selectable-box connotation="accent" style="max-inline-size: 450px">
					Accent box
				</vwc-selectable-box>
				<vwc-selectable-box connotation="cta" style="max-inline-size: 450px">
					CTA box
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<div style="margin:5px">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-selectable-box clickable-box style="max-inline-size: 450px">
					Clickable accent box
				</vwc-selectable-box>
				<vwc-selectable-box
					clickable-box
					connotation="cta"
					style="max-inline-size: 450px"
				>
					Clickable CTA box
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<div style="margin:5px">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-selectable-box
					control-type="checkbox"
					checked
					style="max-inline-size: 450px"
				>
					Checked checkbox box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="radio"
					checked
					style="max-inline-size: 450px"
				>
					Checked radio box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="checkbox"
					connotation="cta"
					checked
					style="max-inline-size: 450px"
				>
					Checked CTA checkbox box
				</vwc-selectable-box>
				<vwc-selectable-box
					control-type="radio"
					connotation="cta"
					checked
					style="max-inline-size: 450px"
				>
					Checked CTA radio box
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<div style="margin:5px">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-selectable-box tight style="max-inline-size: 450px">
					Tight box
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<div style="margin:5px">
			<vwc-layout gutters="small" row-spacing="small" column-basis="block">
				<vwc-selectable-box
					style="--selectable-box-spacing: 8px; max-inline-size: 450px"
				>
					Custom spaced box
				</vwc-selectable-box>
			</vwc-layout>
		</div>
		<div style="margin:5px">
			<vwc-layout role="group" aria-label="pick your ios">
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
		</div>
		<div style="margin:5px">
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
