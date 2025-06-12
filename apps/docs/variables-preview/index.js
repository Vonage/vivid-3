const {
	createCodeExample,
} = require('../code-example-preview/createCodeExample');
const fs = require('fs');

const customElementsPath = '../../../libs/components/custom-elements.json';

const customElements = { modules: [] };
if (fs.existsSync(customElementsPath)) {
	customElements.push(
		...JSON.parse(fs.readFileSync(customElementsPath, 'utf-8'))
	);
}

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
};

const getShade = (variableName, componentName, connotationName) => {
	return variableName.replace(`--vvd-${componentName}-${connotationName}-`, '');
};

// Order of shades from light to dark
const shadeOrder = Array.from(
	[
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
		'contrast',
	].entries()
).reduce((acc, [index, shade]) => {
	acc[shade] = index;
	return acc;
}, {});
const getShadeOrder = (shade) => shadeOrder[shade] ?? 999;

module.exports = function ({ code: exampleCode, options, url }) {
	// Component name is given like this: variables-preview[component-name]
	const componentName = options
		.find((c) => c.includes('variables-preview'))
		.match(/\[(.*?)]/)[1];

	const cssProperties = getCssPropertiesForComponent(componentName);

	const groupIntoTabs = !options.includes('no-tabs');

	if (groupIntoTabs) {
		// Group the variables by connotation and render a tab for each
		let output = '<vwc-tabs gutters="none">';
		for (const connotation of CONNOTATIONS) {
			const connotationProperties = cssProperties.filter(
				(prop) => getConnotation(prop.name, componentName) === connotation
			);
			connotationProperties.sort(
				(a, b) =>
					getShadeOrder(getShade(a.name, componentName, connotation)) -
					getShadeOrder(getShade(b.name, componentName, connotation))
			);
			if (connotationProperties.length === 0) {
				continue;
			}

			const exampleCodeWithStyle =
				renderVariablesStylesheet(connotationProperties) +
				exampleCode.replace(/\$CONNOTATION/g, connotation);

			output += `
					<vwc-tab label='${connotation}'></vwc-tab>
					<vwc-tab-panel>
						${createCodeExample({
							code: exampleCodeWithStyle,
							options,
							cssProperties: connotationProperties,
							url,
						})}
					</vwc-tab-panel>
				`;
		}
		output += '</vwc-tabs>';
		return output;
	} else {
		cssProperties.sort((a, b) => {
			const aConnotation = getConnotation(a.name, componentName);
			const bConnotation = getConnotation(b.name, componentName);
			if (aConnotation !== bConnotation) {
				return aConnotation.localeCompare(bConnotation);
			}
			return (
				getShadeOrder(getShade(a.name, componentName, aConnotation)) -
				getShadeOrder(getShade(b.name, componentName, bConnotation))
			);
		});
		const exampleCodeWithStyle =
			renderVariablesStylesheet(cssProperties) + exampleCode;
		return createCodeExample({
			code: exampleCodeWithStyle,
			options,
			cssProperties,
			url,
		});
	}
};

const getCssPropertiesForComponent = (componentName) => {
	let cssProperties = [];
	if (componentName) {
		const declaration = customElements.modules
			.find(
				(module) =>
					module.path ===
					`libs/components/src/lib/${componentName}/${componentName}.ts`
			)
			?.declarations?.find((declaration) => declaration.kind === 'class');
		if (declaration) {
			cssProperties = declaration.cssProperties ?? [];
		}
	}
	return cssProperties;
};

const renderVariablesStylesheet = (cssProperties) => {
	return `<style>
    .vvd-root {
${cssProperties
	.map((prop) => `        ${prop.name}: ${initialValueForVariable(prop)};`)
	.join('\n')}
    }
</style>
`;
};

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
	};
	for (const [name, value] of Object.entries(announcementTheme)) {
		if (cssProperty.name.endsWith(name)) {
			return value;
		}
	}
	return cssProperty.default ?? 'transparent';
};
