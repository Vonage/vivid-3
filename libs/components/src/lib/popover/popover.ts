import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import {
	arrow,
	autoUpdate,
	computePosition,
	type ComputePositionReturn,
	flip,
	hide,
	inline,
	type Middleware,
	offset,
	type Placement,
	shift,
} from '@floating-ui/dom';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Localized } from '../../shared/patterns';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

/**
 * @public
 * @component popover
 * @slot - Default slot for the popover content.
 * @slot anchor - Slot for the trigger element.
 * @slot footer - Use the footer slot in order to add action buttons or other contents to the bottom of the dialog.
 * @event {CustomEvent} open - Fired when the popover opens.
 * @event {CustomEvent} close - Fired when the popover closes.
 */
export class Popover extends Localized(DelegatesAria(VividElement)) {
	/**
	 * @internal
	 */
	popoverEl!: HTMLElement;

	/**
	 * @internal
	 */
	arrowEl?: HTMLElement;

	/**
	 * The placement of the popover relative to the anchor.
	 * @public
	 */
	@attr({ mode: 'fromView' }) placement: Placement = 'bottom';
	placementChanged() {
		this.#updateAutoUpdate();
	}

	/**
	 * If true, the popover uses manual dismissal (no light-dismiss).
	 * Adds a close button to the UI.
	 * @public
	 */
	@attr({ mode: 'boolean' }) manual = false;

	/**
	 * Setting to true applies condensed layout with smaller paddings and gaps.
	 * @public
	 */
	@attr({ mode: 'boolean' }) condensed = false;

	/**
	 * Sets the offset between popover and the anchor element.
	 * @public
	 * HTML Attribute: offset
	 */
	@attr({
		attribute: 'offset',
		mode: 'fromView',
		converter: nullableNumberConverter,
	})
	offset: number | null = 8;

	/**
	 * Sets the color-scheme to alternate (dark/light)
	 * @public
	 * HTML Attribute: alternate
	 */
	@attr({
		mode: 'boolean',
	})
	alternate = false;

	/**
	 * Overrides the default Dismiss button's aria-label.
	 * @public
	 */
	@attr({ attribute: 'dismiss-button-aria-label' }) dismissButtonAriaLabel:
		| string
		| null = null;

	/**
	 * Whether to render the arrow tip.
	 * @public
	 */
	@attr({ mode: 'boolean' }) arrow = false;
	arrowChanged() {
		this.#updateAutoUpdate();
	}

	/**
	 * Indicates if the popover is currently open.
	 * Can be set declaratively to open/close the popover.
	 * Automatically updates when the user dismisses the popover.
	 * @public
	 */
	@attr({ mode: 'boolean' }) open = false;
	openChanged(_oldValue: boolean, newValue: boolean) {
		if (!this.popoverEl) return;

		const isOpen = this.popoverEl.matches(':popover-open');
		if (newValue && !isOpen) {
			this.popoverEl.showPopover();
		} else if (!newValue && isOpen) {
			this.popoverEl.hidePopover();
		}

		this.#updateAutoUpdate();
	}

	// --- Anchoring Logic ---
	/**
	 * Direct reference to the popover's anchor element.
	 * Setting this overrides the slotted anchor.
	 * @public
	 */
	@observable anchor?: HTMLElement;
	anchorChanged() {
		this.#updateAnchor();
	}

	/**
	 * Internal reference to the slotted anchor element.
	 * @internal
	 */
	@observable _slottedAnchor?: HTMLElement[];
	_slottedAnchorChanged() {
		this.#updateAnchor();
	}

	/**
	 * @internal
	 */
	#currentAnchor: HTMLElement | null = null;

	/**
	 * @internal
	 */
	#updateAnchor() {
		if (!this.popoverEl) return;
		const newAnchor = this.anchor || this._slottedAnchor?.[0] || null;

		if (this.#currentAnchor === newAnchor) return;
		if (this.#currentAnchor) {
			this.#unbindTrigger(this.#currentAnchor);
		}

		this.#currentAnchor = newAnchor;

		if (this.#currentAnchor && this.popoverEl) {
			this.#bindTrigger(this.#currentAnchor);
			this.#updateAutoUpdate();
		}
	}

	/**
	 * @internal
	 */
	#bindTrigger(anchor: HTMLElement) {
		anchor.setAttribute('aria-haspopup', 'dialog');

