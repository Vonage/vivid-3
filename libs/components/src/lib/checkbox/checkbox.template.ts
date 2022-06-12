import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Checkbox } from './checkbox';

const getClasses = (_: Checkbox) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Checkbox} component.
 *
 * @param context
 * @public
 */
export const CheckboxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Checkbox> = (context: ElementDefinitionContext) => html` <span
  class="${getClasses}"
  >${context.name}
</span>`;
