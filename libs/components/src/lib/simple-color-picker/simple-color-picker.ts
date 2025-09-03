import { attr, DOM, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { Placement } from '@floating-ui/dom';
import { Anchored } from '../../shared/patterns/anchored';
import { FormElement, Localized } from '../../shared/patterns';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import {
	applyContrastClass,
	type ColorSwatch,
	colorSwatchesConverter,
} from '../../shared/color-picker';

/**
 * @public
 * @component simple-color-picker
 * @slot anchor - Slot for attaching the toggle button
 * @event {CustomEvent<undefined>} change - Fires when the value changes
 */
export class SimpleColorPicker extends Localized(
	Anchored(FormElement(FormAssociated(VividElement)))
) {
	/**
	 * @internal
	 */
	override proxy = document.createElement('input');

	/**
	 * Unique ID for this component instance
	 * @internal
	 */
	_popupId = uniqueId('color-picker-');

	/**
	 * The current selected color value
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ attribute: 'value' })
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	override value = '';

	/**
	 * @internal
	 */
	override valueChanged() {
		this.$emit('change');
	}

	/**
	 * Indicates whether the popup is open
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 * @internal
	 */
	openChanged(): void {
		this.#updateListeners();

		if (this._anchorEl) {
			this.#updateAnchor(this._anchorEl);

			if (this.open) {
				this._anchorEl.tabIndex = -1;
			} else {
				this._anchorEl.tabIndex = 0;
			}
		}

		if (this.open && this._openedViaKeyboard) {
			requestAnimationFrame(() => {
				const selectedIndex = this.swatches.findIndex(
					(swatch) => swatch.value === this.value
				);
				const targetIndex = selectedIndex >= 0 ? selectedIndex : 0;
				this.#focusSwatchByIndex(targetIndex);
			});
		}

		if (!this.open) {
			this._openedViaKeyboard = false;
		}
	}

	/**
	 * Placement of the popup with color swatches
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'top-start';

	/**
	 * Default offset of the popup
	 *
	 * @public
	 * HTML Attribute: offset
	 */
	@attr({
		attribute: 'offset',
		converter: nullableNumberConverter,
		mode: 'fromView',
	})
	offset: number = 4;

	/**
	 * List of color swatches as JSON string
	 * Can be either:
	 * - Array of strings: '["#ff0000", "#00ff00", "#0000ff"]'
	 * - Array of objects: '[{"label": "Red", "value": "#ff0000"}, {"value": "#00ff00"}]'
	 * @public
	 * @remarks
	 * HTML Attribute: swatches
	 */
	@attr({
		attribute: 'swatches',
		converter: colorSwatchesConverter,
		mode: 'fromView',
	})
	swatches: ColorSwatch[] = [];

	swatchesChanged() {
		this._swatchElements = undefined;
		setTimeout(() => this.#applyContrastClasses(), 100);
	}

	/**
	 * Number of swatches per row for grid layout
	 * @public
	 * @remarks
	 * HTML Attribute: swatches-per-row
	 */
	@attr({
		attribute: 'swatches-per-row',
		mode: 'fromView',
		converter: nullableNumberConverter,
	})
	swatchesPerRow: number = 7;

	/**
	 * Cache DOM querying of the swatch elements
	 * @internal
	 */
	private _swatchElements?: NodeListOf<HTMLElement>;

	/**
	 * @internal
	 */
	private get swatchElements(): NodeListOf<HTMLElement> | undefined {
		if (!this._swatchElements) {
			this._swatchElements =
				this.shadowRoot?.querySelectorAll('[role="gridcell"]');
		}
		return this._swatchElements;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#updateListeners();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#updateListeners();
	}

	/**
	 * @internal
	 */
	#updateListeners() {
		document.removeEventListener('click', this.#closeOnClickOutside);
		document.removeEventListener('keydown', this.#closeOnEscape);
		if (this.open && this.isConnected) {
			document.addEventListener('click', this.#closeOnClickOutside);
			document.addEventListener('keydown', this.#closeOnEscape);
		}
	}

	/**
	 * Track if popup was opened via keyboard for proper focus management
	 * @internal
	 */
	_openedViaKeyboard = false;

	/**
	 * @internal
	 */
	#applyContrastClasses() {
		this.swatchElements?.forEach((swatch) => {
			applyContrastClass(swatch as HTMLElement);
		});
	}

	/**
	 * @internal
	 */
	_anchorElChanged(oldValue?: HTMLElement, newValue?: HTMLElement): void {
		if (oldValue) this.#cleanupAnchor(oldValue);
		if (newValue) this.#setupAnchor(newValue);
	}

	/**
	 * @internal
	 */
	#updateAnchor(a: HTMLElement) {
		a.setAttribute('aria-expanded', this.open.toString());
		a.setAttribute('data-expanded', this.open.toString());
	}

	/**
	 * @internal
	 */
	#setupAnchor(a: HTMLElement) {
		a.addEventListener('click', this.#openPopup, true);
		a.addEventListener('keydown', this.#handleAnchorKeydown);
		this.#updateAnchor(a);
		a.setAttribute('aria-controls', this._popupId);
		a.setAttribute('aria-haspopup', 'true');
	}

	/**
	 * @internal
	 */
	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#openPopup, true);
		a.removeEventListener('keydown', this.#handleAnchorKeydown);
		a.removeAttribute('aria-expanded');
		a.removeAttribute('data-expanded');
		a.removeAttribute('aria-controls');
		a.removeAttribute('aria-haspopup');
	}

	/**
	 * @internal
	 */
	#openPopup = () => {
		// DOM.queueUpdate() prevents click event from being caught by document listener
		if (!this.open) DOM.queueUpdate(() => (this.open = true));
	};

	/**
	 * @internal
	 */
	#handleAnchorKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			if (!this.open) {
				this._openedViaKeyboard = true;
				DOM.queueUpdate(() => (this.open = true));
			}
			event.preventDefault();
		}
	};

	/**
	 * @internal
	 */
	#closeOnClickOutside = (e: Event) => {
		const clickedOutside = !this.contains(e.target as Node);
		const clickedOnAnchor = this._anchorEl?.contains(e.target as Node);
		if (clickedOutside || clickedOnAnchor) this.open = false;
	};

	/**
	 * @internal
	 */
	#closeOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.open = false;
		}
	};

	/**
	 * @internal
	 */
	_handleSwatchSelection = (swatch: ColorSwatch) => {
		this.value = swatch.value;
		this.open = false;
	};

	/**
	 * @internal
	 */
	_handleSwatchKeydown = (
		event: KeyboardEvent,
		swatch: ColorSwatch,
		index: number
	) => {
		const rowLength = this.swatchesPerRow;
		const totalCells = this.swatches.length;
		const currentRow = Math.floor(index / rowLength);
		const currentCol = index % rowLength;
		const totalRows = Math.ceil(totalCells / rowLength);

		let handled = true;

		switch (event.key) {
			case 'ArrowRight':
				if (currentCol < rowLength - 1 && index + 1 < totalCells) {
					this.#focusSwatchByIndex(index + 1);
				}
				break;

			case 'ArrowLeft':
				if (currentCol > 0) {
					this.#focusSwatchByIndex(index - 1);
				}
				break;

			case 'ArrowDown':
				if (currentRow < totalRows - 1 && index + rowLength < totalCells) {
					this.#focusSwatchByIndex(index + rowLength);
				}
				break;

			case 'ArrowUp':
				if (currentRow > 0) {
					this.#focusSwatchByIndex(index - rowLength);
				}
				break;

			case 'PageDown': {
				const lastRowStart = (totalRows - 1) * rowLength;
				const targetIndex = Math.min(lastRowStart + currentCol, totalCells - 1);
				if (index !== targetIndex) {
					this.#focusSwatchByIndex(targetIndex);
				}
				break;
			}

			case 'PageUp': {
				const targetIndex = Math.min(currentCol, totalCells - 1);
				if (index !== targetIndex) {
					this.#focusSwatchByIndex(targetIndex);
				}
				break;
			}

			case 'Home':
				if (event.ctrlKey) {
					this.#focusSwatchByIndex(0);
				} else {
					this.#focusSwatchByIndex(currentRow * rowLength);
				}
				break;

			case 'End':
				if (event.ctrlKey) {
					this.#focusSwatchByIndex(totalCells - 1);
				} else {
					const rowEnd = Math.min(
						(currentRow + 1) * rowLength - 1,
						totalCells - 1
					);
					this.#focusSwatchByIndex(rowEnd);
				}
				break;

			case 'Enter':
			case ' ':
				this._handleSwatchSelection(swatch);
				this.#returnFocusToAnchor();
				break;

			case 'Escape':
				this.open = false;
				this.#returnFocusToAnchor();
				break;

			case 'Tab':
				this.open = false;
				this.#returnFocusToAnchor();
				handled = false;
				break;

			default:
				handled = false;
				break;
		}

		if (handled) {
			event.preventDefault();
		}
	};

	/**
	 * @internal
	 */
	#focusSwatchByIndex(index: number) {
		if (index < 0 || index >= this.swatches.length) return;
		const element = this.swatchElements?.[index] as HTMLElement;
		element?.focus();
	}

	/**
	 * @internal
	 */
	#returnFocusToAnchor() {
		DOM.queueUpdate(() => this._anchorEl?.focus());
	}
}
