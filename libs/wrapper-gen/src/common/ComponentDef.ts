import { TypeStr } from './types';

export interface ComponentDef {
	name: string; // The un-prefixed Vivid component tag name. e.g. accordion-item
	className: string; // Name of the vivid class, e.g. AccordionItem. May differ from name e.g. option -> ListboxOption
	registerFunctionName: string; // Name of the function that registers the component, e.g. registerAccordionItem
	description?: string;
	props: {
		name: string; // Name of the prop in camelCase. Not necessarily the same as property name. E.g. headingLevel instead of headinglevel
		description?: string;
		type: TypeStr;
		propertyName?: string; // Name of the property on the component class. E.g. actionHref
		attributeName?: string; // Name of the HTML attribute. E.g. action-href
	}[];
	events: {
		name: string; // Name of the event on the vivid component in kebab-case. E.g. 'change'
		description?: string;
		type: TypeStr;
	}[];
	vueModels: {
		name: string; // Name of the v-model, e.g. 'modelValue' or 'start'
		propName: string; // Name of the prop that will be used for v-model, e.g. 'value'
		eventNames: string[]; // Name of the events that will be used for v-model, e.g. 'change'
		valueMapping: string; // Code for extracting the new value from event. E.g. "event.target.value"
	}[];
	methods: {
		name: string;
		description?: string;
		args: {
			name: string;
			type: TypeStr;
		}[];
		returnType: TypeStr;
	}[];
	slots: {
		name: string;
		description?: string;
	}[];
}
