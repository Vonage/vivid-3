import { html, InlineTemplateDirective, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Tag } from './tag';

const getClasses = ({
	connotation,
	appearance,
	shape,
	disabled,
	selectable,
	removable,
	selected,
}: Tag) =>
	classNames(
		'base',
		['disabled', disabled],
		['selectable', selectable],
		['selected', selectable && selected],
		['removable', removable && !selectable],
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)]
	);

function renderDismissButton(iconTag: InlineTemplateDirective) {
	return html<Tag>`
	<button
		class="dismiss-button"
		aria-label="${(x) => x.locale.tag.remove(x.label as string)}"
		?disabled="${(x) => x.disabled}"
		@click="${(x) => x.remove()}">
		<${iconTag} name="close-line"></${iconTag}>
	</button>`;
}

export const tagTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	const content = html<Tag>`
		${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
		${when(
			(x) => x.label,
			(x) => html<Tag>`<span class="label">${x.label as string}</span>`
		)}
		${when((x) => x.removable && !x.selectable, renderDismissButton(iconTag))}
		${when(
			(x) => x.selectable && x.selected,
			html<Tag>`<${iconTag} class="selectable-icon" name="check-circle-solid"></${iconTag}>`
		)}
	`;

	return html<Tag>`
		${when(
			(x) => x.selectable,
			html<Tag>`<button
				class="${getClasses}"
				${delegateAria({
					ariaPressed: (x) => x.selected,
				})}
				?disabled="${(x) => x.disabled}"
				@keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
				@click="${(x) => x.handleClick()}"
			>
				${content}
			</button>`
		)}
		${when(
			(x) => !x.selectable,
			html<Tag>`<span
				class="${getClasses}"
				${delegateAria()}
				tabindex="${(x) => (x.disabled || x.removable ? null : 0)}"
				@keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
				@click="${(x) => x.handleClick()}"
			>
				${content}
			</span>`
		)}
	`;
};
