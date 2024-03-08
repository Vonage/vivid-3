import { attr, DOM, html, observable, slotted } from '@microsoft/fast-element';

type AnchorType = string | HTMLElement;

export interface Anchored {
	anchor?: AnchorType;
	_slottedAnchor?: HTMLElement | null;
	_anchorEl?: HTMLElement | null;
}

/**
 * Mixin for elements that are anchored to another element.
 * The anchor can be specified either through the anchor slot or by using the anchor prop with an ID or direct reference.
 * The resolved anchor element is available as `_anchorEl` while the element is connected.
 */
export function anchored<
	T extends { new (...args: any[]): Record<string, any> }
>(constructor: T) {
	class Decorated extends constructor {
		/**
		 * ID or direct reference to the component's anchor element.
		 *
		 * @public
		 * HTML Attribute: anchor
		 */
		@attr anchor?: AnchorType;
		/**
		 * @internal
		 */
		anchorChanged() {
			this.#updateAnchorEl();
		}

		/**
		 * @internal
		 */
		@observable _slottedAnchor?: HTMLElement[];
		/**
		 * @internal
		 */
		_slottedAnchorChanged() {
			const isOccupied = Boolean(
				this._slottedAnchor && this._slottedAnchor.length > 0
			);
			DOM.setBooleanAttribute(
				this as unknown as HTMLElement,
				'slotted-anchor',
				isOccupied
			);
			this.#updateAnchorEl();
		}

		/**
		 * The resolved anchor element. Only set while the element is connected.
		 *
		 * @internal
		 */
		@observable _anchorEl?: HTMLElement | undefined;

		#updateAnchorEl = () => {
			if (!(this as unknown as HTMLElement).isConnected) {
				this._anchorEl = undefined;
				return;
			}

			this.#cleanupObserverIfNeeded();

			let newAnchor: HTMLElement | undefined = undefined;
			if (this._slottedAnchor && this._slottedAnchor.length > 0) {
				newAnchor = this._slottedAnchor[0];
			} else if (this.anchor instanceof HTMLElement) {
				newAnchor = this.anchor;
			} else if (typeof this.anchor === 'string') {
				newAnchor = document.getElementById(this.anchor) ?? undefined;
				if (!newAnchor) {
					this.#observeMissingAnchor(this.anchor);
				}
			}

			this._anchorEl = newAnchor;
		};

		#observer?: MutationObserver;
		#observeMissingAnchor = (anchorId: string) => {
			this.#observer = new MutationObserver(() => {
				const anchor = document.getElementById(anchorId as string);
				if (anchor) {
					this._anchorEl = anchor;
					this.#cleanupObserverIfNeeded();
				}
			});
			this.#observer.observe(document.body, { childList: true, subtree: true });
		};
		#cleanupObserverIfNeeded = () => {
			this.#observer?.disconnect();
			this.#observer = undefined;
		};

		connectedCallback() {
			super.connectedCallback();
			this.#updateAnchorEl();
		}

		disconnectedCallback() {
			super.disconnectedCallback();
			this.#cleanupObserverIfNeeded();
			this._anchorEl = undefined;
		}
	}

	return Decorated;
}

export const anchorSlotTemplateFactory = () =>
	html<Anchored>`<slot name="anchor" ${slotted('_slottedAnchor')}></slot>`;
