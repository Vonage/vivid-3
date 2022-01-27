import '../icon';
import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { Badge } from './badge';

const getClasses = ({
	connotation, appearance, shape, size, iconTrailing,
}: Badge) => classNames(
	'control',
	['icon-trailing', iconTrailing],
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
);

const iconTemplate = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<span class="affix"><${iconTag} :type="${(x) => x.icon}"></${iconTag}></span>`;
};
/**
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 *
 * @param context
 * @public
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = (context: ElementDefinitionContext) => html`
        <span class="${getClasses}">
			${(x) => (x.icon ? iconTemplate(context) : '')}
			${(x) => x.text}
		</span>`;
