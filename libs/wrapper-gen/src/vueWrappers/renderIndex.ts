import { ComponentDef } from '../metadata/ComponentDef';

export default function renderIndex(components: ComponentDef[]) {
	return components
		.map((component) => component.wrappedClassName)
		.map(
			(component) => `export { default as ${component} } from './${component}';`
		)
		.join('\n');
}
