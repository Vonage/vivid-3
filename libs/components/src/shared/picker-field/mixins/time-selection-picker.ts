import {
	attr,
	ExecutionContext,
	type ExpressionNotifier,
	nullableNumberConverter,
	Observable,
	Updates,
	volatile,
} from '@microsoft/fast-element';
import type { TimeStr } from '../../datetime/time';
import type { DateStr } from '../../datetime/dateStr';
import type { AbstractConstructor, MixinType } from '../../utils/mixins';
import type { InlineTimePicker } from './inline-time-picker/inline-time-picker';
import type { SingleValuePickerElement } from './single-value-picker';

/**
 * Mixin for pickers that allow selecting a time.
 */
export const TimeSelectionPicker = <
	T extends AbstractConstructor<SingleValuePickerElement>
>(
	Base: T
) => {
	abstract class TimeSelectionPickerElement extends Base {
		/**
		 * @internal
		 */
		abstract get _timeValue(): string;
		/**
		 * @internal
		 */
		abstract _withUpdatedTime(timeStr: DateStr): string;
		/**
		 * @internal
		 */
		abstract get _resolvedMinTime(): TimeStr | null;
		/**
		 * @internal
		 */
		abstract get _resolvedMaxTime(): TimeStr | null;

		// --- Attributes ---

		/**
		 * Distance between presented minute options.
		 * @public
		 * @remarks
		 * HTML Attribute: minutes-step
		 */
		@attr({ attribute: 'minutes-step', converter: nullableNumberConverter })
		minutesStep: number | null = null;

		/**
		 * Distance between presented seconds options. If null, seconds are not presented.
		 * @public
		 * @remarks
		 * HTML Attribute: seconds-step
		 */
		@attr({ attribute: 'seconds-step', converter: nullableNumberConverter })
		secondsStep: number | null = null;

		/**
		 * Forces a 12h or 24h clock to be used.
		 * @public
		 * @remarks
		 * HTML Attribute: clock
		 */
		@attr clock?: '12h' | '24h';

		// --- Refs ---
		/**
		 * @internal
		 */
		_inlineTimePickerEl!: InlineTimePicker;

		// --- Core ---
		/**
		 * @internal
		 */
		get _displaySeconds() {
			return this.secondsStep !== null;
		}

		/**
		 * @internal
		 */
		@volatile
		get _use12hClock() {
			return this.clock
				? this.clock === '12h'
				: this.locale.timePicker.defaultTo12HourClock;
		}

		/**
		 * @internal
		 */
		get _timePlaceholder() {
			let format = 'hh:mm';
			if (this._displaySeconds) {
				format += ':ss';
			}
			if (this._use12hClock) {
				format += ' aa';
			}
			return format;
		}

		// Reformat the presentation value when the clock changes
		#clockChangeHandler = {
			handleChange: () => {
				if (this.value) {
					this._presentationValue = this._toPresentationValue(this.value);
				}
			},
		};
		#clockChangeObserver!: ExpressionNotifier;
		#startObservingClockChanges() {
			this.#clockChangeObserver = Observable.binding(
				() => this._use12hClock,
				this.#clockChangeHandler
			);
			this.#clockChangeObserver.observe(this, ExecutionContext.default);
		}
		#stopObservingClockChanges() {
			this.#clockChangeObserver.dispose();
		}

		/**
		 * @internal
		 */
		override connectedCallback() {
			super.connectedCallback();
			this.#startObservingClockChanges();
		}

		/**
		 * @internal
		 */
		override disconnectedCallback() {
			super.disconnectedCallback();
			this.#stopObservingClockChanges();
		}

		// --- Picker button ---

		/**
		 * @internal
		 */
		override _onPickerButtonClick() {
			super._onPickerButtonClick();
			if (this._popupOpen) {
				Updates.process();
				this._inlineTimePickerEl.scrollSelectedOptionsToTop();
			}
		}

		// --- Inline time picker ---

		/**
		 * @internal
		 */
		_onInlineTimePickerChange(event: CustomEvent<string>) {
			this._updateValueDueToUserInteraction(
				this._withUpdatedTime(event.detail),
				false
			);
		}

		/**
		 * @internal
		 */
		_onInlineTimePickerLastColumnSelected() {
			this._closePopup();
		}
	}

	return TimeSelectionPickerElement;
};

export type TimeSelectionPickerElement = MixinType<typeof TimeSelectionPicker>;
