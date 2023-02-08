import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { actionGroupRegistries } from '../action-group/definition';
import styles from './toolbar.scss';

import { Toolbar } from './toolbar';
import { ToolbarTemplate as template } from './toolbar.template';

export const toolbarDefinition = Toolbar.compose<FoundationElementDefinition>({
	baseName: 'toolbar',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const toolbarRegistries = [toolbarDefinition(), ...actionGroupRegistries];

/**
 * Registers the toolbar element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerToolbar = registerFactory(toolbarRegistries);
