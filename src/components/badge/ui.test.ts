import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import { extractHTMLBlocksFromReadme } from '../../../scripts/visual-tests/utils';

/**
 * @param root0
 * @param root0.page
 * @param root0.componentName
 * @param root0.styleUrl
 */
async function loadComponent({
	page,
	componentName,
	styleUrl = 'http://127.0.0.1:8080/dist/core/theme/light.css',
}: {
	page: Page,
	componentName: string,
	styleUrl?: string
}) {
	await page.goto('http://127.0.0.1:8080/scripts/visual-tests/index.html');

	await page.addScriptTag({
		url: `http://127.0.0.1:8080/dist/components/${componentName}/${componentName}.js`,
		type: 'module',
	});

	await page.addStyleTag({
		url: styleUrl,
	});
}

/**
 * @param root0
 * @param root0.page
 * @param root0.template
 */
async function loadTemplate({
	page,
	template,
}: { page: Page, template: string }) {
	const wrappedTemplate = `<div id="wrapper">${template}</div>`;
	await page.addScriptTag({
		content: `
            document.body.innerHTML = \`${wrappedTemplate}\`;
        `,
	});
}

const componentName = 'badge';
test('should have all connotations', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(path.join(__dirname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px;">${block}</div>`, '');

	await loadComponent({
		page,
		componentName,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/badge.png',
		);
});
