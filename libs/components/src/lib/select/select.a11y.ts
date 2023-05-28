import { test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse'
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['select', 'option', 'badge'];

test('a11y', async ({ page }: { page: Page }) => {

	const template = `
		<vwc-select aria-label="test">
			<vwc-option value="1" text="Option 1"></vwc-option>
			<vwc-option value="2" text="Option 2"></vwc-option>
			<vwc-option value="3" text="Option 3"></vwc-option>
			<span slot="meta">
					<vwc-badge connotation="success" text="Beta"></vwc-badge>
				</span>
			</vwc-select>

			<vwc-select open aria-label="test">
			<vwc-option value="1" text="Option 1"></vwc-option>
			<vwc-option value="2" text="Option 2"></vwc-option>
			<vwc-option value="3" text="Option 3"></vwc-option>
			<span slot="meta" class="duration">00:00:00</span>
		</vwc-select>
	`;

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	const config = {
		extends: 'lighthouse:default',
		settings: {
			skipAudits: [
				'html-has-lang','document-title'
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
				html: true, //defaults to false
			},
			name: 'select-a11y', //defaults to `lighthouse-${new Date().getTime()}`
		},
		config,
	});
});
