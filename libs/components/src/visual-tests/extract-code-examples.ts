import fs from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';

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
