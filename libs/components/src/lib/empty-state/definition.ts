import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import styles from './empty-state.scss';

import { EmptyState } from './empty-state';
import { EmptyStateTemplate as template } from './empty-state.template';

export const emptyStateDefinition =
	EmptyState.compose<FoundationElementDefinition>({
		baseName: 'empty-state',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const emptyStateRegistries = [emptyStateDefinition(), ...iconRegistries];

/**
 * Registers the empty-state element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerEmptyState = registerFactory(emptyStateRegistries);
