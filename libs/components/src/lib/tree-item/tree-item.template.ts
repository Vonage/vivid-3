import {
	children,
	elements,
	html,
	ref,
	slotted,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { TreeItem } from './tree-item';
import { applyHostSemantics } from '../../shared/aria/host-semantics';

const getClasses = ({ disabled, selected }: TreeItem) =>
	classNames(
		'control',
		['disabled', disabled],
		['selected', Boolean(selected)]
	);

export const expandCollapseButton = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);

	return html<TreeItem>`
	<div aria-hidden="true"
		class="expandCollapseButton"
		@click="${(x, c) => x.handleExpandCollapseButtonClick(c.event as MouseEvent)}"
			${ref('expandCollapseButton')}
	>
		<${iconTag} class="expandCollapseIcon" name="${(x) =>
		x.expanded ? 'chevron-down-line' : 'chevron-right-line'}"></${iconTag}>
	</div>`;
};

export const TreeItemTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<TreeItem>` <template
		slot="${(x) => (x.isNestedItem() ? 'item' : void 0)}"
		tabindex="-1"
		${applyHostSemantics({
			role: 'treeitem',
			ariaExpanded: (x) =>
				x.childItems && x.childItems.length > 0 ? x.expanded : void 0,
			ariaSelected: (x) => x.selected,
			ariaDisabled: (x) => x.disabled,
		})}
		@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
		@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
		${children({
			property: 'childItems',
			filter: elements(context.tagFor(TreeItem)),
		})}
	>
		<div class="${getClasses}">
			${when(
				(x) => x.childItems && x.childItems.length > 0,
				expandCollapseButton(context)
			)}
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			${(x) => x.text as string}
		</div>
		${when(
			(x) => x.childItems && x.childItems.length > 0 && x.expanded,
			html<TreeItem>` <div role="group" class="items">
				<slot name="item" ${slotted('items')}></slot>
			</div>`
		)}
	</template>`;
};
