const { JSDOM } = require('jsdom');
const createCodeExample = require('./createCodeExample')

module.exports = function (content, outputPath) {
	if (!outputPath.endsWith('.html')) {
		return content;
	}

	const dom = new JSDOM(content);
	const preBlocks = dom.window.document.querySelectorAll('pre.preview');

	preBlocks.forEach((pre) => {
		const code = pre.querySelector(':scope > code');
		pre.replaceWith(createCodeExample(code, pre, outputPath, null));
	});
	return dom.serialize();
};
