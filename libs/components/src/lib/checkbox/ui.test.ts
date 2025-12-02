import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['checkbox', 'button', 'divider', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="margin: 5px;">
		<vwc-checkbox label="Use signed Webhooks"></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox label="Use signed Webhooks" helper-text="Signed Webhooks are a way to verify that the request is coming from Vonage."></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox label="Use signed Webhooks" checked></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox label="Select all"></vwc-checkbox>
		<script>
			document.querySelector('vwc-checkbox[label="Select all"]').indeterminate = true;
		</script>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox disabled></vwc-checkbox> 
		<vwc-checkbox disabled checked></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox readonly></vwc-checkbox> 
		<vwc-checkbox readonly checked></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox label="I agree to the terms and conditions" error-text="You must agree to the terms and conditions to proceed"></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox label="A default checkbox" success-text="Success text" checked></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox connotation="accent"></vwc-checkbox>
		<vwc-checkbox connotation="accent" checked></vwc-checkbox>
		<vwc-checkbox connotation="cta"></vwc-checkbox>
		<vwc-checkbox connotation="cta" checked></vwc-checkbox>		
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox label="Use signed Webhooks"></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<vwc-checkbox aria-checked="true"></vwc-checkbox>
		<vwc-checkbox aria-checked="false"></vwc-checkbox>
		<vwc-checkbox aria-checked="mixed"></vwc-checkbox>
	</div>
	<div style="margin: 5px;">
			<vwc-checkbox error-text="You need to accept the Terms of service">
			I agree to
			<a href="https://www.vonage.com/legal/" target="_blank"> Vonage Terms of Service </a>
		</vwc-checkbox>
	</div>
	<div style="margin: 5px;">
			<style>
				.checkbox {
					width: 300px;
				}
			</style>
			<vwc-checkbox class="checkbox" label="Use Signed Webhooks">
				<span slot="helper-text"><a href="#">Signed Webhooks</a> are a way to verify that the request is coming from Vonage.</span>
			</vwc-checkbox>
	</div>
	<div style="margin: 5px;">
		<form method="post" action="">
			<vwc-layout column-spacing="small" column-basis="block">
				<vwc-checkbox required label="I agree to the terms and conditions"></vwc-checkbox>
				<div class="buttons">
					<vwc-button label="Reset" appearance="outlined" type="reset"></vwc-button>
					<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
				</div>
			</vwc-layout>
		</form>
		
		<style>
			.buttons {
				display: flex;
				gap: 12px;
			}
		</style>
	</div>
	<div style="margin: 5px;">
		<style>
			.container {
				display: flex;
				flex-direction: column;
				gap: 12px;
			}
			.options {
				display: contents;
			}
		</style>
		<div class="container">
			<vwc-checkbox id="select-all" label="Select all"></vwc-checkbox>
			<vwc-divider></vwc-divider>
			<div class="options">
				<vwc-checkbox label="Option 1"></vwc-checkbox>
				<vwc-checkbox label="Option 2"></vwc-checkbox>
				<vwc-checkbox label="Option 3"></vwc-checkbox>
			</div>
		</div>
	</div>`;

	await page.setViewportSize({ width: 400, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
		setup: async () => {
			await page.locator('vwc-checkbox').nth(1).focus();
		},
	});

	await takeScreenshot(page, 'checkbox');
});
