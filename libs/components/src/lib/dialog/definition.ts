import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
//TODO::remove next line when removing the dialog polyfill
import dialogPolyfillStyles from 'dialog-polyfill/dist/dialog-polyfill.css?inline';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { buttonRegistries } from '../button/definition';
import { elevationRegistries } from '../elevation/definition';
import styles from './dialog.scss?inline';
import { Dialog, isDialogSupported } from './dialog';
import { DialogTemplate as template } from './dialog.template';

export type { IconPlacement } from './dialog';

/**
 * The dialog element.
 *
 * @internal
 */
/* istanbul ignore next */
export const dialogDefinition = Dialog.compose<FoundationElementDefinition>({
	baseName: 'dialog',
	template: template as any,
	styles: isDialogSupported ? [styles] : [styles, dialogPolyfillStyles],
});

/**
 * @internal
 */
export const dialogRegistries = [
	dialogDefinition(),
	...iconRegistries,
	...buttonRegistries,
	...elevationRegistries,
];

/**
 * Registers the dialog elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDialog = registerFactory(dialogRegistries);
