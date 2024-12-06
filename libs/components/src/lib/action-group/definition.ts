import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './action-group.scss?inline';
import { ActionGroup } from './action-group';
import { ActionGroupTemplate as template } from './action-group.template';

export type { ActionGroupShape, ActionGroupAppearance } from './action-group';

/**
 * @internal
 */
export const actionGroupDefinition = defineVividComponent(
	'action-group',
	ActionGroup,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the action-group elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerActionGroup = createRegisterFunction(
	actionGroupDefinition
);
