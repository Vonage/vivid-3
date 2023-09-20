import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory, IconWrapper } from '../../shared/patterns/affix';
import type { Badge } from './badge';

const getClasses = ({
	connotation, appearance, shape, iconTrailing, text, icon
}: Badge) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	['icon-trailing', iconTrailing],
	['icon-only', !text && Boolean(icon)],
);

/**
 * The template for the Badge component.
 *
 * @param context - element definition context
 * @public
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
    <span class="${getClasses}">
      ${x => affixIconTemplate(x.icon, IconWrapper.Slot)}
			${when((x)=> x.text, (x) => html<Badge>`<span class="text">${x.text as string}</span>`)}
	</span>`;
};
