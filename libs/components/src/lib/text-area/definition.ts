import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './text-area.scss';

import { TextArea } from './text-area';
import { TextAreaTemplate as template } from './text-area.template';


/**
 * The text-area element.
 *
 * @internal
 */
export const textArea = TextArea.compose<FoundationElementDefinition>({
	baseName: 'text-area',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();

export const textAreaElements = [textArea, ...iconElements, ...focusElements];

/**
 * Registers the text-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextArea = registerFactorial(textAreaElements);
