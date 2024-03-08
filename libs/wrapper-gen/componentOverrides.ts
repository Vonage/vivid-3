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

const addVueModel = (
	component: ComponentDef,
	config: Omit<ComponentDef['vueModels'][number], 'name'>,
	name = 'modelValue'
) => {
	component.vueModels.push({
		name,
		...config,
	});
};

ComponentRegister.addComponentOverride('checkbox', (component) => {
	addVueModel(component, {
		attributeName: 'current-checked',
		eventName: 'change',
		valueMapping: '(event.target as HTMLInputElement).checked',
	});
});

ComponentRegister.addComponentOverride('combobox', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'change',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('data-grid', (component) => {
	component.attributes.push({
		name: 'rowsData',
		description: 'Array of objects representing the rows of the grid.',
		type: [{ text: 'any[]', vuePropType: 'Array' }],
	});
});

ComponentRegister.addComponentOverride('date-picker', (component) => {
	addVueModel(component, {
		attributeName: 'value',
		eventName: 'input',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('date-range-picker', (component) => {
	addVueModel(
		component,
		{
			attributeName: 'current-start',
			eventName: 'input:start',
			valueMapping: '(event.target as any).start',
		},
		'start'
	);
	addVueModel(
		component,
		{
			attributeName: 'current-end',
			eventName: 'input:end',
			valueMapping: '(event.target as any).end',
		},
		'end'
	);
});

ComponentRegister.addComponentOverride('menu-item', (component) => {
	addVueModel(component, {
		attributeName: 'checked',
		eventName: 'change',
		valueMapping: '(event.target as HTMLInputElement).checked',
	});
});

ComponentRegister.addComponentOverride('number-field', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'input',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('radio-group', (component) => {
	addVueModel(component, {
		attributeName: 'value',
		eventName: 'change',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('range-slider', (component) => {
	addVueModel(
		component,
		{
			attributeName: 'current-start',
			eventName: 'input:start',
			valueMapping: '(event.target as any).start',
		},
		'start'
	);
	addVueModel(
		component,
		{
			attributeName: 'current-end',
			eventName: 'input:end',
			valueMapping: '(event.target as any).end',
		},
		'end'
	);
});

ComponentRegister.addComponentOverride('select', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'input',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('slider', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'change',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('switch', (component) => {
	addVueModel(component, {
		attributeName: 'current-checked',
		eventName: 'change',
		valueMapping: '(event.target as HTMLInputElement).checked',
	});
});

ComponentRegister.addComponentOverride('text-area', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'input',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('text-field', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'input',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});

ComponentRegister.addComponentOverride('time-picker', (component) => {
	addVueModel(component, {
		attributeName: 'current-value',
		eventName: 'input',
		valueMapping: '(event.target as HTMLInputElement).value',
	});
});
