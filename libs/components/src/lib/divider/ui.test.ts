import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['divider', 'button', 'action-group', 'card', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="margin: 5px;">
			<vwc-divider orientation="horizontal"></vwc-divider>
			<vwc-divider orientation="vertical" style="block-size: 40px;"></vwc-divider>
		</div>
		<div style="margin: 5px;">
			<vwc-action-group appearance="fieldset">
				<vwc-button icon="transfer-line"></vwc-button>
				<vwc-divider orientation="vertical"></vwc-divider>
				<vwc-button icon="compose-line"></vwc-button>
			</vwc-action-group>
		</div>
		<div style="margin: 5px;">
			<style>
				vwc-card {
					width: 400px;
				}

				.demo-footer {
					display: flex;
					column-gap: 8px;
					justify-content: flex-end;
				}
			</style>

			<vwc-card>
				<vwc-layout column-basis="block" gutters="small" slot="main">
					Choose the button you like best in this card :)

					<vwc-divider></vwc-divider>

					<div class="demo-footer">
						<vwc-button label="Cancel" appearance="outlined"></vwc-button>
						<vwc-button label="Submit" appearance="filled"></vwc-button>
					</div>
				</vwc-layout>
			</vwc-card>
		</div>
		<div style="margin: 5px;">
			<style>
				vwc-layout {
					--layout-grid-template-columns: 1fr auto 1fr;
				}

				vwc-divider {
					display: flex;
					align-items: center;
				}
			</style>

			<vwc-layout>
				<vwc-divider role="presentation"></vwc-divider>
				More Info
				<vwc-divider role="presentation"></vwc-divider>
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

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/divider.png'
	);
});
