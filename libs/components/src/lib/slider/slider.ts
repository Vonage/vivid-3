import {
	attr,
	nullableNumberConverter,
	observable,
	volatile,
} from '@microsoft/fast-element';
import {
	Direction,
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
	limit,
	Orientation,
} from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import { getDirection } from '../../shared/foundation/utilities/direction';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import type { Connotation } from '../enums';
import { Localized } from '../../shared/patterns';
import {
	defaultToOneConverter,
	roundToStepValue,
} from '../range-slider/utils/roundToStepValue';
import { inverseLerp, lerp } from '../range-slider/utils/lerp';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { FormAssociatedSlider } from './slider.form-associated';

export type SliderConnotation = Connotation.Accent | Connotation.CTA;

/**
 * The selection modes of a Slider.
 * @public
 */
export const SliderMode = {
	singleValue: 'single-value',
} as const;

/**
 * The types for the selection mode of the slider
 * @public
 */
export type SliderMode = typeof SliderMode[keyof typeof SliderMode];

/**
 * @public
 * @component slider
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the slider value changes
 * @vueModel modelValue value change `(event.currentTarget as HTMLInputElement).value`
 */
export class Slider extends DelegatesAria(FormAssociatedSlider) {
	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly!: boolean; // Map to proxy element
	/**
	 * @internal
	 */
	readOnlyChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.readOnly = this.readOnly;
		}
	}

	/**
	 * @internal
	 */
	track!: HTMLDivElement;

	/**
	 * @internal
	 */
	thumb!: HTMLDivElement;

	/**
	 * @internal
	 */
	stepMultiplier!: number;

	/**
	 * @internal
	 */
	@observable
	direction: Direction = Direction.ltr;

	/**
	 * @internal
	 */
	@observable
	isDragging = false;

	/**
	 * @internal
	 */
	@observable
	position!: string;

	/**
	 * @internal
	 */
	@observable
	trackWidth = 0;

	/**
	 * @internal
	 */
	@observable
	trackMinWidth = 0;

	/**
	 * @internal
	 */
	@observable
	trackHeight = 0;

	/**
	 * @internal
	 */
	@observable
	trackLeft = 0;

	/**
	 * @internal
	 */
	@observable
	trackMinHeight = 0;

	/**
	 * The value property, typed as a number.
	 *
	 * @public
	 */
	get valueAsNumber(): number {
		return parseFloat(super.value);
	}

	set valueAsNumber(next: number) {
		this.value = next.toString();
	}

	/**
	 * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
	 *
	 * @public
	 */
	@observable valueTextFormatter: (value: string) => string = (value) =>
		parseFloat(value).toLocaleString(this.locale.lang);

	/**
	 * @internal
	 */
	override valueChanged(previous: string, next: string) {
		super.valueChanged(previous, next);

		if (this.$fastController.isConnected) {
			const nextAsNumber = parseFloat(next);
			const value = this.#roundToNearestStep(nextAsNumber).toString();

			if (value !== next) {
				this.value = value;
				return;
			}

			this.setThumbPositionForOrientation(this.direction);
			this.$emit('change');
		}
	}

	/**
	 * The minimum allowed value.
	 *
	 * @defaultValue - 0
	 * @public
	 * @remarks
	 * HTML Attribute: min
	 */
	@attr({ converter: nullableNumberConverter })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	min = 0; // Map to proxy element.
	/**
	 * @internal
	 */
	minChanged() {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.min = `${this.min}`;
		}

		this.validate();
	}

	/**
	 * The maximum allowed value.
	 *
	 * @defaultValue - 10
	 * @public
	 * @remarks
	 * HTML Attribute: max
	 */
	@attr({ converter: nullableNumberConverter })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	max = 10; // Map to proxy element.
	/**
	 * @internal
	 */
	maxChanged() {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.max = `${this.max}`;
		}
		this.validate();
	}

	/**
	 * Value to increment or decrement via arrow keys, mouse click or drag.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: step
	 */
	@attr({ converter: defaultToOneConverter })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	step = 1; // Map to proxy element.
	/**
	 * @internal
	 */
	stepChanged() {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.step = `${this.step}`;
		}

		this.updateStepMultiplier();
		this.validate();
	}

	/**
	 * The orientation of the slider.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	@attr
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	orientation: Orientation = Orientation.horizontal;
	/**
	 * @internal
	 */
	orientationChanged() {
		if (this.$fastController.isConnected) {
			this.setThumbPositionForOrientation(this.direction);
		}
	}

	/**
	 * The selection mode.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: mode
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr mode: SliderMode = SliderMode.singleValue;

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();

		this.proxy.setAttribute('type', 'range');

		this.direction = getDirection(this);
		this.updateStepMultiplier();
		this.setupTrackConstraints();
		this.setupListeners();
		this.setupDefaultValue();
		this.setThumbPositionForOrientation(this.direction);

		this.#registerThumbListeners();
	}

	/**
	 * @internal
	 */
	override disconnectedCallback() {
		this.setupListeners(true);
		this.#unregisterThumbListeners();
	}

	/**
	 * Increment the value by the step
	 *
	 * @public
	 */
	increment(): void {
		const newVal: number =
			this.direction !== Direction.rtl &&
			this.orientation !== Orientation.vertical
				? Number(this.value) + Number(this.step)
				: Number(this.value) - Number(this.step);
		this.value = this.#roundToNearestStep(newVal).toString();
	}

	/**
	 * Decrement the value by the step
	 *
	 * @public
	 */
	decrement(): void {
		const newVal =
			this.direction !== Direction.rtl &&
			this.orientation !== Orientation.vertical
				? Number(this.value) - Number(this.step)
				: Number(this.value) + Number(this.step);
		this.value = this.#roundToNearestStep(newVal).toString();
	}

	protected keypressHandler = (e: KeyboardEvent) => {
		this._focusVisible = true;

		if (this.readOnly) {
			return;
		}

		if (e.key === keyHome) {
			e.preventDefault();
			this.value = `${this.min}`;
		} else if (e.key === keyEnd) {
			e.preventDefault();
			this.value = `${this.max}`;
		} else if (!e.shiftKey) {
			switch (e.key) {
				case keyArrowRight:
				case keyArrowUp:
					e.preventDefault();
					this.increment();
					break;
				case keyArrowLeft:
				case keyArrowDown:
					e.preventDefault();
					this.decrement();
					break;
			}
		}
	};

	/**
	 * Places the thumb based on the current value
	 *
	 * @public
	 * @param direction - writing mode
	 */
	private setThumbPositionForOrientation(_: Direction): void {
		const percentage = this.#thumbTrackEndOffset(this.valueAsNumber);
		if (this.orientation === Orientation.horizontal) {
			this.position = this.isDragging
				? `right: ${percentage}%; transition: none;`
				: `right: ${percentage}%; transition: all 0.2s ease;`;
		} else {
			this.position = this.isDragging
				? `bottom: ${percentage}%; transition: none;`
				: `bottom: ${percentage}%; transition: all 0.2s ease;`;
		}
	}

	#thumbTrackEndOffset(value: number) {
		return (1 - inverseLerp(this.min, this.max, value)) * 100;
	}

	/**
	 * Update the step multiplier used to ensure rounding errors from steps that
	 * are not whole numbers
	 */
	private updateStepMultiplier(): void {
		const stepString: string = this.step + '';
		const decimalPlacesOfStep: number =
			this.step % 1 ? stepString.length - stepString.indexOf('.') - 1 : 0;
		this.stepMultiplier = Math.pow(10, decimalPlacesOfStep);
	}

	private setupTrackConstraints = (): void => {
		const clientRect: DOMRect = this.track.getBoundingClientRect();
		this.trackWidth = this.track.clientWidth;
		this.trackMinWidth = this.track.clientLeft;
		this.trackHeight = clientRect.bottom;
		this.trackMinHeight = clientRect.top;
		this.trackLeft = this.getBoundingClientRect().left;
		if (this.trackWidth === 0) {
			this.trackWidth = 1;
		}
	};

	private setupListeners = (remove = false): void => {
		const eventAction = remove ? 'removeEventListener' : 'addEventListener';
		this[eventAction]('keydown', this.keypressHandler as EventListener);
		this[eventAction]('mousedown', this.handleMouseDown as EventListener);
		this.thumb[eventAction](
			'mousedown',
			this.handleThumbMouseDown as EventListener,
			{
				passive: true,
			}
		);
		this.thumb[eventAction](
			'touchstart',
			this.handleThumbMouseDown as EventListener,
			{
				passive: true,
			}
		);
		// removes handlers attached by mousedown handlers
		if (remove) {
			this.handleMouseDown(null);
			this.handleThumbMouseDown(null);
		}
	};

	/**
	 * @internal
	 */
	override initialValue = '';

	private get midpoint(): string {
		return `${this.#roundToNearestStep((this.max + this.min) / 2)}`;
	}

	private setupDefaultValue(): void {
		if (typeof this.value === 'string') {
			if (this.value.length === 0) {
				this.initialValue = this.midpoint;
			} else {
				const value = parseFloat(this.value);

				if (!Number.isNaN(value) && (value < this.min || value > this.max)) {
					this.value = this.midpoint;
				}
			}
		}
	}

	/**
	 *  Handle mouse moves during a thumb drag operation
	 *  If the event handler is null it removes the events
	 */
	private handleThumbMouseDown = (event: MouseEvent | null): void => {
		if (event) {
			if (this.readOnly || this.disabled || event.defaultPrevented) {
				return;
			}
			this.#isNonVisibleFocus = true;
			(event.target as HTMLElement).focus();
			this.#isNonVisibleFocus = false;
		}
		const eventAction =
			event !== null ? 'addEventListener' : 'removeEventListener';
		window[eventAction]('mouseup', this.handleWindowMouseUp as EventListener);
		window[eventAction]('mousemove', this.handleMouseMove as EventListener, {
			passive: true,
		});
		window[eventAction]('touchmove', this.handleMouseMove as EventListener, {
			passive: true,
		});
		window[eventAction]('touchend', this.handleWindowMouseUp as EventListener);
		this.isDragging = event !== null;
	};

	/**
	 *  Handle mouse moves during a thumb drag operation
	 */
	private handleMouseMove = (e: MouseEvent | TouchEvent): void => {
		if (this.readOnly || this.disabled || e.defaultPrevented) {
			return;
		}

		// update the value based on current position
		const sourceEvent =
			'TouchEvent' in window && e instanceof TouchEvent
				? e.touches[0]
				: (e as MouseEvent);

		const value = this.#calculateValueFromMouseEvent(sourceEvent);

		this.value = `${this.#roundToNearestStep(value)}`;
	};

	#calculateValueFromMouseEvent(e: Pick<MouseEvent, 'pageX' | 'pageY'>) {
		// Determine the position in pixel space
		const trackClientRect = this.track.getBoundingClientRect();
		const [minPos, maxPos, valuePos] =
			this.orientation === Orientation.horizontal
				? [
						this.track.clientLeft,
						this.track.clientWidth,
						e.pageX -
							document.documentElement.scrollLeft -
							this.getBoundingClientRect().left,
				  ]
				: [
						trackClientRect.top,
						trackClientRect.bottom,
						e.pageY - document.documentElement.scrollTop,
				  ];

		// Remap to value space
		return lerp(this.min, this.max, inverseLerp(minPos, maxPos, valuePos));
	}

	/**
	 * Handle a window mouse up during a drag operation
	 */
	private handleWindowMouseUp = (_: MouseEvent): void => {
		this.stopDragging();
	};

	private stopDragging = (): void => {
		this.isDragging = false;
		this.handleMouseDown(null);
		this.handleThumbMouseDown(null);
	};

	/**
	 *
	 * @param e - MouseEvent or null. If there is no event handler it will remove the events
	 */
	private handleMouseDown = (e: MouseEvent | null) => {
		const eventAction = e !== null ? 'addEventListener' : 'removeEventListener';
		if (e === null || (!this.disabled && !this.readOnly)) {
			window[eventAction]('mouseup', this.handleWindowMouseUp as EventListener);
			window.document[eventAction](
				'mouseleave',
				this.handleWindowMouseUp as EventListener
			);
			window[eventAction]('mousemove', this.handleMouseMove as EventListener);

			if (e) {
				e.preventDefault();
				this.setupTrackConstraints();
				this.#isNonVisibleFocus = true;
				(e.target as HTMLElement).focus();
				this.#isNonVisibleFocus = false;
				const value = this.#calculateValueFromMouseEvent(e);

				this.value = `${this.#roundToNearestStep(value)}`;

				this.isDragging = true;
			}
		}
	};

	#roundToNearestStep(value: number) {
		return limit(
			this.min,
			this.max,
			roundToStepValue(value - this.min, this.step) + this.min
		);
	}

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
