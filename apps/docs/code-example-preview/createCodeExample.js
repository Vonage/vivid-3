const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const components = require('../content/_data/components.json');

const FONTS =
	'<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">';
const IFRAME_STYLE =
	'<link rel="stylesheet" href="/docs/assets/styles/iframe.scss">';
const IFRAME_INLINE_STYLE = `<style>
	:not(:defined), .page-not-ready {
		visibility: hidden;
	}
</style>`;

const CBD_CONTAINER = 'cbd-container';
const CBD_DEMO = 'cbd-demo';
const CBD_DETAILS = 'cbd-details';
const CBD_CODE_BLOCK = 'cbd-code-block';
const CBD_ACTIONS = 'cbd-actions';
const CBD_VARIABLES = 'cbd-variables';

const EXISTING_COMPONENTS = new Set(
	components.map((c) => c.title.toLowerCase().replaceAll(' ', '-'))
);

const OUTPUT_PATH = 'dist/apps/docs/frames';

let exampleIndex = 0;
function resetExampleIndex() {
	exampleIndex = 0;
}

function createCodeExample(code, options, cssProperties) {
	const index = exampleIndex++;
	const src = createiFrameContent(code, options, index);
	return renderiFrame(index, src, code, options, cssProperties);
}

const renderiFrame = (index, src, content, classList, variableToShow) => {
	const vwcUsages = content.match(/vwc-[\w-]+/g) ?? [];
	const uniqueComponentNames = [
		...new Set(vwcUsages.map((name) => name.replace('vwc-', ''))),
	];
	const validComponentNames = uniqueComponentNames.filter((name) =>
		EXISTING_COMPONENTS.has(name)
	);

	const deps = validComponentNames.join(',');

	const variableTable = variableToShow
		? renderVariablesTable(variableToShow)
		: '';

	const localeSwitcher = classList.includes('locale-switcher')
		? `
		<vwc-select id="selectLocale${index}" class="cbd-locale-switcher" icon="globe-line" aria-label="Locale" data-index="${index}" slot="main"></vwc-select>`
		: '';

	const toolbar = !classList.includes('example')
		? `<div class="${CBD_ACTIONS}" slot="main">
				<div>${localeSwitcher}</div>
				<vwc-action-group appearance="ghost" style="direction: rtl;" slot="main">
					<vwc-tooltip text="Edit on CodePen" placement="top">
						<vwc-button slot="anchor" id="buttonCPen${index}" connotation="cta" aria-label="Edit on CodePen" icon="open-line" data-index="${index}" data-deps="${deps}"></vwc-button>
					</vwc-tooltip>
					<vwc-tooltip text="Edit code" placement="top">
						<vwc-button slot="anchor" id="buttonEdit${index}" connotation="cta" aria-label="Edit source code" icon="code-line" aria-expanded="false" aria-controls="${CBD_CODE_BLOCK}-${index}" onclick="codeBlockButtonClick(this)"></vwc-button>
					</vwc-tooltip>
					<vwc-tooltip text="Copy code" placement="top">
						<vwc-button slot="anchor" slot="anchor" id="buttonCopy${index}" connotation="cta" aria-label="Copy source code" icon="copy-2-line" data-index="${index}"></vwc-button>
					</vwc-tooltip>
				</vwc-action-group>
			</div>`
		: '';

	return `
	<div class="${CBD_CONTAINER}" style="--tooltip-inline-size: auto" data-pagefind-ignore>
	    ${variableTable}
		<vwc-card elevation="0">
			<iframe id="iframe-sample-${index}" src="${src}" class="${CBD_DEMO}" onload=onloadIframe(this) loading="lazy" aria-label="code block preview iframe" slot="main"></iframe>
			${toolbar}
			<details class="${CBD_DETAILS}" slot="main">
				<summary></summary>
				<div class="cbd-live-sample" data-index="${index}" role="region">
					<pre>${_.escape(
						'<!-- Feel free to edit the code below. The live preview will update as you make changes. -->\n' +
							content
					)}</pre>
				</div>
			</details>
		</vwc-card>
	</div>`;
};

const createiFrameContent = (code, classList, index) => {
	let numberWithPx = '';
	for (const item of classList) {
		const match = item.match(/\d+px/);
		numberWithPx = match ? match[0] : 'auto';
	}
	const document = `<!DOCTYPE html>
		 <html class="vvd-root vvd-scrollbar" lang="en-US" style="block-size: ${numberWithPx};">
			<head>
				${IFRAME_STYLE}
				${IFRAME_INLINE_STYLE}
			 	${FONTS}
				<script type="module" src="/docs/assets/scripts/code-example/main.ts"></script>
			</head>
			<body class="page-not-ready" ${
				classList.includes('full') ? 'id="_target"' : ''
			}>
			 	${layout(code, classList)}
			</body>
		 </html>`;

	if (!fs.existsSync(OUTPUT_PATH)) {
		fs.mkdirSync(OUTPUT_PATH, { recursive: true });
	}

	const filePath = `${OUTPUT_PATH}/${CBD_CODE_BLOCK}-${index}.html`;
	fs.writeFileSync(filePath, document);
	return filePath.substring(OUTPUT_PATH.indexOf('docs' + path.sep) + 4);
};

const layout = (code, optionsList) => {
	const useLayout = (content, isTarget, column) => `
		<vwc-layout
			gutters="small"
			${isTarget ? 'id="_target"' : ''}
			${column ? `column-basis="${column}"` : ''}
		>
			${content}
		</vwc-layout>`;

	if (optionsList.includes('full')) return code;
	if (optionsList.includes('center'))
		return `<div id="_target" class="center">${code}</div>`;
	if (optionsList.includes('blocks')) return useLayout(code, true, 'block');
	if (optionsList.includes('columns')) return useLayout(code, true, 'medium');
	return useLayout(`<div id="_target">${code}</div>`, false);
};

const renderVariablesTable = (cssProperties) => {
	return `<table class="${CBD_VARIABLES}">
		<thead>
			<tr>
				<th>Variable</th>
				<th>Default value</th>
			</tr>
		</thead>
		<tbody>
			${cssProperties
				.map(
					(prop) => `
				<tr>
					<td><code>${prop.name}</code></td>
					<td>
						<div class="cbd-variables__color">
							<div class="cbd-variables__color-square" style="background-color: ${prop.default};"></div>
							<code>${prop.default}</code>
						</div>
					</td>
				</tr>
			`
				)
				.join('\n')}
		</tbody>
	</table>`;
};

module.exports = {
	resetExampleIndex,
	createCodeExample,
};
