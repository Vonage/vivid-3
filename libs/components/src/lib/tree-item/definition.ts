import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './tree-item.scss?inline';
import { TreeItem } from './tree-item';
import { TreeItemTemplate as template } from './tree-item.template';

/**
 * @internal
 */
export const treeItemDefinition = defineVividComponent(
	'tree-item',
	TreeItem,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the tree-item element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTreeItem = createRegisterFunction(treeItemDefinition);
