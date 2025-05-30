import { Attribute, ClassMember, ClassMethod } from 'custom-elements-manifest';
import type { ComponentDef } from '../common/ComponentDef';
import { kebabToCamel, kebabToPascal, pascalToCamel } from '../utils/casing';
import {
	getClassNameOfVividComponent,
	getVividComponentDeclaration,
} from './customElementDeclarations';
import { makeTypeResolver } from '../common/types';
import { globalTypeDefs } from './globalTypeDefs';

/**
 * These field names have a different attribute name, e.g. 'value' -> 'current-value'  and 'initialValue' -> 'value'
 */
const isFormValueAttribute = (attribute: Attribute): boolean =>
	[
		'value',
		'checked',
		'start',
		'end',
		'initialValue',
		'defaultChecked',
		'initialStart',
		'initialEnd',
	].includes(attribute.fieldName ?? '');

const propNameForAttribute = (attribute: Attribute): string => {
	let name = isFormValueAttribute(attribute)
		? attribute.fieldName ?? '' // Use the field name for value attributes, e.g. 'value' instead of 'currentValue'
		: kebabToCamel(attribute.name); // Otherwise, prefer the attribute name even when different. E.g. 'headingLevel' instead of 'headinglevel'

	// On certain components there is actually a currentValue field for 'current-value' attribute
	// In this case, we still want to use 'value' as the prop name
	if (name.match(/^current[A-Z]/)) {
		name = pascalToCamel(name.replace(/^current/, ''));
	}

	return name;
};

export const parseComponent = (name: string): ComponentDef => {
	const className = getClassNameOfVividComponent(name);

	const declaration = getVividComponentDeclaration(className);

	const localTypeDefs = declaration._localTypeDefs!;
	const localTypeResolver = makeTypeResolver({
		...globalTypeDefs,
		...localTypeDefs,
	});
	const resolveLocalType = (
		debugInfo: string,
		...args: Parameters<typeof localTypeResolver>
	) => {
		try {
			return localTypeResolver(...args);
		} catch (e) {
			throw new Error(
				`Error resolving type for ${debugInfo} of "${name}": ${
					(e as Error).message
				}`
			);
		}
	};

	const props: ComponentDef['props'] = (declaration.attributes ?? []).map(
		(attribute: Attribute) => {
			if (!attribute.type) {
				throw new Error(`Attribute type is missing: ${attribute}`);
			}

			return {
				name: propNameForAttribute(attribute),
				description: attribute.description,
				type: resolveLocalType(
					`attribute "${attribute.name}"`,
					attribute.type.text,
					true
				),
				attributeName: attribute.name || attribute.fieldName,
				propertyName: attribute.fieldName,
			};
		}
	);

	const isClassMethod = (m: ClassMember): m is ClassMethod =>
		m.kind === 'method' &&
		(m.privacy === undefined || m.privacy === 'public') &&
		(m.static === undefined || !m.static) &&
		!m.name.startsWith('#');
	const methods: ComponentDef['methods'] = (declaration.members ?? [])
		.filter(isClassMethod)
		.map((m) => ({
			name: m.name,
			description: m.description,
			args: (m.parameters ?? []).map((p, index) => {
				let paramName = p.name;

				// Handle parameters without a proper name like '{ key }'
				if (paramName.startsWith('{')) {
					paramName = `_arg${index}`;
				}

				return {
					name: paramName,
					type: resolveLocalType(
						`parameter "${paramName}" of "${m.name}"`,
						p.type?.text
					),
				};
			}),
			returnType: resolveLocalType(
				`return type of "${m.name}"`,
				m.return?.type?.text ?? 'unknown'
			),
		}));

	const events: ComponentDef['events'] = (declaration.events ?? []).map(
		(e) => ({
			name: e.name,
			description: e.description,
			type: resolveLocalType(`event ${e.name}`, e.type?.text),
		})
	);

	const slots: ComponentDef['slots'] = (declaration.slots ?? []).map((s) => ({
		name: s.name || 'default',
		description: s.description,
	}));

	// Assume that the register function is named after the component directory
	// e.g. libs/components/src/lib/data-grid/data-grid-cell.ts is registered by registerDataGrid
	const componentDirName = declaration._modulePath!.split('/').slice(-2)[0];
	const registerFunctionName = `register${kebabToPascal(componentDirName)}`;

	return {
		name,
		className,
		vividModulePath: declaration._modulePath!,
		registerFunctionName,
		description: declaration.description,
		props,
		events,
		vueModels: declaration.vividComponent!.vueModels ?? [],
		methods,
		slots,
	};
};
