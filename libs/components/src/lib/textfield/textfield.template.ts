import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Textfield } from './textfield';

const getClasses = (_: Textfield) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Textfield} component.
 *
 * @param context
 * @public
 */
export const TextfieldTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Textfield> = (
  context: ElementDefinitionContext
) => html` <span class="${getClasses}">${context.name} </span>`;
