import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import * as initialsDefault from 'initials';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Avatar } from './avatar';

const initials = initialsDefault as any;

const getClasses = ({appearance, connotation, shape, density}: Avatar) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`density-${density}`, Boolean(density)],
);

/**
 avatar icon
 */
function renderIcon() {
	return html<Avatar>`
		<span class="icon">
			<vwc-icon type="${(x) => x.icon? `${x.icon}` : 'user-line'}"></vwc-icon>
		</span>
	`;
}


/**
 avatar initials
 */
function renderInitials() {
	return html<Avatar>`
		<span class="initials">${ (x) => initials(`${x.name}`)?.substring(0, 2) }</span>
	`;
}

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
			${when(x => x.name, renderInitials())}
			${when( x => !x.name, renderIcon())}
		</slot>
</span>`;
