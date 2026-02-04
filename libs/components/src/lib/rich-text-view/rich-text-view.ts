import { ElementStyles, observable } from '@microsoft/fast-element';
import {
	DOMSerializer,
	Mark as PMMark,
	Node as PMNode,
} from 'prosemirror-model';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { RteView } from '../rich-text-editor/rte/view';
import { impl } from '../rich-text-editor/rte/utils/impl';
import { sortedContributions } from '../rich-text-editor/rte/feature';
import type { RteTextNode } from '../rich-text-editor/rte/document';
import {
	dispatchSlottableRequest,
	removeSymbol,
} from '../../shared/utils/slottable-request';

export type RteChildSlotProps = { view: RteView };

/**
 * @public
 * @component rich-text-view
 * @dynamicSlot `RteChildSlotProps` child - Used for custom rendered children.
 */
export class RichTextView extends VividElement {
	/**
	 * The view to display, created from the RteConfig.
	 *
	 * @public
	 */
	@observable view?: RteView;

	/**
	 * @internal
	 */
	viewChanged(oldView?: RteView, newView?: RteView) {
		if (oldView) {
			this._removeStyles();
		}

		if (newView) {
			this._addStyles(newView);
		}

		this._updateView();
	}

	private _styles?: ElementStyles;

	private _addStyles(view: RteView) {
		const config = view[impl].config[impl];
		this._styles = new ElementStyles(
			sortedContributions(config.features.flatMap((f) => f.getStyles()))
		);
		this._styles.addStylesTo(this.shadowRoot!);
	}

	private _removeStyles() {
		if (this._styles) {
			this._styles.removeStylesFrom(this.shadowRoot!);
			this._styles = undefined;
		}
	}

	private _slotCounter = 0;
	private _slottedChildren = new Set<HTMLElement>();
	private _slotRequests = new Set<string>();

	private _cleanupLightDom() {
		for (const el of this._slottedChildren) {
			this.removeChild(el);
		}
		for (const slotName of this._slotRequests) {
			dispatchSlottableRequest(this, 'child', slotName, removeSymbol);
		}
		this._slottedChildren.clear();
		this._slotRequests.clear();
		this._slotCounter = 0;
	}

	private _updateView() {
		if (!this._contentElement) {
			return;
		}

		this._contentElement.innerHTML = '';
		this._cleanupLightDom();

		if (this.view) {
			this._contentElement.appendChild(this._renderView(this.view));
		}
	}

	/**
	 * @internal
	 */
	_contentElement: HTMLDivElement | null = null;

	private _renderView(rteView: RteView): Node {
		const ctx = rteView[impl];

		// Doc nodes do not render to anything
		if (rteView.type === 'node' && rteView.node.type === 'doc') {
			rteView = rteView.children;
		}

		if (rteView.type === 'fragment') {
			const frag = document.createDocumentFragment();
			for (const child of rteView.content) {
				frag.appendChild(this._renderView(child));
			}
			return frag;
		}

		const customRenderedView = ctx.options.renderChildView?.(rteView) ?? false;

		if (customRenderedView) {
			return this._handleCustomRender(rteView, customRenderedView);
		} else {
			return this._renderDefault(rteView);
		}
	}

	private _handleCustomRender(
		rteView: RteView & { type: 'node' | 'mark' },
		customResult: true | { dom: HTMLElement; contentDom?: HTMLElement }
	): Node {
		// Custom rendered content will be in light DOM rendered via slot
		const slotName = `child-view-${this._slotCounter++}`;
		const slot = document.createElement('slot');
		slot.setAttribute('name', slotName);

		if (customResult === true) {
			this._slotRequests.add(slotName);
			dispatchSlottableRequest(this, 'child', slotName, {
				view: rteView,
			});
		} else {
			const { dom, contentDom = dom } = customResult;

			// Child content will be rendered via nested RichTextView
			const nestedView = document.createElement(this.tagName) as RichTextView;
			nestedView.view = rteView.children;
			contentDom.appendChild(nestedView);

			dom.setAttribute('slot', slotName);
			this.appendChild(dom);
			this._slottedChildren.add(dom);
		}
		return slot;
	}

	private _renderDefault(view: RteView & { type: 'node' | 'mark' }): Node {
		const ctx = view[impl];
		const config = ctx.config[impl];
		const schema = config.schema;

		if (view.type === 'node' && view.node.type === 'text') {
			return document.createTextNode((view.node as RteTextNode).text);
		}

		const item = view.type === 'node' ? view.node : view.mark;
		const pmItem =
			view.type === 'node'
				? PMNode.fromJSON(schema, item)
				: PMMark.fromJSON(schema, item);

		// Use ProseMirror DOMSerializer to render like in the editor
		const spec =
			pmItem instanceof PMNode
				? pmItem.type.spec.toDOM!(pmItem)
				: pmItem.type.spec.toDOM!(pmItem, true);
		const { dom, contentDOM = dom } = DOMSerializer.renderSpec(document, spec);

		// Render children into contentDOM
		const childrenRendered = this._renderView(view.children);
		contentDOM.appendChild(childrenRendered);

		return dom;
	}

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();
		this._updateView();
	}

	/**
	 * @internal
	 */
	override disconnectedCallback() {
		super.disconnectedCallback();
		this._removeStyles();
		this._cleanupLightDom();
	}
}
