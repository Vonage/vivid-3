import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';

import { TextAnchor } from './text-anchor';
import { textAnchorTemplate as template } from './text-anchor.template';


/**
 * The text-anchor element.
 *
 * @internal
 */
export const textAnchor = TextAnchor.compose<FoundationElementDefinition>({
	baseName: 'text-anchor',
	template: template as any,
})();

export const textAnchorElements = [textAnchor];

/**
 * Registers the text-anchor elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextAnchor = registerFactorial(...textAnchorElements);
