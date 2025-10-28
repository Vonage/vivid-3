import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import { HexColorPicker } from 'vanilla-colorful/hex-color-picker.js';
import { HexInput } from 'vanilla-colorful/hex-input.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { WithFeedback } from '../../shared/feedback/mixins';
import type { TextField } from '../text-field/text-field';
import type { Popup } from '../popup/popup';
import {
	BaseColorPicker,
	type ColorSwatch,
	isValidHexColor,
} from '../../shared/color-picker';
import {
	TrappedFocus,
	WithContextualHelp,
	WithErrorText,
	WithSuccessText,
} from '../../shared/patterns';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';

const VC_HEX_PICKER_TAG = 'vvd-hex-picker';
const VC_HEX_INPUT_TAG = 'vvd-hex-input';

class VvdHexPicker extends HexColorPicker {
	static readonly displayName = 'VvdHexPicker';
}
class VvdHexInput extends HexInput {
	static readonly displayName = 'VvdHexInput';
}

if (!customElements.get(VC_HEX_PICKER_TAG)) {
	customElements.define(VC_HEX_PICKER_TAG, VvdHexPicker);
}
if (!customElements.get(VC_HEX_INPUT_TAG)) {
	customElements.define(VC_HEX_INPUT_TAG, VvdHexInput);
}

export const vcPickerTag = VC_HEX_PICKER_TAG;
export const vcInputTag = VC_HEX_INPUT_TAG;

/**
 * @public
 * @component color-picker
 * @slot helper-text - Describes how to use the text-field. Alternative to the `helper-text` attribute.
 * @slot popup-text - Overrides the default "Color Picker" title of the Popup window.
 * @slot swatches-text -  Overrides the default "Saved colors:" text above color swatches.
 * @event {CustomEvent<undefined>} change - Fires when the value changes
 * @vueModel modelValue value input `event.currentTarget.value`
 */
