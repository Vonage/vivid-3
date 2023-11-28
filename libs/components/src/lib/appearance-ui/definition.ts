import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './appearance-ui.scss';

import { AppearanceUi } from './appearance-ui';
import { AppearanceUiTemplate as template } from './appearance-ui.template';

export const appearanceUiDefinition =
	AppearanceUi.compose<FoundationElementDefinition>({
		baseName: 'appearance-ui',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const appearanceUiRegistries = [appearanceUiDefinition()];

/**
 * Registers the appearance-ui element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAppearanceUi = registerFactory(appearanceUiRegistries);
