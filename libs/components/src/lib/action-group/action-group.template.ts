import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { ActionGroup } from './action-group';

const getClasses = ({ appearance, shape, tight }: ActionGroup) =>
	classNames(
		'base',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['tight', tight]
	);

/**
 * The template for the action-group component.
 *
 * @param context - element definition context
 * @public
 */
export const ActionGroupTemplate = html<ActionGroup>`<div
	class="${getClasses}"
	${delegateAria({
		role: (x) => (x.role ? x.role : 'group'),
	})}
>
	<slot></slot>
</div>`;
