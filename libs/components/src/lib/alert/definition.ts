import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { elevationRegistries } from '../elevation/definition';
import { iconRegistries } from '../icon/definition';
import styles from './alert.scss';

import { Alert } from './alert';
import { AlertTemplate as template } from './alert.template';

export type { AlertConnotation } from './alert';

/**
 *
 * @internal
 */
export const alertDefinition = Alert.compose<FoundationElementDefinition>({
	baseName: 'alert',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const alertRegistries = [alertDefinition(), ...iconRegistries, ...buttonRegistries, ...elevationRegistries];

/**
 * Registers the alert elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAlert = registerFactory(alertRegistries);

