import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
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
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 *
 * @param ElementDefinitionContext - ElementDefinitionContext - context element definition
 * @returns HTMLElement - template
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
    <span class="${getClasses}">
      ${x => affixIconTemplate(x.icon)}
			${when((x)=> x.text, (x) => html<Badge>`<span class="text">${x.text as string}</span>`)}
		</span>`;
};
