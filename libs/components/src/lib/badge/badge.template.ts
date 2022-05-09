import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix.js';
import type { Badge } from './badge';

const getClasses = ({
	connotation, appearance, shape, size, iconTrailing
}: Badge) => classNames(
	'control',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
	['icon-trailing', iconTrailing],
);

/**
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 *
 * @param context
 * @public
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
    <span class="${getClasses}">
      ${x => affixIconTemplate(x.icon)}
      ${(x) => x.text}
		</span>`;
};
