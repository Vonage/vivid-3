import * as schema from 'custom-elements-manifest';
import {
	ClassDeclaration,
	CustomElementDeclaration,
	Event,
} from 'custom-elements-manifest';
import * as fs from 'fs';
import { extractLocalTypeDefs } from './extractLocalTypeDefs';
import type { TypeStr } from '../common/types';
import type {
	ComponentDef,
	VividTestUtilsManifest,
} from '../common/ComponentDef';

export type DynamicSlot = {
	name: string;
	type: string;
	description?: string;
};

export type Declaration = CustomElementDeclaration &
	ClassDeclaration & {
		_modulePath: string;
		_localTypeDefs?: Record<string, TypeStr>;
		vividComponent?: {
			name: string;
			vueModels?: ComponentDef['vueModels'];
			public?: true;
		};
		vividTesting?: ComponentDef['testUtils'];
		dynamicSlots?: DynamicSlot[];
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
	'../components/dist/custom-elements.json'
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
 * Events declared on all components.
 */
const GlobalEvents: Event[] = [
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
];

/**
 * Recursively traverse the inheritance hierarchy to locate locally declared type definitions.
 */
const resolveLocalTypeDefs = (
	kind: string,
	name: string
): Record<string, TypeStr> => {
	const declaration = findDeclaration(vividDeclarations, kind, name);

	return {
		...(declaration.superclass && declaration.superclass.name !== 'FASTElement'
			? resolveLocalTypeDefs('class', declaration.superclass.name)
			: {}),
		...Object.fromEntries(
			(declaration.mixins ?? []).flatMap((m) =>
				Object.entries(resolveLocalTypeDefs('mixin', m.name))
			)
		),
		...extractLocalTypeDefs(name, declaration._modulePath),
	};
};

const extractTestingDefinitions = (declaration: Declaration) => {
	return (
		declaration.vividTesting ?? {
			selectors: [],
			actions: [],
			queries: [],
			refs: [],
		}
	);
};

const mergeTestingDefinitions = (
	a: VividTestUtilsManifest,
	b: VividTestUtilsManifest
) => {
	const mergeCollection = <T extends { name: string }>(a: T[], b: T[]): T[] => {
		const bNames = new Set(b.map((item) => item.name));
		// Allow items from b to override items in a
		return [...a.filter((item) => !bNames.has(item.name)), ...b];
	};

	return {
		selectors: mergeCollection(a.selectors, b.selectors),
		actions: mergeCollection(a.actions, b.actions),
		queries: mergeCollection(a.queries, b.queries),
		refs: mergeCollection(a.refs, b.refs),
	};
};

/**
 * Recursively traverse the inheritance hierarchy to locate testing definitions.
 */
const resolveTestingDefintions = (
	kind: string,
	name: string
): VividTestUtilsManifest => {
	const declaration = findDeclaration(vividDeclarations, kind, name);

	return [
		...(declaration.superclass && declaration.superclass.name !== 'FASTElement'
			? [resolveTestingDefintions('class', declaration.superclass.name)]
			: []),
		...(declaration.mixins ?? []).map((m) =>
			resolveTestingDefintions('mixin', m.name)
		),
		extractTestingDefinitions(declaration),
	].reduce(mergeTestingDefinitions);
};

/**
 * Recursively traverse the inheritance hierarchy to collect slots, which are not automatically inherited like e.g. attributes.
 */
const resolveSlots = (kind: string, name: string): schema.Slot[] => {
	const declaration = findDeclaration(vividDeclarations, kind, name);

	const inheritedSlots = [
		...(declaration.superclass && declaration.superclass.name !== 'FASTElement'
			? resolveSlots('class', declaration.superclass.name)
			: []),
		...(declaration.mixins ?? []).flatMap((m) => resolveSlots('mixin', m.name)),
	];

	const currentSlots = declaration.slots ?? [];

	// Merge slots, with current slots overriding inherited ones
	// Use name || '' to handle default slot (which has empty/undefined name)
	const slotMap = new Map<string, schema.Slot>();
	for (const slot of [...inheritedSlots, ...currentSlots]) {
		slotMap.set(slot.name || '', slot);
	}

	return Array.from(slotMap.values());
};

/**
 * Recursively traverse the inheritance hierarchy to collect dynamic slots, which are not automatically inherited like e.g. attributes.
 */
const resolveDynamicSlots = (kind: string, name: string): DynamicSlot[] => {
	const declaration = findDeclaration(vividDeclarations, kind, name);

	const inheritedDynamicSlots = [
		...(declaration.superclass && declaration.superclass.name !== 'FASTElement'
			? resolveDynamicSlots('class', declaration.superclass.name)
			: []),
		...(declaration.mixins ?? []).flatMap((m) =>
			resolveDynamicSlots('mixin', m.name)
		),
	];

	const currentDynamicSlots = declaration.dynamicSlots ?? [];

	// Merge dynamic slots, with current dynamic slots overriding inherited ones
	const dynamicSlotMap = new Map<string, DynamicSlot>();
	for (const dynamicSlot of [
		...inheritedDynamicSlots,
		...currentDynamicSlots,
	]) {
		dynamicSlotMap.set(dynamicSlot.name, dynamicSlot);
	}

	return Array.from(dynamicSlotMap.values());
};

export const getVividComponentDeclaration = (
	className: string
): Declaration => {
	const declaration = findDeclaration(vividDeclarations, 'class', className);

	if (!declaration.events) {
		declaration.events = [];
	}
	for (const globalEvent of GlobalEvents) {
		if (!declaration.events!.some((e) => e.name === globalEvent.name)) {
			declaration.events!.push(globalEvent);
		}
	}

	return {
		...declaration,
		slots: resolveSlots('class', className),
		dynamicSlots: resolveDynamicSlots('class', className),
		vividTesting: resolveTestingDefintions('class', className),
		_localTypeDefs: resolveLocalTypeDefs('class', className),
	};
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
