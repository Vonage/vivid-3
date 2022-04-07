import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Accordion } from './accordion';

const getClasses = (_: Accordion) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Accordion} component.
 *
 * @param context
 * @public
 */
export const AccordionTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Accordion> = (
  context: ElementDefinitionContext
) => html` <span class="${getClasses}">${context.name} </span>`;
