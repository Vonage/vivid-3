import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './note.scss?inline';
import { Note } from './note';
import { NoteTemplate as template } from './note.template';

export type { NoteConnotation } from './note';

/**
 * @internal
 */
export const noteDefinition = defineVividComponent(
	'note',
	Note,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the note elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNote = createRegisterFunction(noteDefinition);