export class ColorPicker extends WithContextualHelp(
	WithFeedback(
		WithErrorText(
			WithSuccessText(
				DelegatesAria(TrappedFocus(BaseColorPicker(VividElement)))
			)
		)
	)
) {
	/**
	 * Regular expression pattern for valid hex colors (with # prefix)
	 * Matches both 3-digit (#abc) and 6-digit (#aabbcc) hex colors
	 * @internal
	 */
	static readonly HEX_COLOR_PATTERN =
		/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/;

	/**
	 * Sets the placeholder value of the element, generally used to provide a hint to the user.
	 * @public
	 * @remarks
	 * HTML Attribute: placeholder
	 */
	@attr placeholder!: string;

	/**
	 * @internal
	 */
	placeholderChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.placeholder = this.placeholder;
		}
	}

	/**
	 * Change event handler for inner control.
	 * @remarks
	 * @internal
	 */
	handleChange(): void {
		this.$emit('change');
	}

	/**
	 * Sets the localStorage saved colors key explicitly.
	 * @public
	 * @remarks
	 * HTML Attribute: saved-colors-key
	 */
	@attr({ attribute: 'saved-colors-key' })
	savedColorsKey?: string;

	/**
	 * @internal
	 */
	savedColorsKeyChanged() {
		this.savedColors = this._loadSavedColors();
	}

	/**
	 * @internal
	 */
	get _savedColorsStorageKey(): string {
		if (this.savedColorsKey) return this.savedColorsKey;
		const tag = this.tagName.toLowerCase();
		return `vvd-saved-colors:${tag}`;
	}

	/**
	 * Disables the saving colors functionality
	 * @public
	 * @remarks
	 * HTML Attribute: disable-saved-colors
	 */
	@attr({
		mode: 'boolean',
		attribute: 'disable-saved-colors',
	})
	disableSavedColors = false;

	/**
	 * @internal
	 */
	@observable savedColors: ColorSwatch[] = [];

	/**
	 * @internal
	 */
	override _handleColorSaving() {
		this._saveCurrentColor();
	}

	/**
	 * Limits number of swatches that can be saved.
	 * @public
	 * @remarks
	 * HTML Attribute: max-swatches
	 */
	@attr({
		attribute: 'max-swatches',
		mode: 'fromView',
		converter: nullableNumberConverter,
	})
	maxSwatches: number = 6;

	/**
	 * @internal
	 */
	get _maxSwatchesNormalized(): number {
		return Number.isFinite(this.maxSwatches)
			? Math.max(0, Math.floor(this.maxSwatches))
			: 0;
	}

	/**
	 * @internal
	 */
	maxSwatchesChanged() {
		const maxCount = this._maxSwatchesNormalized;
		if (this.savedColors?.length > maxCount) {
			this.savedColors = this.savedColors.slice(0, maxCount);
			this._setSavedColors(this.savedColors);
		}
	}

	/**
	 * @internal
	 */
	_vcHexPickerEl!: HexColorPicker;

	/**
	 * @internal
	 */
	_vcHexInputEl!: HexInput;

	/**
	 * @internal
	 */
	_onPickerColorChanged(e: CustomEvent<{ value: string }>) {
		if (typeof e.detail?.value === 'string') {
			this.value = e.detail?.value;
		}
	}

	/**
	 * @internal
	 */
	override valueChanged(_oldVal?: string, newVal?: string) {
		if (this._vcHexPickerEl && typeof newVal === 'string') {
			this._vcHexPickerEl.color = newVal;
		}
		if (this._vcHexInputEl && typeof newVal === 'string') {
			this._vcHexInputEl.color = newVal;
		}
	}

	/**
	 * @internal
	 */
	_textFieldEl!: TextField;

	/**
	 * @internal
	 */
	_onTextFieldInput(event: Event) {
		const textField = event.currentTarget as TextField;
		this.value = textField.value;
	}

	/**
	 * @internal
	 */
	_buttonEl!: HTMLButtonElement;

	/**
	 * @internal
	 */
	get _buttonColor(): string {
		if (!this._canvasColor) {
			this._refreshCanvasColor();
		}
		if (this.value && isValidHexColor(this.value)) {
			return this.value;
		}
		return 'var(--vvd-color-canvas-text)';
	}

	/**
	 * @internal
	 */
	_onButtonClick() {
		this.open = !this.open;
	}

	/**
	 * @internal
	 */
	_popupEl!: Popup;

	/**
	 * @internal
	 */
	_handleCloseRequest() {
		this.open = false;
	}

	/**
	 * @internal
	 */
	private _isInPath(e: Event, el?: EventTarget | null): boolean {
		if (!el) return false;
		const path = (e as any).composedPath?.() as EventTarget[] | undefined;
		return !!(path && path.includes(el));
	}

	/**
	 * @internal
	 */
	@observable copyIconName = 'copy-2-line';
	#iconResetTimer: ReturnType<typeof setTimeout> | null = null;

	/**
	 * @internal
	 */
	_setTemporaryCopyIcon(name: string, ms = 2000) {
		this.copyIconName = name;
		if (this.#iconResetTimer) clearTimeout(this.#iconResetTimer);
		this.#iconResetTimer = setTimeout(() => {
			this.copyIconName = 'copy-2-line';
			this.#iconResetTimer = null;
		}, ms);
	}

	/**
	 * @internal
	 */
	_copyValueToClipboard = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			this._setTemporaryCopyIcon('check-circle-line');
		} catch {
			alert(this.locale?.colorPicker?.copyErrorText);
			this._setTemporaryCopyIcon('error-line');
		}
	};

	override connectedCallback(): void {
		super.connectedCallback();
		this._refreshCanvasColor();
		this.savedColors = this._loadSavedColors();
		document.addEventListener('mousedown', this.#closeOnPointerOutside, true);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		document.removeEventListener(
			'mousedown',
			this.#closeOnPointerOutside,
			true
		);
	}

	/**
	 * @internal
	 */
	#closeOnPointerOutside = (e: Event) => {
		if (this._isInPath(e, this._buttonEl) || this._isInPath(e, this._popupEl)) {
			return;
		}
		this.open = false;
	};

	/**
	 * @internal
	 */
	_saveCurrentColor() {
		const value = this.value;
		if (typeof value !== 'string' || !isValidHexColor(value)) return;

		const swatches = Array.isArray(this.savedColors)
			? [...this.savedColors]
			: [];
		const idx = swatches.findIndex((s) => s?.value === value);

		if (idx !== -1) swatches.splice(idx, 1);
		swatches.unshift({ value });

		this.savedColors = swatches.slice(0, this._maxSwatchesNormalized);
		this._setSavedColors(this.savedColors);
	}

	/**
	 * @internal
	 */
	_loadSavedColors(): ColorSwatch[] {
		try {
			const savedColors = localStorage.getItem(this._savedColorsStorageKey);
			if (!savedColors) return [];
			const parsed = JSON.parse(savedColors);
			if (!Array.isArray(parsed)) return [];
			return parsed
				.filter(
					(x) => x && typeof x.value === 'string' && isValidHexColor(x.value)
				)
				.map((x) => ({
					value: x.value,
					label: typeof x.label === 'string' ? x.label : undefined,
				}));
		} catch {
			return [];
		}
	}

	/**
	 * @internal
	 */
	_setSavedColors(swatches: ColorSwatch[]) {
		try {
			localStorage.setItem(
				this._savedColorsStorageKey,
				JSON.stringify(swatches)
			);
		} catch {
			// ignore storage failures
		}
	}

	/**
	 * Get all color swatches combined, both from swatches property and saved colors
	 * @internal
	 */
	get allSwatches(): ColorSwatch[] {
		const predefinedColors = Array.isArray(this.swatches) ? this.swatches : [];
		const savedColors = Array.isArray(this.savedColors) ? this.savedColors : [];

		const seen = new Set<string>();
		const merged: ColorSwatch[] = [];

		const appendIfUniqueAndValid = (swatch?: ColorSwatch) => {
			if (!swatch || typeof swatch.value !== 'string') return;
			if (!isValidHexColor(swatch.value) || seen.has(swatch.value)) return;
			seen.add(swatch.value);
			merged.push(swatch);
		};

		if (!this.disableSavedColors) {
			savedColors.forEach(appendIfUniqueAndValid);
		}
		predefinedColors.forEach(appendIfUniqueAndValid);

		return merged.slice(0, this._maxSwatchesNormalized);
	}

	/**
	 * @internal
	 */
	_onBaseKeydown(event: KeyboardEvent) {
		if (this.open && handleEscapeKeyAndStopPropogation(event)) {
			this.open = false;
			return false;
		}

		if (this._trappedFocus(event, () => this._focusableElsWithinDialog())) {
			return false;
		}

		return true;
	}

	/**
	 * @internal
	 */
	_focusableElsWithinDialog(): NodeListOf<HTMLElement> {
		return this._popupEl.querySelectorAll(
			'button:not([role="gridcell"]), [data-vvd-component="button"], vwc-button:not([role="gridcell"])'
		);
	}

	/**
	 * @internal
	 */
	override _handleCellKeydown(
		event: KeyboardEvent,
		value: string,
		index: number,
		isSaveCell?: boolean
	) {
		if (event.key === 'Tab') {
			event.preventDefault();
			const focusableEls = this._focusableElsWithinDialog();
			const idx = Array.prototype.indexOf.call(
				focusableEls,
				event.currentTarget as HTMLElement
			);

			const nextIdx = event.shiftKey
				? (idx - 1 + focusableEls.length) % focusableEls.length
				: (idx + 1) % focusableEls.length;

			focusableEls[nextIdx]?.focus();
			return false;
		}

		return super._handleCellKeydown(event, value, index, isSaveCell);
	}
}
