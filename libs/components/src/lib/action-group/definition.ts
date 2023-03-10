import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './action-group.scss';

import { ActionGroup } from './action-group';
import { ActionGroupTemplate as template } from './action-group.template';

export type { ActionGroupShape, ActionGroupAppearance } from './action-group';

/**
 *
 * @internal
 */
export const actionGroupDefinition = ActionGroup.compose<FoundationElementDefinition>({
	baseName: 'action-group',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const actionGroupRegistries = [actionGroupDefinition()];

/**
 * Registers the action-group elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerActionGroup = registerFactory(actionGroupRegistries);
