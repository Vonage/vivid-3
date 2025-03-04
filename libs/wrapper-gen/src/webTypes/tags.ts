import { ComponentDef } from '../metadata/ComponentDef';
import { kebabToCamel } from '../utils/casing';
import { withImportsResolved } from '../metadata/types';

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

export function getTagFromComponentDefinition({
	wrappedClassName: name,
	description,
	attributes,
	events,
	slots,
	// @ts-expect-error: FIXME: vueModel does not exist, code does not work correctly
	vueModel,
}: ComponentDef): WebTypesTag {
	return {
		name,
		description,
		attributes: attributes
			// filter out v-model prop
			.filter((attr) => attr.name !== vueModel?.attributeName)
			// eslint-disable-next-line no-shadow
			.map((attr) => ({
				name: kebabToCamel(attr.name),
				description: attr.description,
				value: {
					kind: 'expression',
					type: withImportsResolved(attr.type)
						.map((t) => t.text)
						.join(' | '),
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
