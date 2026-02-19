import { html, observable, volatile } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import {
	defineVividComponent,
	type VividElementDefinitionContext,
} from '../../shared/design-system/defineVividComponent';
import { PlacementStrategy, Popup } from '../popup/popup';
import { popupDefinition } from '../popup/definition';

const Kind = {
	default: {
		placement: undefined,
		placementStrategy: PlacementStrategy.AutoPlacementHorizontal,
		strategy: 'absolute',
	},
	autocomplete: {
		placement: 'bottom-start',
		placementStrategy: PlacementStrategy.Flip,
		strategy: 'fixed',
	},
} as const;

const popoverTemplate = (context: VividElementDefinitionContext) => {
	const popup = context.tagFor(Popup);
	return html<Popover>`<${popup}
		:anchor="${(x) => x.anchorEl}"
		:placement="${(x) => Kind[x.kind].placement}"
		:placementStrategy="${(x) => Kind[x.kind].placementStrategy}"
		:open="${(x) => x.open}"
		:offset="${(x) => x.offset}"
		:strategy="${(x) => Kind[x.kind].strategy}"
		exportparts="vvd-theme-alternate"
	>
		<slot></slot>
	</${popup}>`;
};

export class Popover extends VividElement {
	static setBlockPopover(onElement: HTMLElement, block: boolean) {
		onElement.dataset.blockPopover = block ? 'true' : 'false';
		const event = new CustomEvent('block-popover-changed', {
			bubbles: false,
			composed: false,
		});
		onElement.dispatchEvent(event);
	}

	@observable kind: 'default' | 'autocomplete' = 'default';

	@observable offset?: number;

	@observable anchorBlocksPopover = false;
	onAnchorBlockPopoverChanged = () => {
		this.anchorBlocksPopover =
			this.anchorEl?.dataset.blockPopover === 'true' || false;
	};

	@observable anchorEl?: HTMLElement;
	anchorElChanged(prev?: HTMLElement, next?: HTMLElement) {
		prev?.removeEventListener(
			'block-popover-changed',
			this.onAnchorBlockPopoverChanged
		);
		next?.addEventListener(
			'block-popover-changed',
			this.onAnchorBlockPopoverChanged
		);
		this.onAnchorBlockPopoverChanged();
	}

	@observable anchorId?: string;
	anchorIdChanged() {
		this.updateAnchor();
	}

	updateAnchor() {
		if (this.anchorId && this.isConnected) {
			this.anchorEl =
				(this.getRootNode() as ShadowRoot).getElementById(this.anchorId) ||
				undefined;
		} else {
			this.anchorEl = undefined;
		}
	}

	@observable requestedOpenState = false;
	requestOpenState(open: boolean) {
		this.requestedOpenState = open;
	}

	@volatile get open() {
		return (
			this.requestedOpenState && !!this.anchorEl && !this.anchorBlocksPopover
		);
	}

	#observer?: MutationObserver;

	override connectedCallback() {
		super.connectedCallback();
		this.updateAnchor();
		this.#observer = new MutationObserver((records) => {
			if (
				records.some((r) =>
					Array.from(r.addedNodes).some(
						(n) => n instanceof HTMLElement && n.id === this.anchorId
					)
				)
			) {
				this.updateAnchor();
			}
		});
		this.#observer.observe(this.getRootNode(), {
			childList: true,
			subtree: true,
		});
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#observer!.disconnect();
	}
}

export const popoverDefinition = defineVividComponent(
	'rich-text-editor-popover',
	Popover,
	popoverTemplate,
	[popupDefinition],
	{}
);
