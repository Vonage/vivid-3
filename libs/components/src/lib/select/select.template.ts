import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Select } from './select';

const getClasses = (_: Select) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Select} component.
 *
 * @param context
 * @public
 */
export const SelectTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Select> = (context: ElementDefinitionContext) => html` <span
	class="${getClasses}"
	>${context.name}
</span>`;
