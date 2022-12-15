import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
//TODO::remove next line when removing the dialog polyfill
import dialogPolyfillStyles from 'dialog-polyfill/dist/dialog-polyfill.css';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { buttonElements } from '../button/definition';
import { elevationElements } from '../elevation/definition';
import styles from './dialog.scss';
import { Dialog } from './dialog';
import { DialogTemplate as template } from './dialog.template';


/**
 * The dialog element.
 *
 * @internal
 */
export const dialogDefinition = Dialog.compose<FoundationElementDefinition>({
	baseName: 'dialog',
	template: template as any,
	styles: [styles, dialogPolyfillStyles],
});

export const dialogRegistries = [dialog(), ...iconRegistries, ...buttonRegistries, ...elevationRegistries];

/**
 * Registers the dialog elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDialog = registerFactory(dialogRegistries);
