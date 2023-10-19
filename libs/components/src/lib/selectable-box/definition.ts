import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { checkboxRegistries } from '../checkbox/definition';
import { focusRegistries } from '../focus/definition';
import { radioRegistries } from '../radio/definition';
import styles from './selectable-box.scss';

import { SelectableBox } from './selectable-box';
import { SelectableBoxTemplate as template } from './selectable-box.template';

export const selectableBoxDefinition =
	SelectableBox.compose<FoundationElementDefinition>({
		baseName: 'selectable-box',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const selectableBoxRegistries = [selectableBoxDefinition(), ...checkboxRegistries, ...focusRegistries, ...radioRegistries];

/**
 * Registers the selectable-box element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSelectableBox = registerFactory(selectableBoxRegistries);
