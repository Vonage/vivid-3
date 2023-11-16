import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../design-system';
import { iconRegistries } from '../../../lib/icon/definition';
import styles from './check-mark.scss';

import { CheckMark } from './check-mark';
import { CheckMarkTemplate as template } from './check-mark.template';

export const checkMarkDefinition =
	CheckMark.compose<FoundationElementDefinition>({
		baseName: 'check-mark',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const checkMarkRegistries = [checkMarkDefinition(), ...iconRegistries];

/**
 * Registers the check-mark element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCheckMark = registerFactory(checkMarkRegistries);
