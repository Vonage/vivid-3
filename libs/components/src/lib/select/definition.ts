import { popupDefinition } from '../popup/definition';
import { iconDefinition } from '../icon/definition';
import { listboxOptionDefinition } from '../option/definition';
import { buttonDefinition } from '../button/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { feedbackMessageDefinition } from '../../shared/feedback/feedback-message';
import styles from './select.scss?inline';
import { Select } from './select';
import { SelectTemplate as template } from './select.template';

export type { SelectAppearance, SelectShape } from './select';

/**
 * @internal
 */
export const selectDefinition = defineVividComponent(
	'select',
	Select,
	template,
	[
		popupDefinition,
		iconDefinition,
		listboxOptionDefinition,
		buttonDefinition,
		feedbackMessageDefinition,
	],
	{
		styles,
	}
);

/**
 * Registers the select elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSelect = createRegisterFunction(selectDefinition);

export { Select as VwcSelectElement };
