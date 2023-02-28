const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const jsonData = [
	...require('../../_data/components.json'),
	...require('../../_data/designs.json'),
	...require('../../_data/introduction.json')
];

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap">';
const IFRAME_STYLE = '<link rel="stylesheet" href="/assets/styles/iframe.css">';
const TYPOGRAPHY = '<link rel="stylesheet" href="/assets/styles/core/all.css">';

const CBD_CONTAINER = 'cbd-container';
const CBD_DEMO = 'cbd-demo';
const CBD_DETAILS = 'cbd-details';
const CBD_CODE_BLOCK = 'cbd-code-block';

module.exports = function (content, outputPath) {
	if (!outputPath.endsWith('.html')) {
		return content;
	}

	const dom = new JSDOM(content);
	const codeBlocks = dom.window.document.querySelectorAll('pre.preview > code');
	const preBlocks = dom.window.document.querySelectorAll('pre.preview');
	preBlocks.forEach((pre, index) => {
		const code = pre.querySelector(':scope > code');
		const src = createiFrameContent(code.textContent, pre.classList, index, outputPath);
		const fragment = renderiFrame(index, src, pre.outerHTML);
		pre.replaceWith(fragment);
	});
	return dom.serialize();
};

const renderiFrame = (index, src, content) => JSDOM.fragment(`
	<div style="--tooltip-inline-size: 160px;">
		<vwc-card elevation="0" class="${CBD_CONTAINER}">
			<iframe id="iframe-sample-${index}" src="${src}" class="${CBD_DEMO}" onload=onloadIframe(this) loading="lazy" aria-label="code block preview iframe" slot="main"></iframe>
			<vwc-action-group appearance="ghost" style="direction: rtl;" slot="main">
				<vwc-button id="buttonEdit${index}" aria-label="Edit source code" icon="code-line" aria-expanded="false" aria-controls="${CBD_CODE_BLOCK}-${index}" onclick="codeBlockButtonClick(this)"></vwc-button>
				<vwc-button id="buttonCopy${index}" aria-label="Copy source code" icon="copy-2-line" data-index="${index}"></vwc-button>
			</vwc-action-group>
			<details class="${CBD_DETAILS}" slot="main">
				<summary></summary>
				<div class="cbd-live-sample" data-index="${index}" role="region">
					${content}
				</div>
			</details>
		</vwc-card>
		<vwc-tooltip anchor="buttonEdit${index}" text="Edit source code" placement="top-start"></vwc-tooltip>
		<vwc-tooltip anchor="buttonCopy${index}" text="Copy source code" placement="top-start"></vwc-tooltip>
	</div>`);

const createiFrameContent = (code, classList, index, outputPath) => {
	const componentName = outputPath.split('/').at(-2);
	const componentData = jsonData.filter(c => c.title === componentName);
	const modules = new Set(componentData?.[0]?.modules);

	const layoutResult = layout(code, classList);

	if (!classList.contains('full') && !classList.contains('center')) {
		modules.add('/assets/modules/components/layout/index.js');
	}
	
	const document =
		`<!DOCTYPE html>
		 <html class="vvd-root">
			<head>
				${IFRAME_STYLE}
			 	${FONTS}
			 	${TYPOGRAPHY}
			 	${[...modules].map(m => `<script type="module" src="${m}"></script>`).join('')}
			</head>
			<body ${classList.contains('full') ? 'id="_target"' : ''}>
			 	${layout(code, classList)}
			</body>
		 </html>`;

	const saveFolder = path.join(path.dirname(outputPath), '/frames');
	if (!fs.existsSync(saveFolder)) {
		fs.mkdirSync(saveFolder, { recursive: true });
	}
	
	const filePath = `${saveFolder}/${CBD_CODE_BLOCK}-${index}.html`;
	fs.writeFileSync(filePath, document);
	return filePath.substring(saveFolder.indexOf('docs' + path.sep) + 4);
}

const layout = (code, classList) => {
	const useLayout = (content, isTarget, column) => `
		<vwc-layout
			gutters="small"
			${isTarget ? 'id="_target"' : ''}
			${column ? `column-basis="${column}"` : ''}
		>
			${content}
		</vwc-layout>`;

	if (classList.contains('full')) return code;
	if (classList.contains('center')) return `<div id="_target" class="center">${code}</div>`;
	if (classList.contains('blocks')) return useLayout(code, true, 'block');
	if (classList.contains('blocks')) return useLayout(code, true, 'medium');
	return useLayout(`<div id="_target">${code}</div>`, false);
}
