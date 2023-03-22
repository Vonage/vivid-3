import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import styles from './note.scss';

import { Note } from './note';
import { NoteTemplate as template } from './note.template';

export type { NoteConnotation } from './note';

/**
 * The note element.
 */
export const noteDefinition = Note.compose<FoundationElementDefinition>({
	baseName: 'note',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const noteRegistries = [noteDefinition(), ...iconRegistries];

/**
 * Registers the note elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNote = registerFactory(noteRegistries);
