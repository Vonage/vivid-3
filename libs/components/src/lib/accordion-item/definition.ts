import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { iconDefinition } from '../icon/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './accordion-item.scss?inline';
import { AccordionItem } from './accordion-item';
import { AccordionItemTemplate as template } from './accordion-item.template';

/**
 * @internal
 */
export const accordionItemDefinition = defineVividComponent(
	'accordion-item',
	AccordionItem,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the accordion item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAccordionItem = createRegisterFunction(
	accordionItemDefinition
);

export { AccordionItem as VwcAccordionItemElement };
