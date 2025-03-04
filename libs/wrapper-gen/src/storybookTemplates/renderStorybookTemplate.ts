import { ComponentDef } from '../metadata/ComponentDef';
import { kebabToCamel, kebabToPascal } from '../utils/casing';
import {
	isNumberLiteral,
	isStringLiteral,
	TypeUnion,
	withImportsResolved,
} from '../metadata/types';

const isBasicString = (type: TypeUnion) =>
	type.length === 1 && type[0].text === 'string';
const isBasicNumber = (type: TypeUnion) =>
	type.length === 1 && type[0].text === 'number';
const isBasicBoolean = (type: TypeUnion) =>
	type.length === 1 && type[0].text === 'boolean';
const isLiteralUnion = (type: TypeUnion) =>
	type.every((t) => isStringLiteral(t.text) || isNumberLiteral(t.text));

const renderArgType = (attr: ComponentDef['attributes'][0]) => {
	const type = withImportsResolved(attr.type);

	if (isBasicString(type)) {
		return `{ type: { name: 'string', required: false }, control: 'text' }`;
	}
	if (isBasicNumber(type)) {
		return `{ type: { name: 'number', required: false }, control: { type: 'number' } }`;
	}
	if (isBasicBoolean(type)) {
		return `{ type: { name: 'boolean', required: false }, control: 'boolean' }`;
	}
	if (isLiteralUnion(type)) {
		return `{ type: { name: 'string', required: false }, control: 'select', options: [${type
			.map((t) => t.text)
			.join(', ')}]}`;
	}
	return `{ type: { name: 'object', required: false } }`;
};

export const renderStorybookTemplate = (def: ComponentDef) => {
	const propName = (attribute: string) => {
		const vueModel = def.vueModels.find((vm) => vm.attributeName === attribute);
		return vueModel ? vueModel.name : kebabToCamel(attribute);
	};
	const eventHandlerName = (event: string) =>
		`on${kebabToPascal(event.replaceAll(':', '-'))}`;

	const argTypesSrc = def.attributes
		.map((attr) => `${propName(attr.name)}: ${renderArgType(attr)},`)
		.join('\n');

	const events = [
		...def.events.map((event) => event.name),
		...def.vueModels.map((vm) => `update:${vm.name}`),
	];

	const eventsSrc = events
		.map((event) => `${eventHandlerName(event)}: { action: '${event}' },`)
		.join('\n');
	const eventListSrc = events
		.map((event) => `${eventHandlerName(event)}, `)
		.join('');
	const eventBindingsSrc = events
		.map((event) => `@${event}="${eventHandlerName(event)}"`)
		.join(' ');

	return `import { ${def.wrappedClassName} } from '@vonage/vivid-vue';

export const argTypes = {
  ${argTypesSrc}
  ${eventsSrc}
};

export const Template = args => ({
  components: { ${def.wrappedClassName} },
  setup() {
    const { ${eventListSrc} ...props } = args;
    return { ${eventListSrc} props };
  },
  template: '<${def.wrappedClassName} v-bind="props" ${eventBindingsSrc} />',
});
`;
};
