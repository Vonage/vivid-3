import { html, ref, slotted } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TreeView } from './tree-view';
import { applyHostSemantics } from '../../shared/aria/host-semantics';

const getClasses = (_: TreeView) => classNames('control');

export const TreeViewTemplate = html<TreeView>` <template
	${ref('treeView')}
	${applyHostSemantics({
		role: 'tree',
	})}
	@keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
	@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
	@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
	@click="${(x, c) => x.handleClick(c.event as MouseEvent)}"
	@selected-change="${(x, c) => x.handleSelectedChange(c.event)}"
>
	<div class="${getClasses}">
		<slot ${slotted('slottedTreeItems')}></slot>
	</div>
</template>`;
