import { html, ref, ViewTemplate, when } from "@microsoft/fast-element";
import type { ElementDefinitionContext } from "@microsoft/fast-foundation";
import { affixIconTemplateFactory } from '../shared/patterns/affix';
import type { AccordionItem } from "./accordion-item.js";

const iconGlyph = (x: AccordionItem, context: ElementDefinitionContext, iconCondition: boolean, glyphCondition: boolean) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	if (iconCondition) return affixIconTemplate(x.icon);
	if (glyphCondition) return affixIconTemplate(x.expanded ? 'chevron-up-solid' : 'chevron-down-solid');
	return null;
}

const header = (context: ElementDefinitionContext) => html<AccordionItem>`
	<button
		class="button"
		part="button"
		${ref("expandbutton")}
		role="heading"
		aria-level="${x => x.headinglevel}"
		aria-expanded="${x => x.expanded}"
		aria-controls="${x => x.id}-panel"
		id="${x => x.id}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
	>

		${x => iconGlyph(x, context,
			Boolean(x.icon && !x.iconTrailing),
			false
		)}
	
		<span class="heading-content" part="heading-content">
			${x => x.heading}
		</span>

		${when(x => x.meta, html`
			<span class="meta">${x => x.meta}</span>
		`)}

		${x => iconGlyph(x, context,
			Boolean(x.icon && x.iconTrailing),
			!x.leading && !x.noIndicator
		)}
	</button>
`;

export const AccordionItemTemplate: (
	context: ElementDefinitionContext
) => ViewTemplate<AccordionItem> = (
	context: ElementDefinitionContext
) => {

	return html<AccordionItem>`
		${header(context)}
        <div
            class="region"
            part="region"
            id="${x => x.id}-panel"
            role="region"
            aria-labelledby="${x => x.id}"
        >
            <slot></slot>
        </div>
	`;
}
