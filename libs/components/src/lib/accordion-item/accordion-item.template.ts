import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { AccordionItem } from './accordion-item.js';

const getClasses = ({ appearance, size }: AccordionItem) =>
	classNames(
		'heading-button',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`size-${size}`, Boolean(size)]
	);

const header = (context: VividElementDefinitionContext, hTag: string) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<AccordionItem>`
		<${hTag} class="heading-container">
			<button
				class="${getClasses}"
				id="${(x) => x.id}"
				aria-expanded="${(x) => x.expanded}"
				aria-controls="${(x) => x.id}-panel"
				@click="${(x) => x.clickHandler()}"
				${ref('expandbutton')}
			>

				${(x) => (!x.iconTrailing ? affixIconTemplate(x.icon, IconWrapper.Slot) : null)}

				<span class="heading-content">
					<slot name="heading" ${slotted('_headingSlottedContent')}></slot>
					${when(
						(x) => x.heading && !x._headingSlottedContent?.length,
						html`${(x) => x.heading}`
					)}
				</span>

				<span class="meta">
					<slot name="meta" ${slotted('_metaSlottedContent')}></slot>
					${when((x) => x.meta && !x._metaSlottedContent?.length, html`${(x) => x.meta}`)}
				</span>

				${(x) => (x.icon && x.iconTrailing ? affixIconTemplate(x.icon) : null)}
				${(x) =>
					!(x.icon && x.iconTrailing) && !x.noIndicator
						? affixIconTemplate(
								x.expanded ? 'chevron-up-line' : 'chevron-down-line'
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
