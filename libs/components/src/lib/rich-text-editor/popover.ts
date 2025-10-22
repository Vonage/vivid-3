import { html, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import {
	defineVividComponent,
	type VividElementDefinitionContext,
} from '../../shared/design-system/defineVividComponent';
import { PlacementStrategy, Popup } from '../popup/popup';
import { popupDefinition } from '../popup/definition';

const popoverTemplate = (context: VividElementDefinitionContext) => {
	const popup = context.tagFor(Popup);
	return html`<${popup}
			:anchor="${(x) => x.anchorEl}"
			:placementStrategy="${() => PlacementStrategy.AutoPlacementHorizontal}"
			:open="${(x) => x.open}"
			exportparts="vvd-theme-alternate"
		>
			<slot></slot>
		</${popup}>`;
};

export class Popover extends VividElement {
	@observable open = false;
	@observable anchorEl?: HTMLElement;
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
	'popover',
	Popover,
	popoverTemplate,
	[popupDefinition],
	{}
);