		if (
			anchor instanceof HTMLButtonElement ||
			anchor instanceof HTMLInputElement
		) {
			anchor.popoverTargetElement = this.popoverEl;
		} else {
			anchor.addEventListener('click', this.#manualToggle);
		}
	}

	/**
	 * @internal
	 */
	#unbindTrigger(anchor: HTMLElement) {
		anchor.removeAttribute('aria-haspopup');

		if (
			anchor instanceof HTMLButtonElement ||
			anchor instanceof HTMLInputElement
		) {
			anchor.popoverTargetElement = null;
		} else {
			anchor.removeEventListener('click', this.#manualToggle);
		}
	}

	/**
	 * @internal
	 */
	#manualToggle = () => {
		this.popoverEl.togglePopover();
	};

	// --- Floating UI Logic ---
	get #middleware(): Middleware[] {
		let middleware = [inline(), flip(), shift(), hide()];

		let offsetValue = this.offset ?? 0;
		if (this.arrow && this.arrowEl) {
			offsetValue = 12;
			middleware = [
				...middleware,
				arrow({ element: this.arrowEl, padding: 10 }),
			];
		}

		/* v8 ignore else -- @preserve */
		if (offsetValue > 0) {
			middleware.unshift(offset(offsetValue));
		}

		return middleware;
	}

	#cleanup?: () => void;

	#updateAutoUpdate() {
		this.#cleanup?.();

		if (this.open && this.#currentAnchor && this.popoverEl) {
			this.#cleanup = autoUpdate(
				this.#currentAnchor,
				this.popoverEl,
				this.#autoUpdateCallback
			);
		}
	}

	/**
	 * Tracks the promise of the last position update.
	 * @internal
	 */
	#lastPositionUpdate?: Promise<void>;

	#autoUpdateCallback = () => {
		this.#lastPositionUpdate = this.updatePosition();
	};

	/**
	 * Updates the position of the popover
	 * @public
	 */
	async updatePosition() {
		/* v8 ignore if -- @preserve */
		if (!this.open || !this.#currentAnchor || !this.popoverEl) return;

		const positionData = await computePosition(
			this.#currentAnchor,
			this.popoverEl,
			{
				placement: this.placement,
				strategy: 'fixed',
				middleware: this.#middleware,
			}
		);
		/* v8 ignore if -- @preserve */
		if (!this.open) return;

		this.#assignPopoverPosition(positionData);

		if (this.arrow && this.arrowEl) {
			this.#assignArrowPosition(positionData);
		}
	}

	#assignPopoverPosition(data: ComputePositionReturn) {
		const { x, y } = data;
		Object.assign(this.popoverEl.style, {
			left: `${x}px`,
			top: `${y}px`,
			visibility: data.middlewareData.hide?.referenceHidden
				? 'hidden'
				: 'visible',
		});
	}

	#assignArrowPosition(data: ComputePositionReturn) {
		/* v8 ignore if -- @preserve */
		if (!this.arrowEl) return;
		const { x: arrowX, y: arrowY } = data.middlewareData.arrow!;
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

	// --- Lifecycle & Events ---
	/**
	 * Syncs native toggle state (Esc key, light dismiss) back to the 'open' attribute.
	 * @internal
	 */
	#handleNativeToggle = (e: ToggleEvent) => {
		const isOpen = e.newState
			? e.newState === 'open'
			: this.popoverEl.matches(':popover-open');

		if (this.open !== isOpen) {
			this.open = isOpen;
		}

		this.$emit(isOpen ? 'open' : 'close');
	};

	override connectedCallback() {
		super.connectedCallback();
		this.#updateAnchor();

		/* v8 ignore else -- @preserve */
		if (this.popoverEl) {
			this.popoverEl.addEventListener('toggle', this.#handleNativeToggle);

			if (this.open && !this.popoverEl.matches(':popover-open')) {
				this.popoverEl.showPopover();
				this.#updateAutoUpdate();
			}
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#cleanup?.();
		if (this.#currentAnchor) {
			this.#unbindTrigger(this.#currentAnchor);
			this.#currentAnchor = null;
		}
		/* v8 ignore else -- @preserve */
		if (this.popoverEl) {
			this.popoverEl.removeEventListener('toggle', this.#handleNativeToggle);
		}
	}

	// --- Methods ---
	show(): Promise<void> {
		this.open = true;
		return this.#lastPositionUpdate ?? Promise.resolve();
	}
	hide(): void {
		this.open = false;
	}
	toggle(): void {
		this.open = !this.open;
	}
}
