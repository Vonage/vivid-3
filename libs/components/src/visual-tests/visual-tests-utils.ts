import { expect, type Page } from '@playwright/test';
import { InFlightRequests } from './requests';

const defaultStyles = [
	`/libs/components/dist/styles/tokens/theme-light.css`,
	`/libs/components/dist/styles/core/all.css`,
	`/assets/fonts/speziaLocalFonts.css`,
];

export async function loadComponents({
	page,
	components,
}: {
	page: Page;
	components: string[];
}) {
	await page.goto(`/assets/ui-tests/index.html`, {
		waitUntil: 'load',
	});

	await Promise.all([
		...components.map((component) =>
			page.addScriptTag({
				url: `/libs/components/dist/${component}/index.js`,
				type: 'module',
			})
		),
		...defaultStyles.map((url) => page.addStyleTag({ url })),
	]);
}

export async function renderTemplate({
	page,
	template,
	setup,
}: {
	page: Page;
	template: string;
	setup?: () => Promise<void>;
}) {
	const requests = new InFlightRequests(page);
	await page.locator('body').evaluate((body, template) => {
		body.innerHTML = `<div id="wrapper">${template}</div>`;
	}, template);
	await requests.noneInFlight();
	if (setup) {
		await setup();
		await requests.noneInFlight();
	}
	requests.destroy();
}

export async function takeScreenshot(
	page: Page,
	name: string,
	options?: { animations?: 'disabled' | 'allow'; maxDiffPixelRatio?: number }
) {
	// Use soft assertions so that we can capture all visual changes in one test run
	expect
		.soft(
			await page.locator('#wrapper').screenshot({
				animations: options?.animations ?? 'disabled',
			})
		)
		.toMatchSnapshot(`snapshots/${name}.png`, {
			maxDiffPixelRatio: options?.maxDiffPixelRatio ?? 0,
		});
}
