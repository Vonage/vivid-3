import { buttonDefinition } from '../button/definition';
import { popupDefinition } from '../popup/definition';
import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './searchable-select.scss?inline';
import optionTagStyles from './option-tag.scss?inline';
import { SearchableSelect } from './searchable-select';
import { SearchableSelectTemplate as template } from './searchable-select.template';
import { OptionTag } from './option-tag';
import { optionTagTemplate } from './option-tag.template';

const optionTagDefinition = defineVividComponent(
	'option-tag',
	OptionTag,
	optionTagTemplate,
	[iconDefinition],
	{
		styles: [optionTagStyles],
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * @internal
 */
const searchableSelectDefinition = defineVividComponent(
	'searchable-select',
	SearchableSelect,
	template,
	[buttonDefinition, popupDefinition, iconDefinition, optionTagDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the searchable-select element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSearchableSelect = createRegisterFunction(
	searchableSelectDefinition
);

export { SearchableSelect as VwcSearchableSelectElement };
