import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './text-editor.scss?inline';

import { TextEditor } from './text-editor';
import { TextEditorTemplate as template } from './text-editor.template';

/**
 * The Divider element.
 *
 * @internal
 */
export const textEditorDefinition = TextEditor.compose<FoundationElementDefinition>({
	baseName: 'text-editor',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const textEditorRegistries = [textEditorDefinition()];

/**
 * Registers the divider elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextEditor = registerFactory(textEditorRegistries);
