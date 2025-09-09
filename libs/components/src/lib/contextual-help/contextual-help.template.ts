import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Toggletip } from '../toggletip/toggletip';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { ContextualHelp } from './contextual-help';

const getClasses = (_: ContextualHelp) => classNames('control');

/**
 * The template for the ContextualHelp component.
 *
 * @param context - element definition context
 * @public
 */
export const ContextualHelpTemplate = (
	context: VividElementDefinitionContext
) => {
	const toggletipTag = context.tagFor(Toggletip);
	const iconTag = context.tagFor(Icon);
	return html<ContextualHelp>`
		<${toggletipTag} class="base" exportparts="vvd-theme-alternate">
			<button class="${getClasses}" slot="anchor">
        <slot name="icon" slot="icon">
          <${iconTag} name="help-solid"></${iconTag}>
        </slot>
			</button>
			<slot></slot>
		</${toggletipTag}>
	`;
};
