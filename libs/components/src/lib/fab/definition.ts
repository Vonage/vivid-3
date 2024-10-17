import type { FoundationElementDefinition } from '../../shared/foundation/foundation-element/foundation-element';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import styles from './fab.scss?inline';

import { Fab } from './fab';
import { FabTemplate as template } from './fab.template';

export type { FabConnotation, FABSize } from './fab';

/**
 * The calendar-event element is a custom element that is used to display a single event in a calendar.
 */
export const fabDefinition = Fab.compose<FoundationElementDefinition>({
	baseName: 'fab',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const fabRegistries = [fabDefinition(), ...iconRegistries];

/**
 * Registers the FAB elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFab = registerFactory(fabRegistries);
