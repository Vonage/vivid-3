import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import {
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
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { Connotation } from '../enums';
import {
	type FormElement,
	formElements,
	Localized,
} from '../../shared/patterns';
import { FormAssociatedRangeSlider } from './range-slider.form-associated';
import {
	defaultToOneConverter,
	roundToStepValue,
} from './utils/roundToStepValue';
import { inverseLerp, lerp } from './utils/lerp';

export type RangeSliderConnotation = Connotation.Accent | Connotation.CTA;

const Direction = {
	Increment: 1,
	Decrement: -1,
} as const;
type Direction = typeof Direction[keyof typeof Direction];

export type ThumbId = 'start' | 'end';

/**
 * Base class for range-slider
 *
 * @component range-slider
 * @public
 * @event {CustomEvent<undefined>} input:start - Event emitted when the start value changes
 * @event {CustomEvent<undefined>} input:end - Event emitted when the end value changes
 * @event {CustomEvent<undefined>} input - Event emitted when either the start or end value changes.
 * @event {CustomEvent<undefined>} change - Event emitted when either the start or end value changes.
 * @vueModel start start input:start `event.currentTarget.start`
 * @vueModel end end input:end `event.currentTarget.end`
 */
@formElements
export class RangeSlider extends FormAssociatedRangeSlider {
	// --- Start & end values ---

	#isInternalValueUpdate = false;

	/**
	 * The start value of the range.
	 */
	@observable start = '';

	/**
	 * @internal
	 */
	startChanged() {
		this.currentStart = this.start;
		if (!this.#isInternalValueUpdate) {
			this.dirtyValue = true;
			this.#updateFormValue();
		}
		if (this.$fastController.isConnected) {
			this.#updateThumbPositions();
		}
	}

	/**
	 * The initial start value. This value sets the `start` property
	 * only when the `start` property has not been explicitly set.
	 *
	 * @remarks
	 * HTML Attribute: start
	 */
	@attr({ mode: 'fromView', attribute: 'start' }) initialStart:
		| string
		| undefined;

	/**
	 * @internal
	 */
	initialStartChanged(_: string, newValue: string) {
		if (newValue && !this.dirtyValue) {
			this.start = newValue;
			this.dirtyValue = false;
		}
	}

	/**
	 * The current start value of the element. This property serves as a mechanism
	 * to set the `start` property through both property assignment and the
	 * .setAttribute() method. This is useful for setting the field's value
	 * in UI libraries that bind data through the .setAttribute() API
	 * and don't support IDL attribute binding.
	 *
	 * @remarks
	 * HTML Attribute: current-start
	 */
	@attr({ attribute: 'current-start' }) currentStart!: string;

	/**
	 * @internal
	 */
	currentStartChanged() {
		this.start = this.currentStart;
	}

	/**
	 * The start property, typed as a number.
	 *
	 * @public
	 */
	get startAsNumber(): number {
		return parseFloat(this.start);
	}
	set startAsNumber(next: number) {
		this.start = next.toString();
	}

	/**
	 * The end value of the range.
	 */
	@observable end = '';

	/**
	 * @internal
	 */
	endChanged() {
		this.currentEnd = this.end;
		if (!this.#isInternalValueUpdate) {
			this.dirtyValue = true;
			this.#updateFormValue();
		}
		if (this.$fastController.isConnected) {
			this.#updateThumbPositions();
		}
	}

	/**
	 * The initial end value. This value sets the `end` property
	 * only when the `end` property has not been explicitly set.
	 *
	 * @remarks
	 * HTML Attribute: end
	 */
	@attr({ mode: 'fromView', attribute: 'end' }) initialEnd: string | undefined;

	/**
	 * @internal
	 */
	initialEndChanged(_: string, newValue: string) {
		if (newValue && !this.dirtyValue) {
			this.end = newValue;
			this.dirtyValue = false;
		}
	}

	/**
	 * The current end value of the element. This property serves as a mechanism
	 * to set the `end` property through both property assignment and the
	 * .setAttribute() method. This is useful for setting the field's value
	 * in UI libraries that bind data through the .setAttribute() API
	 * and don't support IDL attribute binding.
	 *
	 * @remarks
	 * HTML Attribute: current-end
	 */
	@attr({ attribute: 'current-end' }) currentEnd!: string;

	/**
	 * @internal
	 */
	currentEndChanged() {
		this.end = this.currentEnd;
	}

	/**
	 * The end property, typed as a number.
	 *
	 * @public
	 */
	get endAsNumber() {
		return parseFloat(this.end);
	}
	set endAsNumber(next: number) {
		this.end = next.toString();
	}

	#updateValues(
		{ start, end }: { start?: string; end?: string },
		emitEvents = true
	) {
		if (start === this.start) {
			start = undefined;
		}
		if (end === this.end) {
			end = undefined;
		}
		if (start === undefined && end === undefined) {
			return;
		}

		this.#isInternalValueUpdate = true;
		if (start !== undefined) {
			this.start = start;
		}
		if (end !== undefined) {
			this.end = end;
		}
		this.#isInternalValueUpdate = false;

		if (emitEvents) {
			if (start !== undefined) {
				this.$emit('input:start');
			}
			if (end !== undefined) {
				this.$emit('input:end');
			}
			this.$emit('input');
			this.$emit('change');

			this.dirtyValue = true;
		}

		this.#updateFormValue();
	}

	// --- Other attributes ---

	/**
	 * The minimum value of the range.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: min
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr({ converter: nullableNumberConverter }) min = 0;

	/**
	 * The maximum value of the range.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr({ converter: nullableNumberConverter }) max = 10;

	/**
	 * Value to increment or decrement via arrow keys, mouse click or drag.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: step
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr({ converter: defaultToOneConverter }) step = 1;

	#applyStep(thumb: 'start' | 'end', direction: Direction) {
		this.#updateValues({
			[thumb]: this.#roundToNearestStep(
				thumb,
				Number(this[thumb]) + direction * this.step
			).toString(),
		});
	}

	/**
	 * The orientation of the slider.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr orientation: Orientation = Orientation.horizontal;
	/**
	 * @internal
	 */
	orientationChanged() {
		if (this.$fastController.isConnected) {
			this.#updateThumbPositions();
		}
	}

	/**
	 * Aria label for the start thumb
	 *
	 * @public
	 * HTML Attribute: aria-start-label
	 */
	@attr({ attribute: 'aria-start-label' }) ariaStartLabel: string | null = null;

	/**
	 * Aria label for the end thumb
	 *
	 * @public
	 * HTML Attribute: aria-end-label
	 */
	@attr({ attribute: 'aria-end-label' }) ariaEndLabel: string | null = null;

	/**
	 * Display markers on/off
	 *
	 * @public
	 * HTML Attribute: markers
	 */
	@attr({ mode: 'boolean' }) markers = false;

	/**
	 * The connotation of the component
	 *
	 * @public
	 */
	@attr connotation?: RangeSliderConnotation;

	/**
	 * Show current values on the thumbs.
	 *
	 * @public
	 * HTML Attribute: pin
	 */
	@attr({ mode: 'boolean' }) pin = false;

	/**
	 * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
	 *
	 * @public
	 */
	@observable valueTextFormatter: (value: string) => string = (value) =>
		parseFloat(value).toLocaleString(this.locale.lang);

	// --- Form handling ---

	/**
	 * @internal
	 */
	override nameChanged(previous: string, next: string) {
		super.nameChanged!(previous, next);
		this.#updateFormValue();
	}

	#updateFormValue() {
		if (!this.name) {
			this.setFormValue(null);
		} else {
			const formData = new FormData();
			formData.append(this.name, this.start);
			formData.append(this.name, this.end);
			this.setFormValue(formData);
		}
	}

	override formResetCallback() {
		this.#updateValues({
			start: this.initialStart ?? this.min.toString(),
			end: this.initialEnd ?? this.max.toString(),
		});
		super.formResetCallback();
	}

	// --- Thumbs ---

	/**
	 * @internal
	 */
	_trackEl: HTMLDivElement | null = null;

	/**
	 * @internal
	 */
	_startThumbEl: HTMLDivElement | null = null;

	/**
	 * @internal
	 */
	_endThumbEl: HTMLDivElement | null = null;

	get #thumbs() {
		return {
			start: this._startThumbEl,
			end: this._endThumbEl,
		};
	}

	get #thumbConstraints() {
		return {
			start: { min: this.min, max: this.endAsNumber },
			end: { min: this.startAsNumber, max: this.max },
		};
	}

	/**
	 * @internal
	 */
	@observable _draggingThumb: false | ThumbId = false;

	/**
	 * @internal
	 */
	@observable _visiblyFocusedThumb: ThumbId | null = null;

	/**
	 * @internal
	 */
	@observable _hoveredThumb: ThumbId | null = null;

	#getThumbId(thumb: HTMLElement): ThumbId {
		return thumb === this._startThumbEl ? 'start' : 'end';
	}

	#getThumbIdFromEvent(e: Event): ThumbId {
		return this.#getThumbId(e.target as HTMLElement);
	}

	/**
	 * @internal
	 */
	@observable _startThumbCss = '';

	/**
	 * @internal
	 */
	@observable _endThumbCss = '';

	/**
	 * @internal
	 */
	@observable _selectedRangeCss = '';

	#updateThumbPositions() {
		const startOffsetPct = this.#thumbTrackEndOffset(this.startAsNumber);
		const endOffsetPct = this.#thumbTrackEndOffset(this.endAsNumber);

		const [dirProp, dimProp] =
			this.orientation === Orientation.horizontal
				? ['right', 'width']
				: ['bottom', 'height'];
		const transition = `transition: ${
			this._draggingThumb ? 'none' : 'all 0.2s ease'
		};`;

		this._startThumbCss = `${dirProp}: ${startOffsetPct}%; ${transition}`;
		this._endThumbCss = `${dirProp}: ${endOffsetPct}%; ${transition}`;
		this._selectedRangeCss = `${dirProp}: ${endOffsetPct}%; ${dimProp}: ${
			startOffsetPct - endOffsetPct
		}%; ${transition}`;
	}

	#thumbTrackEndOffset(value: number) {
		return (1 - inverseLerp(this.min, this.max, value)) * 100;
	}

	#calculateValueFromMouseEvent(e: Pick<MouseEvent, 'pageX' | 'pageY'>) {
		// Determine the position in pixel space
		const trackClientRect = this._trackEl!.getBoundingClientRect();
		const [minPos, maxPos, valuePos] =
			this.orientation === Orientation.horizontal
				? [
						this._trackEl!.clientLeft,
						this._trackEl!.clientWidth,
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

	#roundToNearestStep(thumb: ThumbId, value: number) {
		return limit(
			this.#thumbConstraints[thumb].min,
			this.#thumbConstraints[thumb].max,
			roundToStepValue(value - this.min, this.step) + this.min
		);
	}

	#isNonVisibleFocus = false;
	#focusThumbNonVisibly(thumb: HTMLElement) {
		this.#isNonVisibleFocus = true;
		thumb.focus();
		this.#isNonVisibleFocus = false;
	}

	/**
	 * @internal
	 */
	_isThumbPopupOpen(thumb: ThumbId) {
		return (
			this._visiblyFocusedThumb === thumb ||
			this._hoveredThumb === thumb ||
			this._draggingThumb === thumb
		);
	}

	// --- Lifecycle ---

	override connectedCallback() {
		super.connectedCallback();
		this.#updateValues(
			{
				start: this.start || this.initialStart || this.min.toString(),
				end: this.end || this.initialEnd || this.max.toString(),
			},
			false
		);
		this.#registerThumbListeners();
		this.#updateThumbPositions();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#unregisterThumbListeners();
		this.#unregisterDragListeners();
	}

	// --- Event handling ---

	#registerThumbListeners() {
		for (const thumb of ['start', 'end'] as const) {
			this.#thumbs[thumb]!.addEventListener('keydown', this.#onThumbKeydown);
			this.#thumbs[thumb]!.addEventListener(
				'mousedown',
				this.#onThumbMousedown,
				{ passive: true }
			);
			this.#thumbs[thumb]!.addEventListener(
				'touchstart',
				this.#onThumbMousedown,
				{ passive: true }
			);
			this.#thumbs[thumb]!.addEventListener('mouseover', this.#onMouseOver, {
				passive: true,
			});
			this.#thumbs[thumb]!.addEventListener('mouseout', this.#onMouseOut, {
				passive: true,
			});
			this.#thumbs[thumb]!.addEventListener('focus', this.#onThumbFocus);
			this.#thumbs[thumb]!.addEventListener('blur', this.#onThumbBlur);
		}
	}

	#unregisterThumbListeners() {
		for (const thumb of ['start', 'end'] as const) {
			this.#thumbs[thumb]!.removeEventListener('keydown', this.#onThumbKeydown);
			this.#thumbs[thumb]!.removeEventListener(
				'mousedown',
				this.#onThumbMousedown
			);
			this.#thumbs[thumb]!.removeEventListener(
				'touchstart',
				this.#onThumbMousedown
			);
			this.#thumbs[thumb]!.removeEventListener('mouseover', this.#onMouseOver);
			this.#thumbs[thumb]!.removeEventListener('mouseout', this.#onMouseOut);
			this.#thumbs[thumb]!.removeEventListener('focus', this.#onThumbFocus);
			this.#thumbs[thumb]!.removeEventListener('blur', this.#onThumbBlur);
		}
	}

	/**
	 * @internal
	 */
	_onMouseDown(e: MouseEvent) {
		if (this.disabled || this._draggingThumb) {
			return;
		}

		const value = this.#calculateValueFromMouseEvent(e);

		const startDistance = Math.abs(value - Number(this.start));
		const endDistance = Math.abs(value - Number(this.end));

		// Choose closer thumb
		const thumb =
			startDistance < endDistance ||
			(startDistance === endDistance && value < Number(this.start))
				? 'start'
				: 'end';

		this.#updateValues({
			[thumb]: `${this.#roundToNearestStep(thumb, value)}`,
		});
		this._draggingThumb = thumb;
		this.#focusThumbNonVisibly(this.#thumbs[thumb]!);

		this.#registerDragHandlers();
	}

	#onThumbFocus = (e: FocusEvent) => {
		if (!this.#isNonVisibleFocus) {
			this._visiblyFocusedThumb = this.#getThumbIdFromEvent(e);
		}
	};

	#onThumbBlur = () => {
		this._visiblyFocusedThumb = null;
	};

	#onMouseOver = (e: MouseEvent) => {
		this._hoveredThumb = this.#getThumbIdFromEvent(e);
	};

	#onMouseOut = () => {
		this._hoveredThumb = null;
	};

	#onThumbMousedown = (event: MouseEvent | TouchEvent) => {
		if (this.disabled || event.defaultPrevented) {
			return;
		}

		let target = event.target as HTMLElement;
		if (
			target === this._endThumbEl &&
			this.startAsNumber === this.max &&
			this.endAsNumber === this.max
		) {
			// Prevent both thumbs getting stuck at the max value
			target = this._startThumbEl!;
		}
		this.#focusThumbNonVisibly(target);
		this._draggingThumb = this.#getThumbId(target);

		this.#registerDragHandlers();
	};

	#onThumbKeydown = (e: KeyboardEvent) => {
		const thumb = this.#getThumbIdFromEvent(e);
		this._visiblyFocusedThumb = thumb;

		if (e.key === keyHome) {
			e.preventDefault();
			this.#updateValues({ [thumb]: `${this.#thumbConstraints[thumb].min}` });
		} else if (e.key === keyEnd) {
			e.preventDefault();
			this.#updateValues({ [thumb]: `${this.#thumbConstraints[thumb].max}` });
		} else if (!e.shiftKey) {
			switch (e.key) {
				case keyArrowRight:
				case keyArrowDown:
					e.preventDefault();
					this.#applyStep(thumb, Direction.Increment);
					break;
				case keyArrowLeft:
				case keyArrowUp:
					e.preventDefault();
					this.#applyStep(thumb, Direction.Decrement);
					break;
			}
		}
	};

	#registerDragHandlers() {
		window.addEventListener('mousemove', this.#onDragMove, { passive: true });
		window.addEventListener('touchmove', this.#onDragMove, { passive: true });
		window.addEventListener('mouseup', this.#onDragEnd);
		window.addEventListener('touchend', this.#onDragEnd);
		window.document.addEventListener('mouseleave', this.#onDragEnd);
	}

	#unregisterDragListeners() {
		window.removeEventListener('mouseup', this.#onDragEnd);
		window.document.removeEventListener('mouseleave', this.#onDragEnd);
		window.removeEventListener('mousemove', this.#onDragMove);
		window.removeEventListener('touchmove', this.#onDragMove);
		window.removeEventListener('touchend', this.#onDragEnd);
	}

	#onDragMove = (e: MouseEvent | TouchEvent) => {
		if (this.disabled || e.defaultPrevented || !this._draggingThumb) {
			return;
		}

		const sourceEvent =
			'TouchEvent' in window && e instanceof TouchEvent
				? e.touches[0]
				: (e as MouseEvent);

		const value = this.#calculateValueFromMouseEvent(sourceEvent);

		this.#updateValues({
			[this._draggingThumb]: `${this.#roundToNearestStep(
				this._draggingThumb,
				value
			)}`,
		});
	};

	#onDragEnd = () => {
		this._draggingThumb = false;
		this.#unregisterDragListeners();
	};
}

export interface RangeSlider extends FormElement, Localized {}
applyMixins(RangeSlider, Localized);
