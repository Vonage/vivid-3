import { ComponentDef } from '../ComponentDef';

export const minimalComponent: ComponentDef = {
	name: 'example-component',
	className: 'ExampleComponent',
	wrappedClassName: 'VExampleComponent',
	vividModulePath:
		'libs/components/src/lib/example-component/example-component.ts',
	registerFunctionName: 'registerExampleComponent',
	attributes: [],
	events: [],
	vueModels: [],
	methods: [],
	slots: [],
	localTypeDefs: {},
};

export const exampleComponent: ComponentDef = {
	name: 'example-component',
	className: 'ExampleComponent',
	wrappedClassName: 'VExampleComponent',
	vividModulePath:
		'libs/components/src/lib/example-component/example-component.ts',
	registerFunctionName: 'registerExampleComponent',
	description: 'This is an example component',
	attributes: [
		{
			name: 'example-attribute',
			description: 'This is an example attribute',
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'type-union',
			type: [
				{ text: 'string', vuePropType: 'String' },
				{ text: 'number', vuePropType: 'Number' },
			],
		},
		{
			name: 'imported-type',
			type: [
				{
					text: 'Imported',
					vuePropType: 'Object',
					importFromModule: 'module',
				},
			],
		},
		{
			name: 'value',
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'start',
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'forced-dom-prop',
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
			forceDomProp: true,
		},
	],
	events: [
		{
			name: 'example-event',
			description: 'This is an example event',
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'input',
			type: [
				{
					text: 'Event',
					vuePropType: 'Event',
				},
			],
		},
		{
			name: 'input:start',
			type: [
				{
					text: 'CustomEvent<{a: string | number}>',
					vuePropType: 'CustomEvent',
				},
			],
		},
	],
	vueModels: [
		{
			name: 'modelValue',
			attributeName: 'value',
			eventName: 'input',
			valueMapping: '(event.target as any).value',
		},
		{
			name: 'start',
			attributeName: 'start',
			eventName: 'input:start',
			valueMapping: '(event.target as any).start',
		},
	],
	methods: [
		{
			name: 'exampleMethod',
			description: 'This is an example method',
			args: [
				{
					name: 'exampleArg',
					type: [
						{
							text: 'string',
							vuePropType: 'String',
						},
					],
				},
			],
			returnType: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
	],
	slots: [
		{
			name: 'example-slot',
			description: 'This is an example slot',
		},
		{
			name: 'no-description',
		},
	],
	localTypeDefs: {},
};
