import {
	attr,
	DOM,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';
import { Anchored } from '../../shared/patterns/anchored';
import { FormElement, Localized } from '../../shared/patterns';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import {
	applyContrastClass,
	type ColorSwatch,
} from '../../shared/color-picker';

/**
 * @public
 * @component simple-color-picker
 * @slot anchor - Slot for attaching the toggle button
 * @event {CustomEvent<undefined>} change - Fires when the value changes
 * @vueModel modelValue value input `event.currentTarget.value`
 */
export class SimpleColorPicker extends Localized(
	Anchored(FormElement(FormAssociated(VividElement)))
) {
	/**
	 * @internal
	 */
	override proxy = document.createElement('input');

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
		}

		if (this.open) {
			requestAnimationFrame(() => {
				const selectedIndex = this.swatches.findIndex(
					(swatch) => swatch.value === this.value
				);
				const targetIndex = selectedIndex >= 0 ? selectedIndex : 0;
				this.#focusSwatchByIndex(targetIndex);
			});
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
	 * List of color swatches, has to be an array of objects
	 *
	 * @public
	 * @example
	 * colorPicker.swatches = [
	 *   { value: '#ff0000', label: 'Red' },
	 *   { value: '#00ff00', label: 'Green' }
	 * ];
	 */
	@observable
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
		this.#updateAnchor(a);
		a.addEventListener('click', this.#openPopup, true);
		a.addEventListener('keydown', this.#handleAnchorKeydown);
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
		if (this.value === swatch.value) {
			this.value = '';
		} else {
			this.value = swatch.value;
		}
		this.$emit('change');
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

		switch (event.key) {
			case 'ArrowRight':
				if (currentCol < rowLength - 1 && index + 1 < totalCells) {
					this.#focusSwatchByIndex(index + 1);
				}
				return false;

			case 'ArrowLeft':
				if (currentCol > 0) {
					this.#focusSwatchByIndex(index - 1);
				}
				return false;

			case 'ArrowDown':
				if (currentRow < totalRows - 1 && index + rowLength < totalCells) {
					this.#focusSwatchByIndex(index + rowLength);
				}
				return false;

			case 'ArrowUp':
				if (currentRow > 0) {
					this.#focusSwatchByIndex(index - rowLength);
				}
				return false;

			case 'PageDown': {
				const lastRowStart = (totalRows - 1) * rowLength;
				const targetIndex = Math.min(lastRowStart + currentCol, totalCells - 1);
				if (index !== targetIndex) {
					this.#focusSwatchByIndex(targetIndex);
				}
				return false;
			}

			case 'PageUp': {
				const targetIndex = Math.min(currentCol, totalCells - 1);
				if (index !== targetIndex) {
					this.#focusSwatchByIndex(targetIndex);
				}
				return false;
			}

			case 'Home':
				if (event.ctrlKey) {
					this.#focusSwatchByIndex(0);
				} else {
					this.#focusSwatchByIndex(currentRow * rowLength);
				}
				return false;

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
				return false;

			case 'Enter':
			case ' ':
				this._handleSwatchSelection(swatch);
				this.#returnFocusToAnchor();
				return false;

			case 'Escape':
				this.open = false;
				this.#returnFocusToAnchor();
				return false;

			case 'Tab':
				this.open = false;
				return true;

			default:
				return true;
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
