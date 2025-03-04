import ComponentRegister from './src/generator/ComponentRegister';
import { ComponentDef } from './src/generator/ComponentDef';

// Update icon attributes
ComponentRegister.addGlobalDefinitionOverride(
	(component: ComponentDef, { icons }) => {
		const vividIconType = [
			{
				text: `IconId`,
				vuePropType: 'String',
				importFromModule: '../icons',
				resolvedType: icons.map((icon) => ({
					text: `'${icon}'`,
					vuePropType: 'String',
				})),
			},
		];

		for (const attribute of component.attributes) {
			if (
				attribute.name === 'icon' ||
				(component.name === 'icon' && attribute.name === 'name')
			) {
				attribute.description +=
					'\nSee the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/';
				attribute.type = vividIconType;
			}
		}
	}
);

ComponentRegister.addComponentOverride('button', (component) => {
	const titleAttribute = component.attributes.find((a) => a.name === 'title');
	if (titleAttribute!.type[0].text === 'boolean') {
		// Workaround for an issue with the CEM analyzer, which will incorrectly mark the title attribute as boolean
		titleAttribute!.type = [{ text: 'string', vuePropType: 'String' }];
		titleAttribute!.forwardTo = {
			type: 'attribute',
			name: 'title',
			boolean: false,
		};
	} else {
		throw new Error('Title attribute not found or has incorrect type');
	}
});

ComponentRegister.addComponentOverride('data-grid', (component) => {
	component.attributes.push({
		name: 'rowsData',
		description: 'Array of objects representing the rows of the grid.',
		type: [{ text: 'any[]', vuePropType: 'Array' }],
		forwardTo: { type: 'property', name: 'rowsData' },
	});
});

ComponentRegister.addComponentOverride('data-grid-cell', (component) => {
	component.attributes.push({
		name: 'columnDefinition',
		description: 'Object representing the column definition.',
		type: [{ text: 'object', vuePropType: 'Object' }],
		forwardTo: { type: 'property', name: 'columnDefinition' },
	});
});

ComponentRegister.addComponentOverride('searchable-select', (component) => {
	component.attributes.push({
		name: 'values',
		description: 'List of selected option values.',
		type: [{ text: 'string[]', vuePropType: 'Array' }],
		forwardTo: { type: 'property', name: 'values' },
	});
});

ComponentRegister.addComponentOverride('option', (component) => {
	component.attributes.push({
		name: 'value',
		description: 'Value to be submitted as part of the form data',
		type: [{ text: 'string', vuePropType: 'String' }],
		forwardTo: { type: 'property', name: 'value' },
	});
});
