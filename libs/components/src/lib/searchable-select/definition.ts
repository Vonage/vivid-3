import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { popupRegistries } from '../popup/definition';
import { iconRegistries } from '../icon/definition';
import styles from './searchable-select.scss?inline';
import optionTagStyles from './option-tag.scss?inline';

import { SearchableSelect } from './searchable-select';
import { SearchableSelectTemplate as template } from './searchable-select.template';
import { OptionTag } from './option-tag';
import { optionTagTemplate } from './option-tag.template';

export const optionTagDefinition =
	OptionTag.compose<FoundationElementDefinition>({
		baseName: 'option-tag',
		template: optionTagTemplate as any,
		styles: [optionTagStyles],
		shadowOptions: {
			delegatesFocus: true,
		},
	});

export const searchableSelectDefinition =
	SearchableSelect.compose<FoundationElementDefinition>({
		baseName: 'searchable-select',
		template: template as any,
		styles: [styles],
		shadowOptions: {
			delegatesFocus: true,
		},
	});

/**
 * @internal
 */
export const searchableSelectRegistries = [
	...buttonRegistries,
	...popupRegistries,
	...iconRegistries,
	optionTagDefinition(),
	searchableSelectDefinition(),
];

/**
 * Registers the searchable-select element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSearchableSelect = registerFactory(
	searchableSelectRegistries
);
