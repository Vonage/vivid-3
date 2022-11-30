import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
//TODO::remove next line when removing the dialog polyfill
import dialogPolyfillStyles from 'dialog-polyfill/dist/dialog-polyfill.css';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './dialog.scss';
import { Dialog } from './dialog';
import { DialogTemplate as template } from './dialog.template';

const prefix = getPrefix(import.meta.url);

export const vividDialog = Dialog.compose<FoundationElementDefinition>({
	baseName: 'dialog',
	template: template as any,
	styles: [styles, dialogPolyfillStyles],
});

(async () => {
	await loadComponentsModules(['icon', 'button', 'elevation'], prefix);
	designSystem.withPrefix(prefix).register(vividDialog());
})();
