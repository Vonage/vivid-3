import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { accordionItemRegistries } from '../accordion-item/definition'; // cf https://github.com/Vonage/vivid-3/discussions/929
import styles from './accordion.scss';

import { Accordion } from './accordion';
import { AccordionTemplate as template } from './accordion.template';

export type { AccordionExpandMode } from '@microsoft/fast-foundation'

/**
 *
 * @internal
 */
export const accordionDefinition = Accordion.compose<FoundationElementDefinition>({
	baseName: 'accordion',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const accordionRegistries = [accordionDefinition(), ...accordionItemRegistries];

/**
 * Registers the accordion elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAccordion = registerFactory(accordionRegistries);
