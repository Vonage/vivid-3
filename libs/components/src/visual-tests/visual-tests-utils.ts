import * as fs from 'fs';
import * as path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import type {Page} from '@playwright/test';

/** @type {*} */
const layout = (function() {
	const layoutFactorial = (...attrs) =>
		(code) => `
    <script type="module" src="/assets/modules/components/layout/index.js"></script>
    <vwc-layout ${attrs.join(' ')}>${code}</vwc-layout>
`;

	const inline = layoutFactorial('gutters="small"');
	const blocks = layoutFactorial('gutters="small"', 'column-basis="block"');
	const columns = layoutFactorial('gutters="small"', 'column-basis="medium"');
	const center = code => `<div class="center">${code}</div>`;

	const layoutFun = (code, classList) => {
		if (classList.contains('full')) {
			return code;
		} else if (classList.contains('blocks')) {
			return blocks(code);
		} else if (classList.contains('columns')) {
			return columns(code);
		} else if (classList.contains('center')) {
			return center(code);
		} else if (classList.contains('inline')) {
			return inline(`<div>${code}</div>`);
		} else { // default
			return inline(`<div>${code}</div>`);
		}
	};
	return layoutFun;

})();

/** @type {*} */
const md = markdownIt({
	html: true,
	highlight: function (str, _, attrs) {
		return `<pre class="${attrs}">${str}</pre>`;
	}
});

/**
 *
 * @param {string} str - string
 * @param {string} find - string
 * @param {string} replace - string
 * @returns {*} - replaced
 */
export function replaceAll(str: string, find: string, replace: string) {
	return str.replace(new RegExp(find, 'g'), replace);
}

/**
 *
 *
 * @param {*} html - HTMLPreElement
 * @returns {*}  {NodeListOf<HTMLPreElement>}
 */
function getPreElements(html): NodeListOf<HTMLPreElement> {
	const dom = new JSDOM(html);
	return dom.window.document.querySelectorAll('pre.preview');
}

/**
 *
 *
 * 
 * @param {string} pathToReadme -readme path
 * @returns {*}  {string[]}
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

/** @type {*} */
const defaultStyles = [
	'http://127.0.0.1:8080/dist/libs/components/styles/fonts/spezia.css',
	'http://127.0.0.1:8080/dist/libs/components/styles/tokens/theme-light.css',
	'http://127.0.0.1:8080/dist/libs/components/styles/core/all.css'
];

/**
 * 
 * @param {Array} param0 - params
 * @param {Array} param0.page - params page
 * @param {Array} param0.components - params components
 * @param {Array} param0.styleUrls - params styleUrls
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
 * 
 * @param {Array} param0 - params
 * @param {Array} param0.page - params page
 * @param {Array} param0.template - params template
 */
export async function loadTemplate({
	page,
	template,
}: { page: Page, template: string }) {

	await page.$('html').then(html => html?.evaluate((html) => {
		html.classList.add('vvd-root');
	}, template));

	await page.$('body').then(body => body?.evaluate((body, template) => {
		body.innerHTML = `<div id="wrapper">${template}</div>`;
	}, template));
}
