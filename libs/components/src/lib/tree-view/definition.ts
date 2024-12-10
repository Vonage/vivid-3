import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { treeItemDefinition } from '../tree-item/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './tree-view.scss?inline';
import { TreeView } from './tree-view';
import { TreeViewTemplate as template } from './tree-view.template';

/**
 * @internal
 */
export const treeViewDefinition = defineVividComponent(
	'tree-view',
	TreeView,
	template,
	[treeItemDefinition],
	{
		styles,
	}
);

/**
 * Registers the tree-view element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTreeView = createRegisterFunction(treeViewDefinition);
