import { html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { PlatformSwitch } from './platform-switch';

const getClasses = (_: PlatformSwitch) => classNames('base');

/**
 * The template for the PlatformSwitch component.
 *
 * @param context - element definition context
 * @public
 */
export const PlatformSwitchTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<PlatformSwitch> = () => {
	return html<PlatformSwitch>`<span class="${getClasses}"
		><slot ${slotted('slottedContent')}></slot
	></span>`;
};
