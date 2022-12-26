import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { Avatar } from './avatar';

const getClasses = ({appearance, connotation, shape, size}: Avatar) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
);

/**
 * avatar icon
 * 
 * @returns HTMLElement - template
 */
function renderIcon(iconTag: string) {
	return html<Avatar>`
		<span class="icon">
			<${iconTag} name="${(x) => x.icon? `${x.icon}` : 'user-line'}"></${iconTag}>
		</span>
	`;
}


/**
 * avatar initials
 * 
 * @returns HTMLElement - template
 */
function renderInitials() {
	return html<Avatar>`
		<span class="initials">${ ({ name }) => name!.substring(0, 2) }</span>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Avatar} component.
 *
 * @returns HTMLElement - template
 */
export const AvatarTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Avatar> = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`
	<span class="${getClasses}">
		<slot name="graphic">
			${when(x => x.name, renderInitials())}
			${when( x => !x.name, renderIcon(iconTag))}
		</slot>
</span>`;
};