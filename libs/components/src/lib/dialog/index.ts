import '../icon';
import '../button';
import '../elevation';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
//TODO::remove next line when removing the dialog polyfill
import { designSystem } from '../../shared/design-system';
import dialogPolyfillStyles from 'dialog-polyfill/dist/dialog-polyfill.css';
import styles from './dialog.scss';
import { Dialog } from './dialog';
import { DialogTemplate as template } from './dialog.template';

export const vividDialog = Dialog.compose<FoundationElementDefinition>({
	baseName: 'dialog',
	template: template as any,
	styles: [styles, dialogPolyfillStyles],
});

designSystem.register(vividDialog());
