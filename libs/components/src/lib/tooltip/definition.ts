import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { popupElements } from '../popup/definition';
import styles from './tooltip.scss';

import { Tooltip } from './tooltip';
import { TooltipTemplate as template } from './tooltip.template';


/**
 * The tooltip element.
 *
 * @internal
 */
export const tooltipDefinition = Tooltip.compose<FoundationElementDefinition>({
	baseName: 'tooltip',
	template: template as any,
	styles,
});

export const tooltipRegistries = [tooltip(), ...popupRegistries];

/**
 * Registers the tooltip elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTooltip = registerFactory(tooltipRegistries);
