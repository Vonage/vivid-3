import type { ComponentDef } from '../common/ComponentDef';

type DefinitionOverride = (def: ComponentDef) => void;
type ComponentSpecs = [string, DefinitionOverride];

export const globalDefinitionOverrides: DefinitionOverride[] = [
	(component: ComponentDef) => {
		const vividIconType = 'IconId';

		for (const prop of component.props) {
			if (
				prop.name === 'icon' ||
				(component.name === 'icon' && prop.name === 'name')
			) {
				prop.description +=
					'\nSee the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/';
				prop.type = vividIconType;
			}
		}
	},
];

export const componentOverrides: ComponentSpecs[] = [
	[
		'button',
		(component) => {
			const titleProp = component.props.find((p) => p.name === 'title');
			if (titleProp!.type === 'boolean') {
				// Workaround for an issue with the CEM analyzer, which will incorrectly mark the title prop as boolean
				titleProp!.type = 'string';
			} else {
				throw new Error('Title prop not found or has incorrect type');
			}
		},
	],

	[
		'data-grid',
		(component) => {
			component.props.push({
				name: 'rowsData',
				description: 'Array of objects representing the rows of the grid.',
				type: 'any[]',
				propertyName: 'rowsData',
			});
		},
	],

	[
		'data-grid-cell',
		(component) => {
			component.props.push({
				name: 'columnDefinition',
				description: 'Object representing the column definition.',
				type: 'object',
				propertyName: 'columnDefinition',
			});
		},
	],

	[
		'searchable-select',
		(component) => {
			component.props.push({
				name: 'values',
				description: 'List of selected option values.',
				type: 'string[]',
				propertyName: 'values',
			});
		},
	],

	[
		'option',
		(component) => {
			component.props.push({
				name: 'value',
				description: 'Value to be submitted as part of the form data',
				type: 'string',
				propertyName: 'value',
			});
		},
	],
];
