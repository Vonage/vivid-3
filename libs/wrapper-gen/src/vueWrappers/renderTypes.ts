import { ComponentDef } from '../common/ComponentDef';
import { wrappedComponentName } from './name';

export default function renderTypes(components: ComponentDef[]) {
	const componentNames = components.map(wrappedComponentName);

	const typeImports = componentNames
		.flatMap((component) => [
			`import type { ${component} } from './components';`,
			`import type { ${component}Props, ${component}Events } from './components/${component}.types';`,
		])
		.join('\n');

	const propTypes = componentNames
		.map((component) => `	${component}: ${component}Props;`)
		.join('\n');

	const eventTypes = componentNames
		.map((component) => `	${component}: ${component}Events;`)
		.join('\n');

	const slotTypes = componentNames
		.map((component) => `	${component}: ComponentSlots<typeof ${component}>;`)
		.join('\n');

	return `
${typeImports}
import type { ComponentSlots } from '../utils/types';

export type VProps = {
${propTypes}
};

export type VEvents = {
${eventTypes}
};

export type VSlots = {
${slotTypes}
};
`;
}
