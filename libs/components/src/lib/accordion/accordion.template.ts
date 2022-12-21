import { html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Accordion } from './accordion';

const getClasses = (_: Accordion) => classNames('base');

/**
 * The template for the {@link @vonage/vivid#Accordion} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const AccordionTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Accordion> = (
) => html`
	<div
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
		class="${getClasses}">
			<slot
			${slotted({
		filter: Accordion.slottedAccordionItemFilter as any, // TODO: fix any here. maybe a bug in fast-element or our outdate version of it
		flatten: true,
		property: 'slottedAccordionItems',
	})}
			></slot>
</div>`;
