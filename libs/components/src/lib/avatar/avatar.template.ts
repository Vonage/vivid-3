import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Avatar } from './avatar';

const getClasses = ({appearance, connotation, shape, density}: Avatar) => classNames(
	'base',
	[`connotation-${connotation}`, !!connotation],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`density-${(density ? Number(density) : 0) + 5}`, !!density],
);

/**
 * The template for the {@link @microsoft/fast-foundation#Avatar} component.
 *
 * @param context
 * @public
 */
export const AvatarTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Avatar> = () => html` 
	<span class="${getClasses}">
		<slot>
			${when(x => x.text, html`<span class="initials">${x => x.text}</span>`)}
			${when(x => !x.text, html`<span class="icon"><vwc-icon type='user-line'></vwc-icon></span>`)}
		</slot>
</span>`;
