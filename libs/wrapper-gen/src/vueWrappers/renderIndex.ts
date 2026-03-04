import { wrappedComponentName } from './name';
import type { ComponentDef } from '@repo/metadata-extractor';

export default function renderIndex(components: ComponentDef[]) {
	return components
		.map((component) => wrappedComponentName(component))
		.map(
			(component) => `export { default as ${component} } from './${component}';`
		)
		.join('\n');
}
