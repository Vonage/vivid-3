import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { icon } from '../icon/definition';
import { focus } from '../focus/definition';
import styles from './accordion-item.scss';

import { AccordionItem } from './accordion-item';
import { AccordionItemTemplate as template } from './accordion-item.template';


const accordionItem =
	AccordionItem.compose<FoundationElementDefinition>({
		baseName: 'accordion-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	})();

export const accordionItemElements = [accordionItem, icon, focus];

/**
 * Registers the accordion item component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAccordionItem = registerFactorial(...accordionItemElements);
