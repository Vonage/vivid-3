const { JSDOM } = require('jsdom');
const createCodeExamples = require('../code-block-demo/createCodeExample')
const jsonData = [
	...require('../../_data/components.json'),
	...require('../../_data/designs.json'),
	...require('../../_data/introduction.json')
];
const customElements = require('../../../../dist/libs/components/custom-elements.json');

const CONNOTATIONS = [
	'accent',
	'cta',
	'success',
	'alert',
	'warning',
	'information',
	'announcement',
];

const getConnotation = (variableName, componentName) => {
	return variableName.replace(`--vvd-${componentName}-`, '').split('-')[0];
}

const getShade = (variableName, componentName, connotationName) => {
	return variableName.replace(`--vvd-${componentName}-${connotationName}-`, '');
}

// Order of shades from light to dark
const shadeOrder = Array.from([
	'primary-text',
	'backdrop',
	'faint',
	'soft',
	'dim',
	'pale',
	'light',
	'intermediate',
	'primary',
	'firm',
	'primary-increment',
	'fierce',
	'contrast'
].entries()).reduce((acc, [index, shade]) => {
	acc[shade] = index;
	return acc;
}, {});
const getShadeOrder = (shade) => shadeOrder[shade] ?? 999;


module.exports = function (content, outputPath) {
	if (!outputPath.endsWith('.html')) {
		return content;
	}

	const dom = new JSDOM(content);
	const preBlocks = dom.window.document.querySelectorAll('pre[class*=variables-preview]');

	preBlocks.forEach((pre) => {
		const code = pre.querySelector(':scope > code');

		const componentName = Array.from(pre.classList).find(c => c.includes('variables-preview')).match(/\[(.*?)\]/)[1];
		const componentData = jsonData.find(c => c.title === componentName);
		const cssProperties = getCssPropertiesForComponent(componentData);

		const exampleCode = code.textContent;

		const groupIntoTabs = !pre.classList.contains('no-tabs');

		if (groupIntoTabs) {
			// Group the variables by connotation and render a tab for each
			const tabs = JSDOM.fragment(`<vwc-tabs></vwc-tabs>`).firstChild;
			for (const connotation of CONNOTATIONS) {
				const connotationProperties = cssProperties.filter(prop => getConnotation(prop.name, componentName) === connotation);
				connotationProperties.sort((a, b) => getShadeOrder(getShade(a.name, componentName, connotation)) - getShadeOrder(getShade(b.name, componentName, connotation)));
				if (connotationProperties.length === 0) {
					continue;
				}

				// Inject a <style> setting the initial values into the code.
				code.textContent = renderVariablesStylesheet(connotationProperties) + exampleCode.replace(/\$CONNOTATION/g, connotation);
				const example = createCodeExamples(code, pre, outputPath, componentData, connotationProperties);
				const tab = JSDOM.fragment(`
					<vwc-tab label="${connotation}"></vwc-tab>
					<vwc-tab-panel></vwc-tab-panel>
				`);
				tab.querySelector('vwc-tab-panel').appendChild(example);
				tabs.appendChild(tab);
			}
			pre.replaceWith(tabs);
		} else {
			cssProperties.sort((a, b) => {
				const aConnotation = getConnotation(a.name, componentName);
				const bConnotation = getConnotation(b.name, componentName);
				if (aConnotation !== bConnotation) {
					return aConnotation.localeCompare(bConnotation);
				}
				return getShadeOrder(getShade(a.name, componentName, aConnotation)) - getShadeOrder(getShade(b.name, componentName, bConnotation));
			})
			code.textContent = renderVariablesStylesheet(cssProperties) + exampleCode;
			const example = createCodeExamples(code, pre, outputPath, componentData, cssProperties);
			pre.replaceWith(example);
		}
	});

	return dom.serialize();
};

const getCssPropertiesForComponent =(componentData) => {
	let cssProperties = [];
	if (componentData) {
		const declaration = customElements.modules.find(
			module => module.path === `libs/components/src/lib/${componentData.title}/${componentData.title}.ts`
		)?.declarations?.find(declaration => declaration.kind === 'class');
		if (declaration) {
			cssProperties = declaration.cssProperties ?? [];
		}
	}
	return cssProperties;
}

const renderVariablesStylesheet = (cssProperties) => {
	return `<style>
    .vvd-root {
${cssProperties.map(prop => `        ${prop.name}: ${initialValueForVariable(prop)};`).join('\n')}
    }
</style>
`
}

const initialValueForVariable = (cssProperty) => {
	// Instead of using the default value, which would result in rendering the component regularly,
	// we apply an announcement theme to show that the variables are being used.
	const announcementTheme = {
		backdrop: 'var(--vvd-color-announcement-50)',
		intermediate: 'var(--vvd-color-announcement-500)',
		'primary-increment': 'var(--vvd-color-announcement-600)',
		faint: 'var(--vvd-color-announcement-50)',
		soft: 'var(--vvd-color-announcement-100)',
		dim: 'var(--vvd-color-announcement-200)',
		pale: 'var(--vvd-color-announcement-300)',
		light: 'var(--vvd-color-announcement-400)',
		primary: 'var(--vvd-color-announcement-500)',
		'primary-text': 'var(--vvd-color-canvas)',
		firm: 'var(--vvd-color-announcement-600)',
		fierce: 'var(--vvd-color-announcement-700)',
		contrast: 'var(--vvd-color-announcement-800)',
	}
	for (const [name, value] of Object.entries(announcementTheme)) {
		if (cssProperty.name.endsWith(name)) {
			return value;
		}
	}
	return cssProperty.default ?? 'transparent';
}
