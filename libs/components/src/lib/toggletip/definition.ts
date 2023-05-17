import type { FoundationElementDefinition } from '@microsoft/fast-foundation';

import { registerFactory } from '../../shared/design-system';
import { popupRegistries } from '../popup/definition';

import styles from './toggletip.scss';
import { Toggletip } from './toggletip';
import { ToggletipTemplate as template } from './toggletip.template';

/**
 * The toggletip element.
 */
export const toggletipDefinition = Toggletip.compose<FoundationElementDefinition>({
	baseName: 'toggletip',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const toggletipRegistries = [toggletipDefinition(), ...popupRegistries];

/**
 * Registers the toggletip element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerToggletip = registerFactory(toggletipRegistries);
