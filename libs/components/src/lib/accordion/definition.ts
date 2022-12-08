import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './accordion.scss';

import { Accordion } from './accordion';
import { AccordionTemplate as template } from './accordion.template';

const accordion = Accordion.compose<FoundationElementDefinition>({
	baseName: 'accordion',
	template: template as any,
	styles,
})();

export const accordionElements = [accordion];

/**
 * Registers the accordion component
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAccordion = registerFactorial(...accordionElements);
