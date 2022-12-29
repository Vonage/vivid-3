import { html, ViewTemplate, when } from "@microsoft/fast-element";
import type { ElementDefinitionContext } from "@microsoft/fast-foundation";
import { affixIconTemplateFactory } from '../shared/patterns/affix';
import type { AccordionItem } from "./accordion-item.js";

const header = (context: ElementDefinitionContext, hTag: string) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<AccordionItem>`
		<${hTag}>
			<button
				id="${x => x.id}"
				aria-expanded="${x => x.expanded}"
				aria-controls="${x => x.id}-panel"
				@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
			>
				
				${x => x.icon && !x.iconTrailing
					? affixIconTemplate(x.icon) : null}
			
				<span class="heading-content">${x => x.heading}</span>

				${when(x => x.meta, html`<span class="meta">${x => x.meta}</span>`)}

				${x => x.icon && x.iconTrailing
					? affixIconTemplate(x.icon) : null}
				${x => !(x.icon && x.iconTrailing) && !x.noIndicator
					? affixIconTemplate(x.expanded ? 'chevron-up-solid' : 'chevron-down-solid') : null}
				
			</button>
		</${hTag}>
	`;
}

export const AccordionItemTemplate: (
	context: ElementDefinitionContext
) => ViewTemplate<AccordionItem> = (
	context: ElementDefinitionContext
) => html<AccordionItem>`
	${x => header(context, 'h' + x.headinglevel)}
	<div
		id="${x => x.id}-panel"
		aria-labelledby="${x => x.id}"
		role="region"
		class="region"
	>
		<slot></slot>
	</div>
`;
