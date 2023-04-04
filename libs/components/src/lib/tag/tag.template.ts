import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { Tag } from './tag';

const getClasses = ({
	connotation, appearance, size, shape, disabled, selected, selectable, removable
}: Tag) => classNames(
	'base',
	['disabled', disabled],
	['active', selected && selectable],
	['selectable', selectable],
	['removable', removable],
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`size-${size}`, Boolean(size)],
	[`shape-${shape}`, Boolean(shape)],
);

function renderDismissButton(iconTag: string) {
	return html<Tag>`
	<span 
		aria-hidden="true"
		class="dismiss-button"
		@click="${x => x.remove()}">
		<${iconTag} class="dismiss-icon" name="close-line"></${iconTag}>
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
	<span class="${getClasses}" @click="${x => x.handleClick()}">
		${x => affixIconTemplate(x.icon)}
		${when((x) => x.text, (x) => html<Tag>`<span class="text">${x.text as string}</span>`)}
		${when(x => x.removable, renderDismissButton(iconTag))}
		${when(x => x.selected, html<Tag>`<${iconTag} name="check-line"></${iconTag}>`)}
		${() => focusTemplate}
	</span>`;
};
