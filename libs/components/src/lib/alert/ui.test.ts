import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['alert', 'button', 'switch'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
		<div style="padding: 5px; display: flex; flex-direction: column; gap: 8px;">
			<vwc-alert open strategy="static" headline="Headline"></vwc-alert>
			<vwc-alert open strategy="static" text="Text"></vwc-alert>
			<vwc-alert open strategy="static" headline="Headline" text="Text"></vwc-alert>
			<vwc-alert open strategy="static" connotation="error" icon="user-line" text="With icon"></vwc-alert>
			<vwc-alert open strategy="static" connotation="error" icon="user-line" headline="Headline" text="With icon"></vwc-alert>
			<vwc-alert open strategy="static" headline="With action items">
				<vwc-button slot="action-items" appearance="outlined" label="Action"></vwc-button>
				<vwc-button slot="action-items" appearance="outlined" label="Action"></vwc-button>
			</vwc-alert>
			<vwc-alert open strategy="static" connotation="accent" text="accent"></vwc-alert>
			<vwc-alert open strategy="static" connotation="information" text="information"></vwc-alert>
			<vwc-alert open strategy="static" connotation="success" text="success"></vwc-alert>
			<vwc-alert open strategy="static" connotation="warning" text="warning"></vwc-alert>
			<vwc-alert open strategy="static" connotation="alert" text="alert"></vwc-alert>
			<vwc-alert open strategy="static" connotation="announcement" text="announcement"></vwc-alert>
		</div>
	`;

	page.setViewportSize({ width: 420, height: 2750 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'alert');
});

test('alert in mobile screens', async function ({ page }: { page: Page }) {
	const template = `
			<div style="margin: 5px; height: 250px; transform: translateY(0px);">
			<vwc-alert text="Some important information for you" removable open></vwc-alert>
			</div>
`;

	await page.setViewportSize({ width: 420, height: 300 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'alert-mobile');
});

test('alert placement', async function ({ page }: { page: Page }) {
	const template = `
			<div style="margin: 5px; height: 250px; transform: translateY(0px);">
			<vwc-alert text="top-start" open placement="top-start"></vwc-alert>
			<vwc-alert text="top" open placement="top"></vwc-alert>
			<vwc-alert text="top-end" open placement="top-end"></vwc-alert>
			<vwc-alert text="bottom-start" open placement="bottom-start"></vwc-alert>
			<vwc-alert text="bottom" open placement="bottom"></vwc-alert>
			<vwc-alert text="bottom-end" open placement="bottom-end"></vwc-alert>
			</div>
`;

	await page.setViewportSize({ width: 560, height: 500 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'alert-placement');
});

test('alert with main slot content', async function ({ page }: { page: Page }) {
	const template = `
		<div style="margin: 5px; height: 250px; transform: translateY(0px);">
			<vwc-alert headline="This requires your attention" open placement="top">
				<vwc-switch slot="main" label="Do not show more alerts"></vwc-switch>
			</vwc-alert>
			<vwc-alert headline="This requires your attention" text="Some important information for you" open placement="bottom">
				<vwc-switch slot="main" label="Do not show more alerts"></vwc-switch>
			</vwc-alert>
		</div>
`;

	await page.setViewportSize({ width: 560, height: 500 });

	await loadComponents({
		page,
		components,
	});
	await renderTemplate({
		page,
		template,
	});

	await takeScreenshot(page, 'alert-main-slot');
});
