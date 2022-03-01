const { JSDOM } = require('jsdom');
const { decode } = require("html-entities");
const fs = require('fs');
const path = require('path');
const ELEVENTY_HTML_CODE_BLOCK_SELECTOR = 'pre > code.language-html';

const CBD_BASE = 'cbd-base';
const CBD_DEMO = 'cbd-demo';
const CBD_DETAILS = 'cbd-details';
const CBD_BUTTON_SHOW = 'cbd-button-show';
const CBD_CODE_BLOCK = 'cbd-code-block';
const generateCodeBlockDemo = function (blockData) {
    const demoData = {};
    const code = blockData.pre.querySelector('code')?.textContent;
    demoData.demoStr = decode(blockData.headEl.innerHTML) + decode(code);
    demoData.codeStr = blockData.pre.outerHTML;
    demoData.index = blockData.index;
    demoData.outputPath = blockData.outputPath;
    const dom = new JSDOM(`<body>${getHtml(demoData)}</body>`);

    return dom.window.document.querySelector(`.${CBD_BASE}`);
};
module.exports = function (content, outputPath) {
    if (!outputPath.endsWith('.html')) {
        return content;
    }
    const blockData = {};
    blockData.outputPath = outputPath;
    const document = new JSDOM(content).window.document;
    const headEl = document.documentElement.querySelector('head');
    blockData.headEl = headEl;
    const codeBlocks = document.querySelectorAll(ELEVENTY_HTML_CODE_BLOCK_SELECTOR);
    codeBlocks.forEach(function (codeBlock, index) {
        const pre = codeBlock.closest('pre');
        blockData.pre = pre;
        blockData.index = index ++;
        pre.replaceWith(generateCodeBlockDemo(blockData));
    });
    headEl.insertAdjacentHTML('beforeend', style);
    headEl.insertAdjacentHTML('beforeend', script);
    return document.documentElement.outerHTML;
};

const getHtml = (demoData) => {
    const codeBlockId = `${CBD_CODE_BLOCK}-${demoData.index}`;
    const frameData = {};
    frameData.demoStr = demoData.demoStr;
    frameData.codeBlockId = codeBlockId;
    frameData.outputPath = demoData.outputPath;
    const iframeSrc = getIframe(frameData);

    return `
    <div class="${CBD_BASE}">
        <iframe class="${CBD_DEMO}" src="${iframeSrc}" onload=onloadIframe(this) loading="lazy"></iframe>
        <details class="${CBD_DETAILS}">
            <summary>
                <button class="${CBD_BUTTON_SHOW}" aria-expanded="false" aria-controls="${codeBlockId}">
                    show code
                </button>
            </summary>
            <div class="${CBD_CODE_BLOCK}" role="region" id="${codeBlockId}">
                ${demoData.codeStr}
            </div>
        </details>
    </div>`;
}

const getIframe = (frameData) => {
    const saveFolder = verifyAndCreateSaveFolder(frameData.outputPath);
    frameData.saveFolder = saveFolder;
    const filePath = saveCodeAsHTMLFile(frameData);
    return filePath.substring(saveFolder.indexOf('docs/') + 4);
}

const verifyAndCreateSaveFolder = (outputPath) => {
    const saveFolder = path.join(path.dirname(outputPath), '/frames');
    if (!fs.existsSync(saveFolder)) {
      fs.mkdirSync(saveFolder, { recursive: true });
    }
    return saveFolder;
}

const saveCodeAsHTMLFile = (frameData) => {
    const filePath = `${frameData.saveFolder}/${frameData.codeBlockId}.html`;
    frameData.demoStr += addComponentScript(frameData.outputPath);
    fs.writeFileSync(filePath, frameData.demoStr);
    return filePath;
}

const addComponentScript = (outputPath) => {
    const componentName = path.dirname(outputPath).substring(outputPath.lastIndexOf('/'));
    return `<script type="module" src="/assets/modules/components/${componentName}/index.js"></script>`;
}

const style = `
<style>
.${CBD_BASE} {
	border: 1px solid lightgray;
	border-radius: 6px;
	overflow: hidden;
}
.${CBD_DEMO} {
	padding: 20px;
    overflow: hidden;
    border: none;
    height: 30px;
    width: 97%;
}
.${CBD_DETAILS} > summary {
  list-style: none;
	text-align: end;
	background-color: whitesmoke;
	padding: 10px;
	border-top: 1px solid lightgrey;
}
.${CBD_CODE_BLOCK} {
	border-top: 1px solid lightgrey;
}
</style>
`;

const script = `
<script>
    const toggleCodePanel = (event) => {
        const button = event.target;
        const details = button.closest('.${CBD_DETAILS}');
        details.open = !details.open;
        button.setAttribute('aria-expanded', details.open.toString());
    };

    const initShowCodeButtons = () => {
        document.querySelectorAll('.${CBD_BUTTON_SHOW}').forEach(button => {
            button.addEventListener('click', toggleCodePanel);
        });
    };

    const onloadIframe = (iFrame) => {
        iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + 5 + "px";
    };

    window.addEventListener('DOMContentLoaded', initShowCodeButtons);
</script>
`;

