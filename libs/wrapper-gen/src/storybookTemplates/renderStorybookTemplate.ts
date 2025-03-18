import { ComponentDef } from '../common/ComponentDef';
import { kebabToPascal } from '../utils/casing';
import {
	isNumberLiteral,
	isStringLiteral,
	parseTypeStr,
	TypeResolver,
	TypeUnion,
} from '../common/types';
import { wrappedComponentName } from '../vueWrappers/name';

const isBasicString = (type: TypeUnion) =>
	type.length === 1 && type[0] === 'string';
const isBasicNumber = (type: TypeUnion) =>
	type.length === 1 && type[0] === 'number';
const isBasicBoolean = (type: TypeUnion) =>
	type.length === 1 && type[0] === 'boolean';
const isLiteralUnion = (type: TypeUnion) =>
	type.every((t) => isStringLiteral(t) || isNumberLiteral(t));

const renderArgType = (type: TypeUnion) => {
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
		return `{ type: { name: 'string', required: false }, control: 'select', options: [${type.join(
			', '
		)}]}`;
	}
	return `{ type: { name: 'object', required: false } }`;
};

export const renderStorybookTemplate = (
	def: ComponentDef,
	importedTypesResolver: TypeResolver
) => {
	const propName = (prop: string) => {
		const vueModel = def.vueModels.find((vm) => vm.propName === prop);
		return vueModel ? vueModel.name : prop;
	};
	const eventHandlerName = (event: string) =>
		`on${kebabToPascal(event.replaceAll(':', '-'))}`;

	const argTypesSrc = def.props
		.map(
			(prop) =>
				`${propName(prop.name)}: ${renderArgType(
					parseTypeStr(importedTypesResolver(prop.type))
				)},`
		)
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

	return `import { ${wrappedComponentName(def)} } from '@vonage/vivid-vue';

export const argTypes = {
  ${argTypesSrc}
  ${eventsSrc}
};

export const Template = args => ({
  components: { ${wrappedComponentName(def)} },
  setup() {
    const { ${eventListSrc} ...props } = args;
    return { ${eventListSrc} props };
  },
  template: '<${wrappedComponentName(
		def
	)} v-bind="props" ${eventBindingsSrc} />',
});
`;
};
