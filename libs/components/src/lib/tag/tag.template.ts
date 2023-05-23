import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { Tag } from './tag';

const getClasses = ({
	connotation, appearance, shape, disabled, selectable, removable, selected
}: Tag) => classNames(
	'base',
	['disabled', disabled],
	['selectable', selectable],
	['active', selectable && selected],
	['removable', removable && !selectable],
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
);

function renderDismissButton(iconTag: string) {
	return html<Tag>`
	<span
		aria-hidden="true"
		class="dismiss-button"
		@click="${x => x.remove()}">
		<${iconTag} name="close-line"></${iconTag}>
	</span>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Tag} component.
 *
 * @param context
 * @public
 */
export const tagTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Tag> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);
	const focusTemplate = focusTemplateFactory(context);

	return html`
	<span class="${getClasses}"
	role="option"
	aria-disabled="${x => x.disabled}"
	aria-selected="${x => x.selectable}"
	tabindex="${x => (x.disabled ? null : 0)}"
	@keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
	@click="${x => x.handleClick()}">
		${x => affixIconTemplate(x.icon)}
		${when((x) => x.label, (x) => html<Tag>`<span class="label">${x.label as string}</span>`)}
		${when(x => x.removable && !x.selectable, renderDismissButton(iconTag))}
		${when(x => (x.selectable && x.selected),
		html<Tag>`<${iconTag} class="selectable-icon" name="check-circle-solid"></${iconTag}>`)}
		${() => focusTemplate}
	</span>`;
};
