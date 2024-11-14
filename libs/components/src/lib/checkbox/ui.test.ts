import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['checkbox', 'button'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =
		extractHTMLBlocksFromReadme(
			path.join(new URL('.', import.meta.url).pathname, 'README.md')
		).reduce(
			(htmlString: string, block: string) =>
				`${htmlString} <div style="margin: 5px;">${block}</div>`,
			''
		) +
		`<form method="post" action="">
				<vwc-checkbox error-text="You need to accept the Terms of service">
				<a href="https://www.vonage.com/legal/" target="_blank">Vonage Terms of Service</a>
				</vwc-checkbox>
				<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
			</form>`;

	page.setViewportSize({ width: 400, height: 800 });

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.locator('vwc-checkbox').nth(1).focus();

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'snapshots/checkbox.png'
	);
});
