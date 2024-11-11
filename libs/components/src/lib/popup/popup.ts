import { attr, DOM, observable } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import {
	arrow,
	autoPlacement,
	autoUpdate,
	computePosition,
	flip,
	hide,
	inline,
	offset,
	size,
} from '@floating-ui/dom';
import type { Placement, Strategy } from '@floating-ui/dom';

export const PlacementStrategy = {
	Flip: 'flip',
	AutoPlacementHorizontal: 'auto-placement-horizontal',
	AutoPlacementVertical: 'auto-placement-vertical',
} as const;
type PlacementStrategyId =
	typeof PlacementStrategy[keyof typeof PlacementStrategy];
const placementStrategyMiddlewares = {
	[PlacementStrategy.Flip]: flip(),
	[PlacementStrategy.AutoPlacementHorizontal]: autoPlacement({
		allowedPlacements: [
			'bottom',
			'top',
			'bottom-start',
			'bottom-end',
			'top-start',
			'top-end',
		],
	}),
	[PlacementStrategy.AutoPlacementVertical]: autoPlacement({
		allowedPlacements: [
			'left',
			'right',
			'left-start',
			'left-end',
			'right-start',
			'right-end',
		],
	}),
} as const;

/**
 * @public
 * @component popup
 * @slot - Default slot.
 * @internal
 */
export class Popup extends FoundationElement {
	get #middleware(): Array<any> {
		let middleware = [
			inline(),
			placementStrategyMiddlewares[this.placementStrategy],
			hide(),
			size({
				apply({ availableWidth, availableHeight, elements }) {
					Object.assign(elements.floating.style, {
						maxWidth: `${availableWidth}px`,
						maxHeight: `${availableHeight}px`,
					});
				},
			}),
		];
		if (this.arrow) {
			middleware = [
				offset(12),
				...middleware,
				arrow({ element: this.arrowEl, padding: 10 }),
			];
		}
		return middleware;
	}

	#cleanup?: () => void; // cleans the autoupdate

	popupEl!: HTMLElement;

	arrowEl!: HTMLElement;

	/**
	 * indicates whether the popup is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	})
	open = false;
	openChanged(_: boolean, newValue: boolean): void {
		newValue ? this.$emit('vwc-popup:open') : this.$emit('vwc-popup:close');
		DOM.queueUpdate(() => this.#updateAutoUpdate());
	}

	/**
	 * adds close button to the popup
	 *
	 * @public
	 * HTML Attribute: dismissible
	 */
	@attr({
		mode: 'boolean',
	})
	dismissible = false;

	/**
	 * adds small triangle to indicate the trigger element
	 *
	 * @public
	 * HTML Attribute: arrow
	 */
	@attr({
		mode: 'boolean',
	})
	arrow = false;

	/**
	 * set the color-scheme to dark
	 *
	 * @public
	 * HTML Attribute: alternate
	 */
	@attr({
		mode: 'boolean',
	})
	alternate = false;

	/**
	 * the placement of the popup
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement;

	/**
	 * The placement strategy of the popup.
	 *
	 * @public
	 */
	placementStrategy: PlacementStrategyId = PlacementStrategy.Flip;

	/**
	 * Whether to update the position of the floating element on every animation frame if required.
	 *
	 * @public
	 * HTML Attribute: animation-frame
	 */
	@attr({ mode: 'boolean', attribute: 'animation-frame' }) animationFrame =
		false;

	/**
	 * @internal
	 */
	animationFrameChanged() {
		this.#updateAutoUpdate();
	}

	/**
	 * the strategy of the popup
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr({ mode: 'fromView' }) strategy?: Strategy = 'fixed';

	/**
	 * The element to anchor the popup to.
	 *
	 * @public
	 */
	@observable anchor?: HTMLElement;

	/**
	 * @internal
	 */
	anchorChanged() {
		this.#updateAutoUpdate();
	}

	override connectedCallback() {
		super.connectedCallback();
		this.#updateAutoUpdate();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#updateAutoUpdate();
	}

	#updateAutoUpdate() {
		this.#cleanup?.();
		if (this.anchorEl && this.open && this.popupEl) {
			this.#cleanup = autoUpdate(
				this.anchorEl,
				this.popupEl,
				() => this.updatePosition(),
				{
					animationFrame: this.animationFrame,
				}
			);
			if (this.strategy === 'fixed') {
				this.popupEl.showPopover();
			}
		}
		// this is needed for menu that is open and no anchor
		if (this.open && this.popupEl && this.strategy === 'fixed') {
			this.popupEl.showPopover();
		}
	}

	/**
	 * Updates popup's position
	 *
	 * @public
	 */
	async updatePosition() {
		if (!this.open || !this.anchorEl) {
			return;
		}

		const positionData = await computePosition(this.anchorEl, this.popupEl, {
			placement: this.placement,
			strategy: this.strategy,
			middleware: this.#middleware,
		});
		this.#assignPopupPosition(positionData);
		if (this.arrow) {
			this.#assignArrowPosition(positionData);
		}
	}

	#assignPopupPosition(data: any): void {
		const { x: popupX, y: popupY } = data;
		const { referenceHidden } = data.middlewareData.hide;
		Object.assign(this.popupEl.style, {
			left: `${popupX}px`,
			top: `${popupY}px`,
			visibility: referenceHidden ? 'hidden' : 'visible',
		});
	}

	#assignArrowPosition(data: any): void {
		const { x: arrowX, y: arrowY } = data.middlewareData.arrow;
		const styles = {
			left: 'calc(100% - 4px)',
			right: '-4px',
			top: 'calc(100% - 4px)',
			bottom: '-4px',
		};
		const staticAxis = data.placement.split('-')[0] as keyof typeof styles;

		Object.assign(this.arrowEl.style, {
			left: arrowX ? `${arrowX}px` : styles[staticAxis],
			top: arrowY ? `${arrowY}px` : styles[staticAxis],
		});
	}

	get anchorEl(): HTMLElement | null {
		return this.anchor ?? null;
	}

	show(): void {
		this.open = true;
	}

	hide(): void {
		this.open = false;
	}
}
