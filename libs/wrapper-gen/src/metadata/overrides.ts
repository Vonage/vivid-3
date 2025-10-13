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
			component.props.push({
				name: 'optionFilter',
				description: 'Function to filter the options to display.',
				type: 'any',
				propertyName: 'optionFilter',
			});
		},
	],
	[
		'simple-color-picker',
		(component) => {
			component.props.push({
				name: 'swatches',
				description: 'List of color swatches, has to be an array of objects.',
				type: 'Array<{ value: string; label?: string }>',
				propertyName: 'swatches',
			});
		},
	],
	[
		'number-field',
		(component) => {
			component.props.push({
				name: 'valueAsNumber',
				description: 'The value property, typed as a number.',
				type: 'number',
				propertyName: 'valueAsNumber',
			});
		},
	],

	[
		'slider',
		(component) => {
			component.props.push({
				name: 'valueAsNumber',
				description: 'The value property, typed as a number.',
				type: 'number',
				propertyName: 'valueAsNumber',
			});
		},
	],

	[
		'range-slider',
		(component) => {
			component.props.push({
				name: 'startAsNumber',
				description: 'The start property, typed as a number.',
				type: 'number',
				propertyName: 'startAsNumber',
			});
			component.props.push({
				name: 'endAsNumber',
				description: 'The end property, typed as a number.',
				type: 'number',
				propertyName: 'endAsNumber',
			});
		},
	],
];
