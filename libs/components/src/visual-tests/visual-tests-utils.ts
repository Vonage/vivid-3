import * as fs from 'fs';
import * as path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import type {Page} from '@playwright/test';

const md = markdownIt({
	html: true,
	highlight: function (str, _, attrs) {
		return `<pre class="${attrs}">${str}</pre>`;
	}
});

/**
 * @param str
 * @param find
 * @param replace
 */
export function replaceAll(str: string, find: string, replace: string) {
	return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * @param html
 */
function getReadmeFileSnippets(html) {
	const dom = new JSDOM(html);
	const codes = dom.window.document.querySelectorAll('pre.preview');
	return Array.from(codes).map((code) => code.innerHTML);
}

/**
 * @param pathToReadme
 */
export function extractHTMLBlocksFromReadme(pathToReadme: string): string[] {
	const readmeFileContents = fs.readFileSync(path.resolve(pathToReadme))
		.toString();
	const html = md.render(readmeFileContents);
	return getReadmeFileSnippets(html);
}

const defaultStyles = [
	'http://127.0.0.1:8080/dist/libs/styles/fonts/spezia.css',
	'http://127.0.0.1:8080/dist/libs/styles/themes/light.css'
];

/**
 * @param root0
 * @param root0.page
 * @param root0.components
 * @param root0.styleUrls
 */
export async function loadComponents({
	page,
	components,
	styleUrls = defaultStyles,
}: {
	page: Page,
	components: string[],
	styleUrls?: string[]
}) {
	await page.goto('http://127.0.0.1:8080/scripts/visual-tests/index.html');

	(async function () {
		for (const component of components) {
			await page.addScriptTag({
				url: `http://127.0.0.1:8080/dist/libs/components/${component}/index.js`,
				type: 'module',
			});
		}
	})();

	const styleTags$ = styleUrls.map(url => page.addStyleTag({url}));
	await Promise.all(styleTags$);
}

/**
 * @param root0
 * @param root0.page
 * @param root0.template
 */
export async function loadTemplate({
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
