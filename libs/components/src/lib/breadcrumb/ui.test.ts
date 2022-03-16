import * as path from 'path';
import { expect, Page, test } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponent,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils';

const componentName = 'breadcrumb';

async function injectBreadcrumbItem(page: Page) {
	await page.addScriptTag({
		url: 'http://127.0.0.1:8080/dist/libs/components/breadcrumb-item/index.js',
		type: 'module',
	});
}

test('should show the component', async ({ page }: { page: Page }) => {
	const template = extractHTMLBlocksFromReadme(
		path.join(__dirname, 'README.md')
	).reduce(
		(htmlString: string, block: string) =>
			`${htmlString} <div style="margin: 5px;">${block}</div>`,
		''
	);
	await page.pause();
	await loadComponent({
		page,
		componentName,
	});
	await injectBreadcrumbItem(page);
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	await page.pause();
	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/breadcrumb.png'
	);
});
