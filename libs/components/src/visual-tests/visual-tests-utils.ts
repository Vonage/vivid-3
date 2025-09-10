import type { Page } from '@playwright/test';

const BASE_URL = Boolean(process.env.PW_TEST_CONNECT_WS_ENDPOINT)
	? 'http://hostmachine:8080'
	: 'http://localhost:8080';

const defaultStyles = [
	`${BASE_URL}/libs/components/dist/styles/tokens/theme-light.css`,
	`${BASE_URL}/libs/components/dist/styles/core/all.css`,
	`${BASE_URL}/assets/fonts/speziaLocalFonts.css`,
];

export async function loadComponents({
	page,
	components,
}: {
	page: Page;
	components: string[];
}) {
	await page.goto(`${BASE_URL}/assets/ui-tests/index.html`);

	await Promise.all([
		components.map((component) =>
			page.addScriptTag({
				url: `${BASE_URL}/libs/components/dist/${component}/index.js`,
				type: 'module',
			})
		),
		defaultStyles.map((url) => page.addStyleTag({ url })),
	]);
}

export async function loadTemplate({
	page,
	template,
}: {
	page: Page;
	template: string;
}) {
	await page.locator('body').evaluate((body, template) => {
		body.innerHTML = `<div id="wrapper">${template}</div>`;
	}, template);
}
