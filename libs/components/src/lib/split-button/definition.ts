import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { SplitButton } from './split-button';
import styles from './split-button.scss?inline';
import { SplitButtonTemplate as template } from './split-button.template';

export type {
	SplitButtonAppearance,
	SplitButtonConnotation,
	SplitButtonShape,
	SplitButtonSize,
} from './split-button';

/**
 *
 * @internal
 */
export const splitButtonDefinition =
	SplitButton.compose<FoundationElementDefinition>({
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
export const splitButtonRegistries = [
	splitButtonDefinition(),
	...iconRegistries,
];

/**
 * Registers the button elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSplitButton = registerFactory(splitButtonRegistries);
