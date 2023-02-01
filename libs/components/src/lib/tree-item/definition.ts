import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './tree-item.scss';

import { TreeItem } from './tree-item';
import { TreeItemTemplate as template } from './tree-item.template';
import { iconRegistries } from '../components';
import { focusRegistries } from '../focus/definition';

export const treeItemDefinition = TreeItem.compose<FoundationElementDefinition>(
	{
		baseName: 'tree-item',
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
export const treeItemRegistries = [treeItemDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the tree-item element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTreeItem = registerFactory(treeItemRegistries);
