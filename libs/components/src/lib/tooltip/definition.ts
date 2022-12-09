import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './tooltip.scss';

import { Tooltip } from './tooltip';
import { TooltipTemplate as template } from './tooltip.template';


/**
 * The tooltip element.
 *
 * @internal
 */
export const tooltip = Tooltip.compose<FoundationElementDefinition>({
	baseName: 'tooltip',
	template: template as any,
	styles,
});

export const tooltipElements = [tooltip];

/**
 * Registers the calendar-event elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registertooltip = registerFactorial(...tooltipElements);
