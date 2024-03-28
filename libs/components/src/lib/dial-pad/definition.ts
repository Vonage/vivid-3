import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { textFieldRegistries } from '../text-field/definition';
import styles from './dial-pad.scss?inline';

import { DialPad } from './dial-pad';
import { DialPadTemplate as template } from './dial-pad.template';

export const dialPadDefinition = DialPad.compose<FoundationElementDefinition>({
	baseName: 'dial-pad',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const dialPadRegistries = [
	dialPadDefinition(),
	...buttonRegistries,
	...textFieldRegistries,
];

/**
 * Registers the dial-pad element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDialPad = registerFactory(dialPadRegistries);
