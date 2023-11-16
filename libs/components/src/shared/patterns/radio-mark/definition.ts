import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../design-system';
import styles from './radio-mark.scss';

import { RadioMark } from './radio-mark';
import { RadioMarkTemplate as template } from './radio-mark.template';

export const radioMarkDefinition =
	RadioMark.compose<FoundationElementDefinition>({
		baseName: 'radio-mark',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const radioMarkRegistries = [radioMarkDefinition()];

/**
 * Registers the radio-mark element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadioMark = registerFactory(radioMarkRegistries);
