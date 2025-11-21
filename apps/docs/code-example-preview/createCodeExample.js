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

const CBD_VARIABLES = 'cbd-variables';

const EXISTING_COMPONENTS = new Set(
	components.map((c) => c.title.toLowerCase().replaceAll(' ', '-'))
);

const OUTPUT_PATH = 'dist/frames';

let exampleIndexes = new Map();
function nextExampleIndex(forUrl) {
	const newIndex = (exampleIndexes.get(forUrl) ?? 0) + 1;
	exampleIndexes.set(forUrl, newIndex);
	return newIndex;
}
function getExampleId(forUrl) {
	// e.g. '/components/dialog/use-cases/' -> 'components-dialog-use-cases'
	const name = forUrl
		.substring(1, forUrl.length - 1)
		.replace(/[^a-zA-Z0-9]/g, '-');

	return `${name}-${nextExampleIndex(forUrl)}`;
}
function resetExampleIndex() {
	exampleIndexes.clear();
}

function createCodeExample({ code, options, cssProperties, url, lang }) {
	const id = getExampleId(url);
	const src = createExample(code, options, id, lang);
	return renderLiveSample(src, code, options, cssProperties, lang);
}

const renderLiveSample = (src, content, classList, variableToShow, lang) => {
	const code = _.escape(content).trim();

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

	const showLocaleSwitcher = classList.includes('locale-switcher');
	const hideToolbar = classList.includes('example');

	return `
		<docs-live-sample
			example-lang="${lang}"
			example-src="${src}"
			example-code="${code}"
			deps="${deps}"
			${showLocaleSwitcher ? 'locale-switcher' : ''}
			${hideToolbar ? 'hide-toolbar' : ''}
			data-pagefind-ignore
		>
			${variableTable}
		</docs-live-sample>
	`;
};

const createExample = (code, classList, id, lang) => {
	switch (lang) {
		case 'html':
			return createHTMLExample(code, classList, id);
		case 'vue':
			return createVueExample(code, classList, id);
	}
};

const createHTMLExample = (code, classList, id) => {
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

	const filePath = `${OUTPUT_PATH}/${id}.html`;
	fs.writeFileSync(filePath, document);
	return `/frames/${id}.html`;
};

const createVueExample = (code, classList, id) => {
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
			</head>
			<body ${classList.includes('full') ? 'id="_target"' : ''}>
				<div id="app" style="padding: 16px"></div>
			 	<script type="module">
					import { createApp } from 'vue'
					import { vividVue } from '@vonage/vivid-vue';
					import { setLocale } from '@vonage/vivid';

					import Example from './example-${id}.vue'

					createApp(Example).use(vividVue, {
						font: 'none'
					}).mount('#app')

					window.setLocale = setLocale;
				</script>
			</body>
		 </html>`;

	if (!fs.existsSync(OUTPUT_PATH)) {
		fs.mkdirSync(OUTPUT_PATH, { recursive: true });
	}

	const vueFilePath = `${OUTPUT_PATH}/example-${id}.vue`;
	fs.writeFileSync(vueFilePath, code);

	const filePath = `${OUTPUT_PATH}/${id}.html`;
	fs.writeFileSync(filePath, document);
	return `/frames/${id}.html`;
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
