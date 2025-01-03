import { html, ref, when } from '@microsoft/fast-element';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { AccordionItem } from './accordion-item.js';

const header = (context: VividElementDefinitionContext, hTag: string) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	/* eslint-disable @typescript-eslint/indent */
	return html<AccordionItem>`
		<${hTag} class="heading-container">
			<button
				class="heading-button ${(x) => (x.size ? `size-${x.size}` : '')}"
				id="${(x) => x.id}"
				aria-expanded="${(x) => x.expanded}"
				aria-controls="${(x) => x.id}-panel"
				@click="${(x) => x.clickHandler()}"
				${ref('expandbutton')}
			>

				${(x) => (!x.iconTrailing ? affixIconTemplate(x.icon, IconWrapper.Slot) : null)}

				<span class="heading-content">${(x) => x.heading}</span>

				${when((x) => x.meta, html`<span class="meta">${(x) => x.meta}</span>`)}

				${(x) => (x.icon && x.iconTrailing ? affixIconTemplate(x.icon) : null)}
				${(x) =>
					!(x.icon && x.iconTrailing) && !x.noIndicator
						? affixIconTemplate(
								x.expanded ? 'chevron-up-solid' : 'chevron-down-solid'
						  )
						: null}

			</button>
		</${hTag}>
	`;
};

export const AccordionItemTemplate = (
	context: VividElementDefinitionContext
) => html<AccordionItem>`
	${(x) => header(context, 'h' + x.headinglevel)}
	<div
		id="${(x) => x.id}-panel"
		aria-labelledby="${(x) => x.id}"
		role="region"
		class="region ${(x) => (x.icon && !x.iconTrailing ? 'padded' : '')} ${(x) =>
			x.size ? `size-${x.size}` : ''}"
	>
		<slot></slot>
	</div>
`;
