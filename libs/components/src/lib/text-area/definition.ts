import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import styles from './text-area.scss?inline';

import { TextArea } from './text-area';
import { TextAreaTemplate as template } from './text-area.template';

export type { TextAreaWrap } from './text-area';

/**
 * The text-area element.
 */
export const textAreaDefinition = TextArea.compose<FoundationElementDefinition>(
	{
		baseName: 'text-area',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * @internal
 */
export const textAreaRegistries = [textAreaDefinition(), ...iconRegistries];

/**
 * Registers the text-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextArea = registerFactory(textAreaRegistries);
