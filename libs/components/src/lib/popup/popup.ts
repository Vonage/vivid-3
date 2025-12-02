import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import {
	arrow,
	autoPlacement,
	autoUpdate,
	computePosition,
	flip,
	hide,
	inline,
	offset,
	shift,
	size,
} from '@floating-ui/dom';
import type { Placement, Strategy } from '@floating-ui/dom';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

export const PlacementStrategy = {
	Flip: 'flip',
	AutoPlacementHorizontal: 'auto-placement-horizontal',
	AutoPlacementVertical: 'auto-placement-vertical',
} as const;
type PlacementStrategyId =
	(typeof PlacementStrategy)[keyof typeof PlacementStrategy];
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
 * @component popup
 * @slot - Default slot.
 */
export class Popup extends VividElement {
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
			shift(),
		];
		let offsetValue = this.offset ?? 0;
		if (this.arrow) {
			offsetValue += 12;
			middleware = [
				...middleware,
				arrow({ element: this.arrowEl, padding: 10 }),
			];
		}
		if (offsetValue > 0) {
			middleware.unshift(offset(offsetValue));
		}
		return middleware;
	}

	#cleanup?: () => void; // cleans the autoupdate

	popupEl!: HTMLElement;

	/**
	 * @internal
	 */
	controlEl!: HTMLElement;

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
		this.#togglePopover();
		this.#updateAutoUpdate();
		this.$emit(newValue ? 'vwc-popup:open' : 'vwc-popup:close');
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
	 * The strategy of the popup
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr({ mode: 'fromView' }) strategy?: Strategy = 'fixed';

	/**
	 * Adds offset to the popup
	 *
	 * @public
	 * HTML Attribute: offset
	 */
	@attr({ attribute: 'offset', converter: nullableNumberConverter })
	offset: number | null = null;

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

	/**
	 * @internal
	 */
	strategyChanged() {
		this.#togglePopover();
	}

	override connectedCallback() {
		super.connectedCallback();
		this.#togglePopover();
		this.#updateAutoUpdate();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#updateAutoUpdate();
	}

	#updateAutoUpdate() {
		this.#cleanup?.();

		if (this.open && this.controlEl) {
			// Ensure open is synced with the control element so that popup can be measured
			// Otherwise, position will not be computed correctly
			this.controlEl.classList.add('open');
		}

		if (this.anchorEl && this.open && this.popupEl) {
			this.#cleanup = autoUpdate(
				this.anchorEl,
				this.popupEl,
				this.#autoUpdateCallback,
				{
					animationFrame: this.animationFrame,
				}
			);
		}
	}

	#togglePopover() {
		if (this.popupEl && this.strategy === 'fixed') {
			if (this.open) {
				this.popupEl.showPopover();
			} else {
				this.popupEl.hidePopover();
			}
		}
	}

	#lastPositionUpdate?: Promise<void>;
	#autoUpdateCallback = () => {
		this.#lastPositionUpdate = this.updatePosition();
		return this.#lastPositionUpdate;
	};

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

	/**
	 * Shows the popup.
	 * Unlike toggling the `open` attribute, show() will wait for the popup to become visible and positioned correctly.
	 */
	show(): Promise<void> {
		this.open = true;
		return this.#lastPositionUpdate ?? Promise.resolve();
	}

	hide(): void {
		this.open = false;
	}
}
