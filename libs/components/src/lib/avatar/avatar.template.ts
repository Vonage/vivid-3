import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Avatar } from './avatar';

const getClasses = ({appearance, connotation, shape, density}: Avatar) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`density-${density}`, Boolean(density)],
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
				<abbr class="icon" title="Vivid Team">VT</abbr>
		</slot>
</span>`;
