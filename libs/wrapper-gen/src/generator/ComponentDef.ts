import { TypeUnion } from './types';

export interface ComponentDef {
	name: string; // Name of the vivid component in kebab-case. e.g. accordion-item
	className: string; // Name of the vivid class, e.g. AccordionItem. May differ from name e.g. option -> ListboxOption
	wrappedClassName: string; // Name of the wrapper class, e.g. VAccordionItem.
	vividModulePath: string; // Original path of the component, e.g. "libs/components/src/lib/data-grid/data-grid-cell.ts"
	registerFunctionName: string; // Name of the function that registers the component, e.g. registerAccordionItem
	description?: string;
	attributes: {
		name: string; // Attribute on the vivid component in kebab-case. E.g. action-href
		description?: string;
		type: TypeUnion;
	}[];
	events: {
		name: string; // Name of the event on the vivid component in kebab-case. E.g. 'change'
		description?: string;
		type: TypeUnion;
	}[];
	vueModels: {
		name: string; // Name of the v-model, e.g. 'modelValue' or 'start'
		attributeName: string; // Name of the attribute that will be used for v-model, e.g. 'current-checked'
		eventName: string; // Name of the event that will be used for v-model, e.g. 'change'
		valueMapping: string; // Code for extracting the new value from event. E.g. "event.target.value"
	}[];
	methods: {
		name: string;
		description?: string;
		args: {
			name: string;
			type: TypeUnion;
		}[];
		returnType: TypeUnion;
	}[];
	slots: {
		name: string;
		description?: string;
	}[];
	localTypeDefs: Record<string, TypeUnion>;
}
