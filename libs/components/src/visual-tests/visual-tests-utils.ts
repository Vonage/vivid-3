import * as fs from 'fs';
import * as path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import type {Page} from '@playwright/test';

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
	'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap', // !this break the tests watch mode
	'http://127.0.0.1:8080/dist/libs/components/styles/tokens/theme-light.css',
	'http://127.0.0.1:8080/dist/libs/components/styles/core/all.css'
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
	const browserType = page.context()?.browser()?.browserType().name();

	const style = browserType !== 'webkit' ? '' : `
		<style>
			* {
				--vvd-font-family-upright: Arial;
				--vvd-font-family-monospace: Arial;
			}
		</style>
	`;
	await page.$('html').then(html => html?.evaluate((html) => {
		html.classList.add('vvd-root');
	}, template));

	await page.$('body').then(body => body?.evaluate((body, {template, style}) => {
		body.innerHTML = `${style}<div id="wrapper">${template}</div>`;
	}, {template, style}));
}
