import * as schema from 'custom-elements-manifest';
import * as fs from 'fs';
import {
	Attribute,
	ClassDeclaration,
	ClassMember,
	CustomElementDeclaration,
	Event,
} from 'custom-elements-manifest';
import {
	getTypescriptDefinitionPath,
	isVividComponentPath,
} from './vividPackage';
import { extractLocalTypeDefs } from './extractLocalTypeDefs';
import type { TypeStr } from '../common/types';
import type { ComponentDef } from '../common/ComponentDef';

export type Declaration = CustomElementDeclaration &
	ClassDeclaration & {
		_modulePath?: string;
		_localTypeDefs?: Record<string, TypeStr>;
		vividComponent?: {
			name: string;
			vueModels?: ComponentDef['vueModels'];
			public?: true;
		};
	};

const parseManifest = (fileName: string): Declaration[] => {
	const manifest: schema.Package = JSON.parse(
		fs.readFileSync(fileName, 'utf-8')
	);
	return manifest.modules.flatMap(
		(m) =>
			m.declarations?.map(
				(d) =>
					({
						...d,
						_modulePath: m.path,
					} as Declaration)
			) ?? []
	);
};

const vividDeclarations = parseManifest(
	'../../dist/libs/components/custom-elements.json'
);

const findDeclaration = (
	declarations: schema.Declaration[],
	kind: string,
	name: string
): Declaration => {
	const declaration = declarations.find(
		(d) => d.kind === kind && d.name === name
	);

	if (!declaration) {
		throw new Error(`Could not find declaration for ${kind} ${name}`);
	}

	return declaration as Declaration;
};

/**
 * Base declaration for all elements.
 * All custom elements extend HTMLElement and thereby inherit all a variety of events and attributes.
 * However, we declare only a meaningful subset of these here.
 */
const BaseElementDeclaration: Declaration = {
	name: 'HTMLElement',
	kind: 'class',
	attributes: [],
	events: [
		{
			name: 'click',
			description: `Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element.`,
			type: { text: 'MouseEvent' },
		},
		{
			name: 'focus',
			description: 'Fires when the element receives focus.',
			type: { text: 'FocusEvent' },
		},
		{
			name: 'blur',
			description: 'Fires when the element loses focus.',
			type: { text: 'FocusEvent' },
		},
		{
			name: 'keydown',
			description: 'Fires when a key is pressed.',
			type: { text: 'KeyboardEvent' },
		},
		{
			name: 'keyup',
			description: 'Fires when a key is released.',
			type: { text: 'KeyboardEvent' },
		},
		{
			name: 'input',
			description: 'Fires when the value of an element has been changed.',
			type: { text: 'Event' },
		},
	],
	customElement: true,
};

// Inherit items that are not already present in the child
function inheritItems<T>(
	getName: (item: T) => string,
	superItems: T[] = [],
	childItems: T[] = []
): T[] {
	return [
		...superItems.filter(
			(s) => !childItems.some((c) => getName(s) === getName(c))
		),
		...childItems,
	];
}

function applyInheritance(
	declaration: Declaration,
	superclassDeclaration: Declaration
): void {
	// Note: we don't inherit slots, as Vivid components often did not implement them
	declaration.members = inheritItems<ClassMember>(
		(m) => m.name,
		superclassDeclaration.members,
		declaration.members
	);
	declaration.attributes = inheritItems<Attribute>(
		getAttributeName,
		superclassDeclaration.attributes,
		declaration.attributes
	);
	declaration.events = inheritItems<Event>(
		(m) => m.name,
		superclassDeclaration.events,
		declaration.events
	);
	declaration._localTypeDefs = {
		...superclassDeclaration._localTypeDefs,
		...declaration._localTypeDefs,
	};
}

const getAttributeName = (attribute: schema.Attribute): string => {
	const name = attribute.name || attribute.fieldName;
	if (!name) {
		throw new Error('Attribute must have a name or a fieldName');
	}
	return name;
};

