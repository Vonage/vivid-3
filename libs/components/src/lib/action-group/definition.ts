import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './action-group.scss';

import { ActionGroup } from './action-group';
import { ActionGroupTemplate as template } from './action-group.template';


/**
 *
 * @internal
 */
export const actionGroup = ActionGroup.compose<FoundationElementDefinition>({
	baseName: 'action-group',
	template: template as any,
	styles,
})();

export const actionGroupElements = [actionGroup];

/**
 * Registers the action-group elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerActionGroup = registerFactorial(actionGroupElements);
