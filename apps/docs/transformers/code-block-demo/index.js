const { JSDOM } = require('jsdom');
const createCodeExample = require('./createCodeExample')
const jsonData = [
	...require('../../_data/components.json'),
	...require('../../_data/designs.json'),
	...require('../../_data/introduction.json')
];

module.exports = function (content, outputPath) {
	if (!outputPath.endsWith('.html')) {
		return content;
	}

	const componentName = outputPath.split('/').at(-2);
	const componentData = jsonData.find(c => c.title === componentName);

	const dom = new JSDOM(content);
	const preBlocks = dom.window.document.querySelectorAll('pre.preview');

	preBlocks.forEach((pre, index) => {
		const code = pre.querySelector(':scope > code');
		pre.replaceWith(createCodeExample(`cbd${index}`, code, pre, outputPath, componentData, null));
	});
	return dom.serialize();
};
