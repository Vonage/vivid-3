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
