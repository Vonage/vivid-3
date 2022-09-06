import * as fs from 'fs';
import * as path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import type {Page} from '@playwright/test';
import layout from '../../../../apps/docs/transformers/code-block-demo/layout.js';

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
function getPreElements(html): NodeListOf<HTMLPreElement> {
	const dom = new JSDOM(html);
	return dom.window.document.querySelectorAll('pre.preview');
}

/**
 * @param pathToReadme
 */
export function extractHTMLBlocksFromReadme(pathToReadme: string): string[] {
	const readmeFileContents = fs.readFileSync(path.resolve(pathToReadme))
		.toString();
	const html = md.render(readmeFileContents);
	const preElements = getPreElements(html);
	return Array.from(preElements).map(({ innerHTML, classList }) =>
		layout(innerHTML, classList)
	);
}

const defaultStyles = [
	'http://127.0.0.1:8080/dist/libs/components/styles/fonts/spezia.css',
	'http://127.0.0.1:8080/dist/libs/components/styles/themes/light.css',
	'http://127.0.0.1:8080/dist/libs/components/styles/typography/desktop.css'
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

	await page.$('body').then(body => body?.evaluate((body, template) => {
		body.classList.add('vvd-root');
	}, template));

	await page.$('body').then(body => body?.evaluate((body, template) => {
		body.innerHTML = `<div id="wrapper">${template}</div>`;
	}, template));
}
