import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { ProgressRing } from '../progress-ring/progress-ring';
import type { Button } from '../button/button';
import type { DialPad } from '../dial-pad/dial-pad';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['dial-pad'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);

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
