import { attr, observable, volatile } from '@microsoft/fast-element';
import { applyMixins, Slider as FastSlider } from '@microsoft/fast-foundation';
import { limit } from '@microsoft/fast-web-utilities';
import type { Connotation } from '../enums';
import { Localized } from '../../shared/patterns';

export type SliderConnotation = Connotation.Accent | Connotation.CTA;

/**
 * @public
 * @component slider
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the slider value changes
 * @vueModel modelValue current-value change `(event.target as HTMLInputElement).value`
 */
export class Slider extends FastSlider {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
	@attr({ attribute: 'aria-valuetext' }) ariaValuetext: string | null = null;
	/**
	 * Display markers on/off
	 *
	 * @public
	 * HTML Attribute: markers
	 */
	@attr({
		mode: 'boolean',
	})
	markers = false;

	/**
	 * Show current value on the thumb.
	 *
	 * @public
	 * HTML Attribute: pin
	 */
	@attr({ mode: 'boolean' }) pin = false;

	/**
	 * slider connotation
	 *
	 * @public
	 */
	@attr connotation?: SliderConnotation;

	/**
	 * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
	 *
	 * @public
	 */
	@observable override valueTextFormatter: (value: string) => string = (
		value
	) => parseFloat(value).toLocaleString(this.locale.lang);

	/**
	 * TO BE REMOVED WHEN UPGRADING TO FAST-FOUNDATION 3
	 *
	 * @internal
	 */
	override valueChanged(previous: string, next: string): void {
		if (this.$fastController.isConnected) {
			// min/max constraints backported from v3
			const nextAsNumber = parseFloat(next);
			const value = limit(
				this.min,
				this.max,
				this['convertToConstrainedValue'](nextAsNumber)
			).toString();

			if (value !== next) {
				this.value = value;
				return;
			}
			// v2 super will still do setThumbPositionForOrientation and emit change
			super.valueChanged(previous, value);
		}
	}

	/**
	 * @internal
	 */
	@observable _focusVisible = false;

	/**
	 * @internal
	 */
	@observable _hoveringOnThumb = false;

	/**
	 * @internal
	 */
	@volatile
	get _isThumbPopupOpen() {
		return this._focusVisible || this._hoveringOnThumb || this.isDragging;
	}

	#isNonVisibleFocus = false;

	constructor() {
		super();

		const fastSliderInternals = this as any;

		const originalHandleMouseDown = fastSliderInternals.handleMouseDown;
		fastSliderInternals.handleMouseDown = (e: MouseEvent) => {
			this.#isNonVisibleFocus = true;
			originalHandleMouseDown(e);
			this.#isNonVisibleFocus = false;
			if (e === null || (!this.disabled && !this.readOnly)) {
				this.isDragging = true;
			}
		};

		const originalHandleThumbMouseDown =
			fastSliderInternals.handleThumbMouseDown;
		fastSliderInternals.handleThumbMouseDown = (e: MouseEvent) => {
			this.#isNonVisibleFocus = true;
			originalHandleThumbMouseDown(e);
			this.#isNonVisibleFocus = false;
		};

		const originalKeypressHandler = fastSliderInternals.keypressHandler;
		fastSliderInternals.keypressHandler = (e: KeyboardEvent) => {
			this._focusVisible = true;
			originalKeypressHandler(e);
		};
	}

	override connectedCallback() {
		super.connectedCallback();
		this.#registerThumbListeners();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#unregisterThumbListeners();
	}

	#registerThumbListeners() {
		this.thumb.addEventListener('mouseover', this.#onMouseOver, {
			passive: true,
		});
		this.thumb.addEventListener('mouseout', this.#onMouseOut, {
			passive: true,
		});
	}

	#unregisterThumbListeners() {
		this.thumb.removeEventListener('mouseover', this.#onMouseOver);
		this.thumb.removeEventListener('mouseout', this.#onMouseOut);
	}

	/**
	 * @internal
	 */
	_onFocusIn = () => {
		if (!this.#isNonVisibleFocus) {
			this._focusVisible = true;
		}
	};

	/**
	 * @internal
	 */
	_onFocusOut = () => {
		this._focusVisible = false;
	};

	#onMouseOver = () => {
		this._hoveringOnThumb = true;
	};

	#onMouseOut = () => {
		this._hoveringOnThumb = false;
	};
}

export interface Slider extends Localized {}
applyMixins(Slider, Localized);
