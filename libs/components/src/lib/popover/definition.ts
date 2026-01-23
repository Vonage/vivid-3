import { elevationDefinition } from '../elevation/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { buttonDefinition, iconDefinition } from '../components';
import styles from './popover.scss?inline';
import { Popover } from './popover';
import { popoverTemplate as template } from './popover.template';

export const popoverDefinition = defineVividComponent(
	'popover',
	Popover,
	template,
	[buttonDefinition, iconDefinition, elevationDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the popover element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPopover = createRegisterFunction(popoverDefinition);

export { Popover as VwcPopoverElement };
