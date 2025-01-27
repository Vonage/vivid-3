import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { ProgressRing } from '../progress-ring/progress-ring';
import type { Button } from '../button/button';
import type { DialPad } from '../dial-pad/dial-pad';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['dial-pad'];

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
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.evaluate(() => {
		const pendingDialPad = document.querySelector(
			'vwc-dial-pad[pending]'
		) as DialPad;
		const pendingButton = pendingDialPad.shadowRoot?.querySelector(
			'vwc-button[pending]'
		) as Button;
		const indicator = pendingButton.shadowRoot?.querySelector(
			'vwc-progress-ring'
		) as ProgressRing;
		if (indicator) indicator.value = 50;
	});

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/dial-pad.png'
	);
});
