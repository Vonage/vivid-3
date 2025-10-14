import {
	html,
	InlineTemplateDirective,
	ViewTemplate,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Avatar } from './avatar';

const getClasses = ({ appearance, connotation, shape, size }: Avatar) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		[`size-${size}`, Boolean(size)]
	);

/**
 * @deprecated To be fully replaced with icon slot
 * Avatar icon
 */
function renderIcon(iconTag: InlineTemplateDirective) {
	return html<Avatar>`
		<${iconTag} name="${(x) => (x.icon ? `${x.icon}` : 'user-line')}"></${iconTag}>
	`;
}

/**
 * Avatar initials
 */
function renderInitials() {
	return html<Avatar>`
		<span class="initials">${({ initials }) => initials!.substring(0, 2)}</span>
	`;
}

function renderAvatarBaseElement(x: Avatar, content: ViewTemplate<Avatar>) {
	if (x.href) {
		return x._renderLinkElement(content, getClasses);
	} else if (x.clickable) {
		return html<Avatar>`<button
			type="button"
			class="${getClasses}"
			${delegateAria()}
		>
			${content}
		</button>`;
	} else {
		return html`<span class="${getClasses}">${content}</span>`;
	}
}

export const AvatarTemplate = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);
	return html`
		${(x) =>
			renderAvatarBaseElement(
				x,
				html`<slot name="graphic">
					${when((x) => x.initials, renderInitials())}
					${when(
						(x) => !x.initials,
						html`<span class="icon"
							><slot name="icon">${renderIcon(iconTag)}</slot></span
						>`
					)}</slot
				>`
			)}
	`;
};
