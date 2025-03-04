import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { accordionItemDefinition } from '../accordion-item/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './accordion.scss?inline';
import { Accordion } from './accordion';
import { AccordionTemplate as template } from './accordion.template';

export const AccordionExpandMode = {
	single: 'single',
	multi: 'multi',
} as const;

export type AccordionExpandMode =
	typeof AccordionExpandMode[keyof typeof AccordionExpandMode];

/**
 * @internal
 */
export const accordionDefinition = defineVividComponent(
	'accordion',
	Accordion,
	template,
	[accordionItemDefinition],
	{
		styles,
	}
);

/**
 * Registers the accordion elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAccordion = createRegisterFunction(accordionDefinition);
