import { test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';
import {checkA11y, injectAxe} from "axe-playwright";

const components = ['select', 'option', 'badge'];

test('a11y', async ({ page }: { page: Page }) => {

	const template = `
	<div style="height: 500px; width: 500px; display: flex; flex-wrap: nowrap;">
		<!--<vwc-select aria-label="test">
			<vwc-option value="1" text="Option 1"></vwc-option>
			<vwc-option value="2" text="Option 2"></vwc-option>
			<vwc-option value="3" text="Option 3"></vwc-option>
			<span slot="meta">
					<vwc-badge connotation="success" text="Beta"></vwc-badge>
				</span>
			</vwc-select>-->

			<vwc-select open label="test">
				<vwc-option value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
				<vwc-option value="3" text="Option 3"></vwc-option>
				<span slot="meta" class="duration">00:00:00</span>
			</vwc-select>
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

	await testWrapper?.screenshot({
		path: './snapshots/select-a11y.png',
	});

	/*const config = {
		extends: 'lighthouse:default',
		settings: {
			maxWaitForFcp: 15 * 1000,
			maxWaitForLoad: 35 * 1000,
			formFactor: 'desktop',
			screenEmulation: {
				mobile: false,
				width: 1350,
				height: 940,
				deviceScaleFactor: 1,
				disabled: false,
			},
			// eslint-disable-next-line max-len
			emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
			skipAudits: [
				'html-has-lang',
				'document-title'
			],
		},
	};

	await playAudit({
		page: page,
		thresholds: {
			accessibility: 100,
		},
		port: 9222,
		reports: {
			formats: {
				html: true,
				json: true,
			},
			name: 'select-a11y', //defaults to `lighthouse-${new Date().getTime()}`
		},
		config,
	});*/

	await page.waitForSelector('#listbox-0');
	await injectAxe(page);

	await checkA11y(page, '#wrapper', {
		detailedReport: true,
		verbose: true,
		detailedReportOptions: {
			html: true,
		}
	}, true, 'html', {
		outputDir: 'a11y-reports',
		reportFileName: 'accessibility-audit.html'
	});
});

