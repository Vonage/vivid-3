import { ComponentDef } from '../common/ComponentDef';
import { kebabToCamel } from '../utils/casing';

import { wrappedComponentName } from '../vueWrappers/name';
import { TypeResolver } from '../common/types';

export interface WebTypesCommon {
	name: string;
	description?: string;
}

export interface WebTypesAttribute extends WebTypesCommon {
	value: {
		kind: string;
		type: string;
	};
}

export interface WebTypesTag extends WebTypesCommon {
	attributes: WebTypesAttribute[];
	events: WebTypesCommon[];
	slots: WebTypesCommon[];
	source: {
		module: string;
		symbol: string;
	};
	priority: string;
}

export function getTagFromComponentDefinition(
	componentDef: ComponentDef,
	importedTypesResolver: TypeResolver
): WebTypesTag {
	const name = wrappedComponentName(componentDef);
	const {
		description,
		props,
		events,
		slots,
		// @ts-expect-error: FIXME: vueModel does not exist, code does not work correctly
		vueModel,
	} = componentDef;

	return {
		name,
		description,
		attributes: props
			// filter out v-model prop
			.filter((prop) => prop.name !== vueModel?.propName)
			// eslint-disable-next-line no-shadow
			.map((prop) => ({
				name: kebabToCamel(prop.name),
				description: prop.description,
				value: {
					kind: 'expression',
					type: importedTypesResolver(prop.type),
				},
			})),
		events: events
			// filter out v-model event
			.filter((event) => vueModel?.eventNames.includes(event))
			// eslint-disable-next-line no-shadow
			.map((event) => ({
				name: event.name,
				description: event.description,
			})),
		slots,
		source: {
			module: '@vonage/vivid-vue',
			symbol: name,
		},
		priority: 'highest',
	};
}
