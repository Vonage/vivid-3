import { ComponentDef } from '../common/ComponentDef';
import { wrappedComponentName } from './name';

export default function renderIndex(components: ComponentDef[]) {
	return components
		.map((component) => wrappedComponentName(component))
		.map(
			(component) => `export { default as ${component} } from './${component}';`
		)
		.join('\n');
}
