import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './note.scss';

import { Note } from './note';
import { NoteTemplate as template } from './note.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['icon'], prefix);

export const vividNote = Note.compose<FoundationElementDefinition>({
	baseName: 'note',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividNote());
