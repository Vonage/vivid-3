import { html, ref, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { AccordionItem } from './accordion-item.js';




const header = (context: ElementDefinitionContext, hTag: string) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	/* eslint-disable @typescript-eslint/indent */
	return html<AccordionItem>`
		<${hTag} class="heading-container">
			<button
				class="heading-button ${x => x.size ? `size-${x.size}` : ''}"
				id="${x => x.id}"
				aria-expanded="${x => x.expanded}"
				aria-controls="${x => x.id}-panel"
				@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
				${ref('expandbutton')}
			>
				${() => focusTemplate}

				${x => x.icon && !x.iconTrailing
					? affixIconTemplate(x.icon) : null}

				<span class="heading-content">${x => x.locale.greeting}</span>

				${when(x => x.meta, html`<span class="meta">${x => x.meta}</span>`)}

				${x => x.icon && x.iconTrailing
					? affixIconTemplate(x.icon) : null}
				${x => !(x.icon && x.iconTrailing) && !x.noIndicator
					? affixIconTemplate(x.expanded ? 'chevron-up-solid' : 'chevron-down-solid') : null}

			</button>
		</${hTag}>
	`;
};

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
		class="region ${x => x.icon && !x.iconTrailing ? 'padded' : ''} ${x => x.size ? `size-${x.size}` : ''}"
	>
		<slot></slot>
	</div>
`;
