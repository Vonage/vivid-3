import { ComponentDef } from '../metadata/ComponentDef';

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
			forwardTo: {
				type: 'attribute',
				name: 'example-attribute',
			},
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'type-union',
			forwardTo: {
				type: 'attribute',
				name: 'type-union',
			},
			type: [
				{ text: 'string', vuePropType: 'String' },
				{ text: 'number', vuePropType: 'Number' },
			],
		},
		{
			name: 'imported-type',
			forwardTo: {
				type: 'property',
				name: 'importedType',
			},
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
			forwardTo: {
				type: 'attribute',
				name: 'value',
			},
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'start',
			forwardTo: {
				type: 'attribute',
				name: 'start',
			},
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'forced-dom-prop',
			forwardTo: {
				type: 'property',
				name: 'forcedDomProp',
			},
			type: [
				{
					text: 'string',
					vuePropType: 'String',
				},
			],
		},
		{
			name: 'boolean-attribute',
			forwardTo: {
				type: 'attribute',
				name: 'boolean-attribute',
				boolean: true,
			},
			type: [
				{
					text: 'boolean',
					vuePropType: 'Boolean',
				},
			],
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
			eventNames: ['input'],
			valueMapping: '(event.target as any).value',
		},
		{
			name: 'sameEvent',
			attributeName: 'example-attribute',
			eventNames: ['input'],
			valueMapping: '(event.target as any).exampleAttribute',
		},
		{
			name: 'start',
			attributeName: 'start',
			eventNames: ['input:start'],
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
