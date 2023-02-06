const { JSDOM } = require('jsdom');
const { decode } = require("html-entities");
const fs = require('fs');
const path = require('path');
const jsonData = [...require('../../_data/components.json'), ...require('../../_data/designs.json'), ...require('../../_data/extra.json')];
const layout = require('./layout');
const ELEVENTY_HTML_CODE_BLOCK_SELECTOR = 'pre.preview > code';

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap">';
const IFRAME_STYLE = '<link rel="stylesheet" href="/assets/styles/iframe.css">';
const TYPOGRAPHY = '<link rel="stylesheet" href="/assets/styles/core/all.css">';

const CBD_CONTAINER = 'cbd-container';
const CBD_DEMO = 'cbd-demo';
const CBD_DETAILS = 'cbd-details';
const CBD_CODE_BLOCK = 'cbd-code-block';

const getComponentName = (outputPath) => {
	const pathName = path.dirname(outputPath).substring(0, outputPath.lastIndexOf('/'));
	const componentName = pathName.substring(pathName.lastIndexOf('/') + 1);
	return componentName;
}

const getComponentData = (componentName) => jsonData.find(({ title }) => title == componentName);

const generateCodeBlockDemo = function (blockData) {
	let code = blockData.pre.querySelector('code').textContent;

	const { classList } = blockData.pre;

	code = layout(code, classList);

	const { pre: { outerHTML: codeStr }, index, outputPath } = blockData;

	const demoStr = decode(IFRAME_STYLE) + decode(FONTS) + decode(TYPOGRAPHY) + decode(code);
	const demoData = { demoStr, codeStr, index, outputPath };

	const dom = new JSDOM(`<body>${getHtml(demoData)}</body>`);

	return dom.window.document.querySelector(`.${CBD_CONTAINER}`);
};

module.exports = function (content, outputPath) {
	if (!outputPath.endsWith('.html')) {
		return content;
	}

	const blockData = {};
	blockData.outputPath = outputPath;
	const jsdomObj = new JSDOM(content);
	const codeBlocks = jsdomObj.window.document.querySelectorAll(ELEVENTY_HTML_CODE_BLOCK_SELECTOR);
	codeBlocks.forEach(function (codeBlock, index) {
		const pre = codeBlock.closest('pre');
		blockData.pre = pre;
		blockData.index = index++;
		pre.replaceWith(generateCodeBlockDemo(blockData));
	});
	return jsdomObj.serialize();
};

const getHtml = (demoData) => {
	const codeBlockId = `${CBD_CODE_BLOCK}-${demoData.index}`;
	const frameData = {};
	frameData.demoStr = demoData.demoStr;
	frameData.codeBlockId = codeBlockId;
	frameData.outputPath = demoData.outputPath;
	const iframeSrc = getIframe(frameData);

	return `
    <vwc-card elevation="0" class="${CBD_CONTAINER}">
      <iframe class="${CBD_DEMO}" src="${iframeSrc}" onload=onloadIframe(this) loading="lazy" aria-label="code block preview iframe" slot="main"></iframe>
      <vwc-action-group appearance="ghost" style="direction: rtl;" slot="main">
        <vwc-button aria-label="Show source code" icon="code-line" aria-expanded="false" aria-controls="${codeBlockId}" onclick="codeBlockButtonClick(this)"></vwc-button>
        <vwc-button aria-label="Copy source code" icon="copy-2-line" onclick="codeCopyButtonClick(this)"></vwc-button>
      </vwc-action-group>
      <details class="${CBD_DETAILS}" slot="main">
        <summary></summary>
        <div class="${CBD_CODE_BLOCK}" role="region" id="${codeBlockId}">
          ${demoData.codeStr}
        </div>
      </details>
    </vwc-card>`;
}

const getIframe = (frameData) => {
	const saveFolder = verifyAndCreateSaveFolder(frameData.outputPath);
	frameData.saveFolder = saveFolder;
	const filePath = saveCodeAsHTMLFile(frameData);
	return filePath.substring(saveFolder.indexOf('docs' + path.sep) + 4);
}

const verifyAndCreateSaveFolder = (outputPath) => {
	const saveFolder = path.join(path.dirname(outputPath), '/frames');
	if (!fs.existsSync(saveFolder)) {
		fs.mkdirSync(saveFolder, { recursive: true });
	}
	return saveFolder;
}

const addModules = (data) => {
	let modulesStr = '';
	data.modules.forEach(module => {
		modulesStr += `<script type="module" src="${module}"></script>`;
	});
	return modulesStr;
}

const saveCodeAsHTMLFile = (frameData) => {
	const filePath = `${frameData.saveFolder}/${frameData.codeBlockId}.html`;
	const componentName = getComponentName(frameData.outputPath);
	const data = getComponentData(componentName);
	frameData.demoStr += addModules(data);
	const document = `<!DOCTYPE html><html class="vvd-root">${frameData.demoStr}</html>`;
	fs.writeFileSync(filePath, document);
	return filePath;
}
