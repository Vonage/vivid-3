import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import styles from './note.scss';

import { Note } from './note';
import { NoteTemplate as template } from './note.template';


/**
 * The note element.
 *
 * @internal
 */
export const note = Note.compose<FoundationElementDefinition>({
	baseName: 'note',
	template: template as any,
	styles,
})();

export const noteElements = [note, ...iconElements];

/**
 * Registers the note elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNote = registerFactorial(noteElements);
