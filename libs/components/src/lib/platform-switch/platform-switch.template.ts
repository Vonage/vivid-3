import { html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { PlatformSwitch } from './platform-switch';

export const PlatformSwitchTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<PlatformSwitch> = () => {
	return html<PlatformSwitch>`<slot ${slotted('slottedContent')}></slot>`;
};
