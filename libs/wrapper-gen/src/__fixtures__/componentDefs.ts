import { ComponentDef } from '../common/ComponentDef';

export const minimalComponent: ComponentDef = {
	name: 'example-component',
	className: 'ExampleComponent',
	registerFunctionName: 'registerExampleComponent',
	props: [],
	events: [],
	vueModels: [],
	methods: [],
	slots: [],
};

export const exampleComponent: ComponentDef = {
	name: 'example-component',
	className: 'ExampleComponent',
	registerFunctionName: 'registerExampleComponent',
	description: 'This is an example component',
	props: [
		{
			name: 'exampleProp',
			description: 'This is an example prop',
			type: 'string',
			attributeName: 'example-prop',
			propertyName: 'exampleProp',
		},
		{
			name: 'typeUnion',
			type: 'string | number',
			attributeName: 'type-union',
			propertyName: 'typeUnion',
		},
		{
			name: 'iconType',
			type: 'IconId',
			attributeName: 'icon-type',
			propertyName: 'iconType',
		},
		{
			name: 'value',
			type: 'string',
			attributeName: 'current-value',
			propertyName: 'value',
		},
		{
			name: 'start',
			type: 'string',
			attributeName: 'start',
			propertyName: 'start',
		},
		{
			name: 'forcedDomProp',
			type: 'string | HTMLElement',
			attributeName: 'forced-dom-prop',
			propertyName: 'forcedDomProp',
		},
		{
			name: 'booleanProp',
			type: 'boolean',
			attributeName: 'boolean-prop',
			propertyName: 'booleanProp',
		},
	],
	events: [
		{
			name: 'example-event',
			description: 'This is an example event',
			type: 'Event',
		},
		{
			name: 'input',
			type: 'Event',
		},
		{
			name: 'input:start',
			type: 'CustomEvent<{a: string | number}>',
		},
	],
	vueModels: [
		{
			name: 'modelValue',
			propName: 'value',
			eventNames: ['input'],
			valueMapping: 'event.currentTarget.value',
		},
		{
			name: 'sameEvent',
			propName: 'exampleProp',
			eventNames: ['input'],
			valueMapping: 'event.currentTarget.exampleProp',
		},
		{
			name: 'start',
			propName: 'start',
			eventNames: ['input:start'],
			valueMapping: 'event.currentTarget.start',
		},
	],
	methods: [
		{
			name: 'exampleMethod',
			description: 'This is an example method',
			args: [
				{
					name: 'exampleArg',
					type: 'string',
				},
			],
			returnType: 'string',
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
};
