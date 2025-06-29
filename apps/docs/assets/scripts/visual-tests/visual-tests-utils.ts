import * as fs from 'fs';
import * as path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import type { Page } from '@playwright/test';

const BASE_URL = Boolean(process.env.PW_TEST_CONNECT_WS_ENDPOINT)
	? 'http://hostmachine:8080/playground/'
	: 'http://localhost:8080/playground/';

const layout = (function () {
	const layoutFactorial =
		(...attrs: string[]) =>
		(code: string) =>
			`
    <vwc-layout ${attrs.join(' ')}>${code}</vwc-layout>
`;

	const inline = layoutFactorial('gutters="small"');
	const blocks = layoutFactorial('gutters="small"', 'column-basis="block"');
	const columns = layoutFactorial('gutters="small"', 'column-basis="medium"');
	const center = (code: string) => `<div class="center">${code}</div>`;

	const layoutFun = (code: string, classList: DOMTokenList) => {
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
		} else {
			// default
			return inline(`<div>${code}</div>`);
		}
	};
	return layoutFun;
})();

const md = markdownIt({
	html: true,
	highlight: function (str, _, attrs) {
		return `<pre class="${attrs}">${str}</pre>`;
	},
});

function getPreElements(html: string): NodeListOf<HTMLPreElement> {
	const dom = new JSDOM(html);
	return dom.window.document.querySelectorAll('pre.preview');
}

export function extractHTMLBlocksFromReadme(pathToReadme: string): string[] {
	const readmeFileContents = fs
		.readFileSync(path.resolve(pathToReadme))
		.toString();
	const html = md.render(readmeFileContents);
	const preElements = getPreElements(html);
	return Array.from(preElements).map(({ innerHTML, classList }) =>
		layout(innerHTML, classList)
	);
}

export async function loadPage({ page }: { page: Page }) {
	await page.goto(BASE_URL);
}

export async function loadTemplate({
	page,
	template,
}: {
	page: Page;
	template: string;
}) {
	await page.$('body').then((body) =>
		body?.evaluate(
			(body, { template }) => {
				body.innerHTML = `<div id="wrapper">${template}</div>`;
			},
			{ template }
		)
	);
}
