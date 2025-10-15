import {
	attr,
	html,
	InlineTemplateDirective,
	observable,
	Updates,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { FormElement, Localized } from '../patterns';
import { FormAssociated } from '../foundation/form-associated/form-associated';
import { getContrastRatio, getCSSCustomProperty } from './utils';
import type { ColorSwatch } from './types';

/**
 * Base mixin for Color Picker components
 */
export const BaseColorPicker = <T extends Constructor<VividElement>>(
	Base: T
) => {
	class BaseColorPickerElement extends Localized(
		FormElement(FormAssociated(Base))
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

		override connectedCallback(): void {
			super.connectedCallback();
			this._refreshCanvasColor();
		}

		/**
		 * @internal
		 */
		_canvasColor: string = '';

		/**
		 * @internal
		 */
		_refreshCanvasColor() {
			this._canvasColor = getCSSCustomProperty('--vvd-color-canvas', this);
		}

		/**
		 * @internal
		 */
		_applyContrastClass(color: string, threshold = 3): boolean {
			if (!color || !this._canvasColor) return false;
			const ratio = getContrastRatio(color, this._canvasColor);
			return ratio < threshold;
		}

		/**
		 * @internal
		 */
		_getRowLength(): number {
			return 7;
		}

		/**
		 * @internal
		 */
		_handleSwatchSelection(value: string) {
			if (this.value === value) {
				this.value = '';
			} else {
				this.value = value;
			}
			this.$emit('change');
			this.open = false;
		}

		/**
		 * @internal
		 */
		_handleColorSaving(): void {}

		/**
		 * @internal
		 */
		_getFocusReturnEl(): HTMLElement | null {
			return null;
		}

		/**
		 * @internal
		 */
		_returnFocusToAnchor() {
			const el = this._getFocusReturnEl();
			if (!el) return;
			Updates.enqueue(() => el.focus());
		}

		/**
		 * @internal
		 */
		_getGridCells(): HTMLElement[] {
			const grid = this.shadowRoot?.querySelector<HTMLElement>('[role="grid"]');
			return grid
				? Array.from(
						grid.querySelectorAll<HTMLElement>(
							'[role="gridcell"], [data-vvd-role="gridcell"]'
						)
				  )
				: [];
		}

		/**
		 * @internal
		 */
		_handleCellKeydown(
			event: KeyboardEvent,
			value: string,
			index: number,
			isSaveCell?: boolean
		): boolean {
			const rowLength = this._getRowLength();
			const totalCells = this._getGridCells().length;
			const currentRow = Math.floor(index / rowLength);
			const currentCol = index % rowLength;
			const totalRows = Math.ceil(totalCells / rowLength);

			switch (event.key) {
				case 'ArrowRight':
					if (currentCol < rowLength - 1 && index + 1 < totalCells) {
						this._focusSwatchByIndex(index + 1);
					}
					return false;

				case 'ArrowLeft':
					if (currentCol > 0) {
						this._focusSwatchByIndex(index - 1);
					}
					return false;

				case 'ArrowDown':
					if (currentRow < totalRows - 1 && index + rowLength < totalCells) {
						this._focusSwatchByIndex(index + rowLength);
					}
					return false;

				case 'ArrowUp':
					if (currentRow > 0) {
						this._focusSwatchByIndex(index - rowLength);
					}
					return false;

				case 'PageDown': {
					const lastRowStart = (totalRows - 1) * rowLength;
					const targetIndex = Math.min(
						lastRowStart + currentCol,
						totalCells - 1
					);
					if (index !== targetIndex) {
						this._focusSwatchByIndex(targetIndex);
					}
					return false;
				}

				case 'PageUp': {
					const targetIndex = Math.min(currentCol, totalCells - 1);
					if (index !== targetIndex) {
						this._focusSwatchByIndex(targetIndex);
					}
					return false;
				}

				case 'Home':
					if (event.ctrlKey) {
						this._focusSwatchByIndex(0);
					} else {
						this._focusSwatchByIndex(currentRow * rowLength);
					}
					return false;

				case 'End':
					if (event.ctrlKey) {
						this._focusSwatchByIndex(totalCells - 1);
					} else {
						const rowEnd = Math.min(
							(currentRow + 1) * rowLength - 1,
							totalCells - 1
						);
						this._focusSwatchByIndex(rowEnd);
					}
					return false;

				case 'Enter':
				case ' ':
					if (isSaveCell) {
						this._handleColorSaving();
					}
					if (value && !isSaveCell) {
						this._handleSwatchSelection(value);
						this._returnFocusToAnchor();
					}
					return false;

				case 'Escape':
					this.open = false;
					this._returnFocusToAnchor();
					return false;

				case 'Tab':
					this.open = false;
					return true;

				default:
					return true;
			}
		}

		/**
		 * @internal
		 */
		_focusSwatchByIndex(index: number) {
			const cells = this._getGridCells();
			if (index < 0 || index >= cells.length) return;
			cells[index]?.focus();
		}

		/**
		 * @internal
		 */
		_renderColorSwatch(iconTag: InlineTemplateDirective) {
			return html<ColorSwatch>`
				<button
					class="swatch ${(x, c) =>
						classNames(
							c.parent.value === x.value ? 'selected' : '',
							c.parent._applyContrastClass(x.value) ? 'contrast' : ''
						)}"
					role="gridcell"
					style="--swatch-color: ${(x) => x.value};"
					tabindex="${(x, c) => (c.index === 0 ? '0' : '-1')}"
					aria-label="${(x, c) =>
						c.parent.locale.baseColorPicker.colorSwatchLabel(
							x.value,
							x.label,
							c.parent.value === x.value
						)}"
					@click="${(x, c) => c.parent._handleSwatchSelection(x.value)}"
					@keydown="${(x, c) =>
						c.parent._handleCellKeydown(
							c.event as KeyboardEvent,
							x.value,
							c.index
						)}"
				>
					${when(
						(x, c) => c.parent.value === x.value,
						html`<${iconTag} size="-6" name="check-solid" aria-hidden="true"></${iconTag}>`
					)}
				</button>
			`;
		}
	}

	return BaseColorPickerElement;
};

export type BaseColorPickerElement = MixinType<typeof BaseColorPicker>;
