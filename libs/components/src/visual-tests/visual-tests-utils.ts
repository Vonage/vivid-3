import * as fs from 'fs';
import * as path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import type { Page, Request } from '@playwright/test';

const layout = (function () {
	const layoutFactorial =
		(...attrs: any[]) =>
		(code: string) =>
			`
    <script type="module" src="/assets/modules/components/layout/index.js"></script>
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

export function replaceAll(str: string, find: string, replace: string) {
	return str.replace(new RegExp(find, 'g'), replace);
}

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

const defaultStyles = [
	'http://127.0.0.1:8080/dist/libs/components/styles/tokens/theme-light.css',
	'http://127.0.0.1:8080/dist/libs/components/styles/core/all.css',
	'http://127.0.0.1:8080/assets/fonts/speziaLocalFonts.css',
];

export async function loadComponents({
	page,
	components,
	styleUrls = defaultStyles,
}: {
	page: Page;
	components: string[];
	styleUrls?: string[];
}) {
	await page.goto('http://127.0.0.1:8080/scripts/visual-tests/index.html');

	await (async function () {
		for (const component of components) {
			await page.addScriptTag({
				url: `http://127.0.0.1:8080/dist/libs/components/${component}/index.js`,
				type: 'module',
			});
		}
	})();

	const styleTags$ = styleUrls.map((url) => page.addStyleTag({ url }));
	await Promise.all(styleTags$);
}

export async function loadTemplate({
	page,
	template,
}: {
	page: Page;
	template: string;
}) {
	const style = '';

	await page.$('html').then((html) =>
		html?.evaluate((html) => {
			html.classList.add('vvd-root');
		}, template)
	);

	await page.$('body').then((body) =>
		body?.evaluate(
			(body, { template, style }) => {
				body.innerHTML = `${style}<div id="wrapper">${template}</div>`;
			},
			{ template, style }
		)
	);
}

// See https://github.com/microsoft/playwright/issues/6347
export async function useFakeTime(page: Page, fakeNow: number) {
	await page.addInitScript(`{
		// Extend Date constructor to default to fakeNow
		Date = class extends Date {
			constructor(...args) {
				if (args.length === 0) {
					super(${fakeNow});
				} else {
					super(...args);
				}
			}
		}
		// Override Date.now() to start from fakeNow
		const __DateNowOffset = ${fakeNow} - Date.now();
		const __DateNow = Date.now;
		Date.now = () => __DateNow() + __DateNowOffset;
	}`);
}

export class InFlightRequests {
	private inFlightRequests: Set<Request> = new Set();

	constructor(private page: Page) {
		this.page.on('request', (request) => this.inFlightRequests.add(request));
		this.page.on('requestfinished', (request) =>
			this.inFlightRequests.delete(request)
		);
		this.page.on('requestfailed', (request) =>
			this.inFlightRequests.delete(request)
		);
	}

	noneInFlight(predicate: (request: Request) => boolean = () => true) {
		return new Promise<void>((resolve) => {
			const interval = setInterval(() => {
				if (Array.from(this.inFlightRequests).filter(predicate).length === 0) {
					clearInterval(interval);
					resolve();
				}
			}, 100);
		});
	}
}
