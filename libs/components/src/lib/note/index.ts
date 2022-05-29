import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './note.scss';

import { Note } from './note';
import { NoteTemplate as template } from './note.template';

export const vividNote = Note.compose<FoundationElementDefinition>({
	baseName: 'note',
	template: template as any,
	styles,
});

designSystem.register(vividNote());
