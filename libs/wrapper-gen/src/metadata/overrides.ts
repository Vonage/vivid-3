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
			component.props.push({
				name: 'focusRowIndex',
				description:
					'Index of row to be focused on when the Data Grid receives focus.',
				type: 'number',
				propertyName: 'focusRowIndex',
			});
			component.props.push({
				name: 'focusColumnIndex',
				description:
					'Index of column to be focused on when the Data Grid receives focus.',
				type: 'number',
				propertyName: 'focusColumnIndex',
			});
			component.props.push({
				name: 'columnDefinitions',
				description: 'Configure the grid header columns.',
				type: 'any[]',
				propertyName: 'columnDefinitions',
			});
			component.props.push({
				name: 'rowElementTag',
				description: 'Element tag for header rows.',
				type: 'string',
				propertyName: 'rowElementTag',
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
		'color-picker',
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

	[
		'rich-text-editor',
		(component) => {
			component.props.push({
				name: 'instance',
				description:
					'The editor instance created from the RTEConfig. Without it, the editor will not render.',
				type: 'any',
				propertyName: 'instance',
			});
		},
	],

	[
		'rich-text-view',
		(component) => {
			component.props.push({
				name: 'view',
				description: 'The view to display, created from the RteConfig.',
				type: 'any',
				propertyName: 'view',
			});
		},
	],
];
