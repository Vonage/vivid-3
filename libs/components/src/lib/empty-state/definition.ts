import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './empty-state.scss?inline';
import { EmptyState } from './empty-state';
import { EmptyStateTemplate as template } from './empty-state.template';

export type {
	EmptyStateConnotation,
	EmptyStateIconDecoration,
} from './empty-state';

/**
 * @internal
 */
export const emptyStateDefinition = defineVividComponent(
	'empty-state',
	EmptyState,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the empty-state element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerEmptyState = createRegisterFunction(emptyStateDefinition);
