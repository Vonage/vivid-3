import { TypeStr } from './types';

type TestUtilAnnotation = {
	name: string;
	args: string[];
};

export type VividTestUtilsManifest = {
	selectors: TestUtilAnnotation[];
	actions: TestUtilAnnotation[];
	queries: TestUtilAnnotation[];
	refs: TestUtilAnnotation[];
};

export interface ComponentDef {
	name: string; // The un-prefixed web component tag name. e.g. accordion-item
	className: string; // Name of the web component class, e.g. AccordionItem. May differ from name e.g. option -> ListboxOption
	registerFunctionName: string; // Name of the function that registers the component, e.g. registerAccordionItem
	description?: string;
	/// Inputs to the component that can be set via a DOM property or HTML attribute. Some props can only be set in one of those ways.
	props: {
		name: string; // In camelCase. Used as the Vue prop name. Not necessarily the same as DOM property name. E.g. headingLevel instead of headinglevel
		description?: string;
		type: TypeStr;
		propertyName?: string; // Name of the DOM property. E.g. actionHref
		attributeName?: string; // Name of the HTML attribute. E.g. action-href
	}[];
	events: {
		name: string; // Name of the DOM event in kebab-case. Used also as the Vue event name. E.g. 'change'
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
		name: string; // Will be "default" for the default slot.
		description?: string;
		dynamicProps?: TypeStr; // If present, the component requests rendering the slot dynamically with these props. In Vue this becomes a scoped slot.
	}[];
	/// Annotations that drive the auto-generation of vivid-test-utils
	testUtils: VividTestUtilsManifest;
}
