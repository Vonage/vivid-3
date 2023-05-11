const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap">';
const IFRAME_STYLE = '<link rel="stylesheet" href="/assets/styles/iframe.css">';
const TYPOGRAPHY = '<link rel="stylesheet" href="/assets/styles/core/all.css">';

const CBD_CONTAINER = 'cbd-container';
const CBD_DEMO = 'cbd-demo';
const CBD_DETAILS = 'cbd-details';
const CBD_CODE_BLOCK = 'cbd-code-block';
const CBD_VARIABLES = 'cbd-variables';

module.exports = function renderCodeExample(index, code, pre, outputPath, componentData, cssProperties) {
	const src = createiFrameContent(code.textContent, pre.classList, index, outputPath, componentData);
	return renderiFrame(index, src, pre.outerHTML, componentData, cssProperties);
}

const renderiFrame = (index, src, content, componentData, variableToShow) => {
	const deps = componentData.modules
		.map(m => m.split('/')[4])
		.join(',');

	const variableTable = variableToShow ? renderVariablesTable(variableToShow) : '';

	return JSDOM.fragment(`
	<div class="${CBD_CONTAINER}" style="--tooltip-inline-size: auto;">
	    ${variableTable}
		<vwc-card elevation="0">
			<iframe id="iframe-sample-${index}" src="${src}" class="${CBD_DEMO}" onload=onloadIframe(this) loading="lazy" aria-label="code block preview iframe" slot="main"></iframe>
			<vwc-action-group appearance="ghost" style="direction: rtl;" slot="main">
				<vwc-button id="buttonCPen${index}" connotation="cta" aria-label="Edit on CodePen" icon="open-line" data-index="${index}" data-deps="${deps}"></vwc-button>
				<vwc-button id="buttonEdit${index}" connotation="cta" aria-label="Edit source code" icon="compose-line" aria-expanded="false" aria-controls="${CBD_CODE_BLOCK}-${index}" onclick="codeBlockButtonClick(this)"></vwc-button>
				<vwc-button id="buttonCopy${index}" connotation="cta" aria-label="Copy source code" icon="copy-2-line" data-index="${index}"></vwc-button>
			</vwc-action-group>
			<details class="${CBD_DETAILS}" slot="main">
				<summary></summary>
				<div class="cbd-live-sample" data-index="${index}" role="region">
					${content}
				</div>
			</details>
		</vwc-card>
		<vwc-tooltip anchor="buttonCPen${index}" text="Edit on CodePen" placement="top" style="text-align: center"></vwc-tooltip>
		<vwc-tooltip anchor="buttonEdit${index}" text="Edit code" placement="top" style="text-align: center"></vwc-tooltip>
		<vwc-tooltip anchor="buttonCopy${index}" text="Copy code" placement="top" style="text-align: center"></vwc-tooltip>
	</div>`);
}

const createiFrameContent = (code, classList, index, outputPath, componentData) => {
	const modules = new Set(componentData?.modules);

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

const renderVariablesTable = (cssProperties) => {
	return `<table class="${CBD_VARIABLES}">
		<thead>
			<tr>
				<th>Variable</th>
				<th>Default value</th>
			</tr>
		</thead>
		<tbody>
			${cssProperties.map(prop => `
				<tr>
					<td><code>${prop.name}</code></td>
					<td>
						<div class="cbd-variables__color">
							<div class="cbd-variables__color-square" style="background-color: ${prop.default};"></div>
							<code>${prop.default}</code>
						</div>
					</td>
				</tr>
			`).join('\n')}
		</tbody>
	</table>`
}
