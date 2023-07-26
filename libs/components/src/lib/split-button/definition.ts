import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import { progressRingRegistries } from '../progress-ring/definition';
import { SplitButton } from './split-button';
import styles from './split-button.scss';
import { SplitButtonTemplate as template } from './split-button.template';

export type { SplitButtonAppearance, SplitButtonConnotation, SplitButtonShape, SplitButtonSize } from './split-button';

/**
 *
 * @internal
 */
export const splitButtonDefinition = SplitButton.compose<FoundationElementDefinition>({
	baseName: 'split-button',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const splitButtonRegistries = [splitButtonDefinition(), ...iconRegistries, ...focusRegistries, ...progressRingRegistries];

/**
 * Registers the button elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSplitButton = registerFactory(splitButtonRegistries);
