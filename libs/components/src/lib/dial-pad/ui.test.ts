import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import type { ProgressRing } from '../progress-ring/progress-ring';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['dial-pad'];

test.describe('dial-pad', () => {
	test('should show the component', async ({ page }: { page: Page }) => {
		const template = `
			<div style="margin: 5px;">
				<vwc-dial-pad></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad value="1234567890"></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad
					helper-text="58 Meeting Room - Extension"
					value="4734"
				></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad placeholder="Enter a phone number"></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad disabled></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad call-active value="01146869483"></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad no-call></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad no-input></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad call-button-label="Dial"></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad call-active end-call-button-label="End"></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad pending></vwc-dial-pad>
			</div>
			<div style="margin: 5px;">
				<vwc-dial-pad
					placeholder="Only digits"
					pattern="^[0-9]*$"
					error-text="The input is invalid"
				></vwc-dial-pad>
			</div>
		`;

		await loadComponents({
			page,
			components,
		});
		await renderTemplate({
			page,
			template,
			setup: async () => {
				await page
					.locator('vwc-progress-ring')
					.evaluate((e) => ((e as ProgressRing).value = 50));
			},
		});

		await takeScreenshot(page, 'dial-pad-01-default');
	});

	[
		['', false],
		['and hidden text-field', true],
	].forEach(([s, noInput], index) => {
		test(`with autofocus ${s}`, async ({ page }: { page: Page }) => {
			const template = `
				<div style="margin: 5px;">
					<vwc-dial-pad
						value="1195"
						autofocus
 						${noInput ? 'no-input' : ''} >
 					</vwc-dial-pad>
				</div>
			`;

			await loadComponents({
				page,
				components,
			});
			await renderTemplate({
				page,
				template,
			});

			await takeScreenshot(
				page,
				`dial-pad-02-0${index + 1}-with-autofocus${s ? '-' + s : ''}`
			);
		});
	});
});
