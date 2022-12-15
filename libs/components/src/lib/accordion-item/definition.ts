import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './accordion-item.scss';

import { AccordionItem } from './accordion-item';
import { AccordionItemTemplate as template } from './accordion-item.template';


/**
 *
 * @internal
 */
export const accordionItem =
	AccordionItem.compose<FoundationElementDefinition>({
		baseName: 'accordion-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

export const accordionItemRegistries = [accordionItem(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the accordion item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAccordionItem = registerFactory(accordionItemRegistries);