const resolveDeclaration = (
	packageDeclarations: schema.Declaration[],
	kind: string,
	name: string
): Declaration => {
	let declaration: Declaration;
	if (name === 'VividElement') {
		// This is the base class for all elements
		declaration = BaseElementDeclaration;
	} else {
		declaration = findDeclaration(packageDeclarations, kind, name);
	}

	// Clone declaration to avoid modifying the original
	declaration = JSON.parse(JSON.stringify(declaration));

	// Extract local type defs and store them in the declaration
	declaration._localTypeDefs = {};
	if (
		declaration._modulePath &&
		isVividComponentPath(declaration._modulePath)
	) {
		declaration._localTypeDefs = extractLocalTypeDefs(
			name,
			declaration._modulePath
		);
	}

	// Inherit from superclass
	if (declaration.superclass) {
		let superclassDeclaration: Declaration | undefined;

		if (!declaration.superclass.package) {
			// Inherit within the same package
			superclassDeclaration = resolveDeclaration(
				packageDeclarations,
				'class',
				declaration.superclass.name
			);
		}

		if (superclassDeclaration) {
			applyInheritance(declaration, superclassDeclaration);
		}
	}

	// Inherit from declared mixins
	for (const mixin of declaration.mixins ?? []) {
		const mixinDeclaration = resolveDeclaration(
			packageDeclarations,
			'mixin',
			mixin.name
		);
		applyInheritance(declaration, mixinDeclaration);
	}

	// Apply vivid mixins
	if (declaration.vividComponent) {
		const mixins = extractVividMixins(name, declaration._modulePath!);
		for (const mixinName of mixins) {
			if (!(mixinName in VividMixins)) {
				throw new Error(`Unknown mixin ${mixinName}`);
			}
			declaration.attributes = inheritItems(
				getAttributeName,
				VividMixins[mixinName],
				declaration.attributes
			);
		}
	}

	return declaration;
};

/**
 * Vivid uses mixins which are not exported in the manifest.
 * Instead, we need to provide the declaration here, based on the code:
 * https://github.com/Vonage/vivid-3/tree/main/libs/components/src/shared/patterns
 */
const VividMixins: Record<string, schema.Attribute[]> = {
	FormElement: [
		{
			name: 'label',
			description: 'The label for the form element.',
			type: { text: 'string' },
		},
	],
	FormElementSuccessText: [
		{
			name: 'success-text',
			description: 'The success text for the form element.',
			type: { text: 'string' },
		},
	],
	ErrorText: [
		{
			name: 'error-text',
			description: 'The error text for the form element.',
			type: { text: 'string' },
		},
	],
	DelegatesARIATextbox: [],
	DelegatesARIASelect: [
		{
			name: 'aria-controls',
			description:
				'See https://www.w3.org/TR/wai-aria-1.2/#combobox for more information.',
			type: { text: 'string' },
			fieldName: 'ariaControls',
		},
	],
	DelegatesARIAListboxOption: [],
	ARIAGlobalStatesAndProperties: [],
};

/**
 * Returns that mixins that a component uses.
 */
export const extractVividMixins = (
	className: string,
	modulePath: string
): string[] => {
	const src = fs.readFileSync(getTypescriptDefinitionPath(modulePath), 'utf8');
	const lines = src.split('\n');

	for (const line of lines) {
		// Find the line declaring the mixins looking like this:
		// export interface ComponentName extends MixinA, MixinB {}
		const match = line.match(
			new RegExp(`export interface ${className} extends (.*) {`)
		);
		if (match) {
			return match[1].split(',').map((m) => m.trim());
		}
	}

	return [];
};

/**
 * Returns the class name of a vivid component. E.g. 'option' -> 'ListboxOption'
 */
export const getClassNameOfVividComponent = (name: string): string => {
	const declaration = vividDeclarations.find(
		(d) => d.kind === 'class' && d.vividComponent?.name === name
	);
	if (!declaration) {
		throw new Error(`Could not find declaration for component ${name}`);
	}
	return declaration.name;
};

export const getVividComponentDeclaration = (
	name: string,
	className: string
): Declaration => resolveDeclaration(vividDeclarations, 'class', className);

/**
 * Lists all public components from Vivid. E.g. 'accordion-item'.
 * Does not include internal components like 'popup'.
 */
export const getPublicComponents = (): string[] => {
	return vividDeclarations
		.filter(
			(d) => d.kind === 'class' && d.vividComponent && d.vividComponent.public
		)
		.map((d) => d.vividComponent!.name)
		.sort();
};
