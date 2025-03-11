import { ClassMember, ClassMethod, Attribute } from 'custom-elements-manifest';
import { ComponentDef } from './ComponentDef';
import { camelToKebab, kebabToPascal } from '../utils/casing';
import {
	getClassNameOfVividComponent,
	getVividComponentDeclaration,
} from './customElementDeclarations';
import {
	isBooleanLiteral,
	isNumberLiteral,
	isStringLiteral,
	makeTypeResolver,
	TypeUnion,
	withImportsResolved,
} from './types';
import { globalTypeDefs } from './globalTypeDefs';

/**
 * DOM attributes can only be strings, therefore complex data (e.g. HTMLElement) needs to be passed as props.
 * We can determine this by type.
 */
const canBePassedAsAttribute = (type: TypeUnion) =>
	withImportsResolved(type).every(
		(t) =>
			t.text === 'string' ||
			t.text === 'number' ||
			t.text === 'boolean' ||
			isStringLiteral(t.text) ||
			isNumberLiteral(t.text) ||
			isBooleanLiteral(t.text)
	);

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

const vuePropNameForAttribute = (attribute: Attribute): string => {
	let name = isFormValueAttribute(attribute)
		? camelToKebab(attribute.fieldName ?? '') // Use the field name for value attributes, e.g. 'value' instead of 'current-value'
		: attribute.name || camelToKebab(attribute.fieldName ?? ''); // Otherwise, prefer the attribute name even when different. E.g. 'heading-level' instead of 'headinglevel'

	if (!name) {
		throw new Error('Attribute must have a name or a fieldName');
	}

	// On certain component there is actually a currentValue field for 'current-value' attribute
	// In this case, we still want to use 'value' as the prop name
	if (name.startsWith('current-')) {
		name = name.replace(/^current-/, '');
	}

	return name;
};

export const parseComponent = (name: string): ComponentDef => {
	const className = getClassNameOfVividComponent(name);

	const declaration = getVividComponentDeclaration(name, className);

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

	const attributes: ComponentDef['attributes'] = (
		declaration.attributes ?? []
	).map((attribute: Attribute) => {
		if (!attribute.type) {
			throw new Error(`Attribute type is missing: ${attribute}`);
		}

		const name = vuePropNameForAttribute(attribute);
		const type = resolveLocalType(
			`attribute "${attribute.name}"`,
			attribute.type.text,
			true
		);

		if (canBePassedAsAttribute(type)) {
			return {
				name,
				description: attribute.description,
				type,
				forwardTo: {
					type: 'attribute',
					name: (attribute.name || attribute.fieldName)!,
					boolean: type.some((t) => t.text === 'boolean'),
				},
			};
		} else {
			if (!attribute.fieldName) {
				throw new Error(`Attribute fieldName is missing: ${attribute.name}`);
			}

			return {
				name,
				description: attribute.description,
				type,
				forwardTo: {
					type: 'property',
					name: attribute.fieldName,
				},
			};
		}
	});

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
		wrappedClassName: `V${kebabToPascal(name)}`,
		vividModulePath: declaration._modulePath!,
		registerFunctionName,
		description: declaration.description,
		attributes,
		events,
		vueModels: declaration.vividComponent!.vueModels ?? [],
		methods,
		slots,
		localTypeDefs,
	};
};
