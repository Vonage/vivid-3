import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';

import { TextAnchor } from './text-anchor';
import { textAnchorTemplate as template } from './text-anchor.template';


/**
 * The text-anchor element.
 */
export const textAnchorDefinition = TextAnchor.compose<FoundationElementDefinition>({
	baseName: 'text-anchor',
	template: template as any,
});

/**
 * @internal
 */
export const textAnchorRegistries = [textAnchorDefinition()];

/**
 * Registers the text-anchor elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextAnchor = registerFactory(textAnchorRegistries);
