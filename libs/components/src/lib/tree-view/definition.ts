import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './tree-view.scss';

import { TreeView } from './tree-view';
import { TreeViewTemplate as template } from './tree-view.template';
import { treeItemRegistries } from '../tree-item/definition';
import { focusRegistries } from '../focus/definition';

export const treeViewDefinition = TreeView.compose<FoundationElementDefinition>(
	{
		baseName: 'tree-view',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * @internal
 */
export const treeViewRegistries = [treeViewDefinition(), ...treeItemRegistries, ...focusRegistries];

/**
 * Registers the tree-view element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTreeView = registerFactory(treeViewRegistries);
