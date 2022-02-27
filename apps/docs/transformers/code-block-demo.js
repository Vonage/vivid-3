const { JSDOM } = require('jsdom');
const { decode } = require("html-entities");
const ELEVENTY_HTML_CODE_BLOCK_SELECTOR = 'pre > code.language-html';

const CBD_BASE = 'cbd-base';
const CBD_DEMO = 'cbd-demo';
const CBD_DETAILS = 'cbd-details';
const CBD_BUTTON_SHOW = 'cbd-button-show';
const CBD_CODE_BLOCK = 'cbd-code-block';

const generateCodeBlockDemo = function (pre, index, header) {
    const code = pre.querySelector('code')?.textContent;
    const html = decode(header.outerHTML) + decode(code);
    const dom = new JSDOM(`<body>${getHtml(html, pre.outerHTML, index)}</body>`);

    return dom.window.document.querySelector(`.${CBD_BASE}`);
};

module.exports = function (content, outputPath) {
    if (!outputPath.endsWith('.html')) {
        return content;
    }
    const document = new JSDOM(content).window.document;
    const headElement = document.documentElement.querySelector('head');
    const codeBlocks = document.querySelectorAll(ELEVENTY_HTML_CODE_BLOCK_SELECTOR);
    let codeBlockCount = 1;
    codeBlocks.forEach(function (codeBlock) {
        const pre = codeBlock.closest('pre');
        pre.replaceWith(generateCodeBlockDemo(pre, codeBlockCount++, headElement));
    });
    headElement.insertAdjacentHTML('beforeend', style);
    headElement.insertAdjacentHTML('beforeend', script);
    return document.documentElement.outerHTML;
};


const style = `
<style>
.${CBD_BASE} {
	border: 1px solid lightgray;
	border-radius: 6px;
	overflow: hidden;
}
.${CBD_DEMO} {
	padding: 20px;
    width: 100%;
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

const getHtml = (demoStr, codeStr, i) => {
    const codeBlockId = `${CBD_CODE_BLOCK}-${i}`;
    const iframeSrc = 'data:text/html;charset=utf-8,' + encodeURI(demoStr);
    return `
    <div class="${CBD_BASE}">
        <iframe class="${CBD_DEMO}" src="${iframeSrc}"></iframe>
        <details class="${CBD_DETAILS}">
            <summary>
                <button class="${CBD_BUTTON_SHOW}" aria-expanded="false" aria-controls="${codeBlockId}">
                    show code
                </button>
            </summary>
            <div class="${CBD_CODE_BLOCK}" role="region" id="${codeBlockId}">
                ${codeStr}
            </div>
        </details>
    </div>`;
}

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

    window.addEventListener('DOMContentLoaded', initShowCodeButtons);
</script>
`;

