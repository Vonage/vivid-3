import { popupDefinition } from '../popup/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './tooltip.scss?inline';
import { Tooltip } from './tooltip';
import { TooltipTemplate as template } from './tooltip.template';

/**
 * @internal
 */
export const tooltipDefinition = defineVividComponent(
	'tooltip',
	Tooltip,
	template,
	[popupDefinition],
	{
		styles,
	}
);

/**
 * Registers the tooltip elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTooltip = createRegisterFunction(tooltipDefinition);

export { Tooltip as VwcTooltipElement };
