import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Toggletip } from '../toggletip/toggletip';
import { Button } from '../button/button';
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
	const buttonTag = context.tagFor(Button);
	const iconTag = context.tagFor(Icon);
	return html<ContextualHelp>`
		<${toggletipTag} class="${getClasses}">
			<${buttonTag} slot="anchor" shape="pill" appearance="ghost" size="super-condensed">
				<${iconTag} slot="icon" name="help-solid" size="-6"></${iconTag}>
			</${buttonTag}>
			<slot></slot>
		</${toggletipTag}>
	`;
};
