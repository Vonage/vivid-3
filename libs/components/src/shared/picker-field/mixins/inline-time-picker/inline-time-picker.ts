import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../../foundation/vivid-element/vivid-element';
import { isValidTimeStr } from '../../../datetime/time';
import { Localized } from '../../../patterns';
import {
	scrollToOption,
	shouldDisplay12hClock,
	shouldDisplaySecondsPicker,
} from './inline-time-picker.template';
import {
	HoursColumn,
	MeridiesColumn,
	MinutesColumn,
	SecondsColumn,
} from './columns';

export class InlineTimePicker extends Localized(VividElement) {
	@observable value?: string;

	valueChanged(_?: string, newValue?: string) {
		if (newValue !== undefined && !isValidTimeStr(newValue)) {
			this.value = undefined;
		}
	}

	@observable minutesStep = 1;
	@observable secondsStep?: number;
	@observable clock: '12h' | '24h' = '24h';
	@observable min?: string;
	@observable max?: string;
	focusedPickerClass = 'focused';

	scrollSelectedOptionsToTop() {
		if (HoursColumn.getSelectedOptionValue(this)) {
			scrollToOption(
				this,
				'hours',
				HoursColumn.getSelectedOptionValue(this)!,
				'start'
			);
		}
		if (MinutesColumn.getSelectedOptionValue(this)) {
			scrollToOption(
				this,
				'minutes',
				MinutesColumn.getSelectedOptionValue(this)!,
				'start'
			);
		}
		if (
			shouldDisplaySecondsPicker(this) &&
			SecondsColumn.getSelectedOptionValue(this)
		) {
			scrollToOption(
				this,
				'seconds',
				SecondsColumn.getSelectedOptionValue(this)!,
				'start'
			);
		}
		if (
			shouldDisplay12hClock(this) &&
			MeridiesColumn.getSelectedOptionValue(this)
		) {
			scrollToOption(
				this,
				'meridies',
				MeridiesColumn.getSelectedOptionValue(this)!,
				'start'
			);
		}
	}

	override focus(options?: FocusOptions) {
		// Override focus instead of relying on default behavior to prevent visible focus
		const firstFocusableElement = this.shadowRoot!.querySelector(
			'.picker'
		) as HTMLElement;
		firstFocusableElement.focus(options);
		this._applyFocusedClass();
	}

	/**
	 * @internal
	 */
	_onFocusOut = () => {
		this._clearFocusedClasses();
	};

	/**
	 * @internal
	 */
	_onPointerDown = () => {
		this._clearFocusedClasses();
	};

	/**
	 * @internal
	 * Apply 'focused' class to the wrapper element of an active picker
	 */
	_applyFocusedClass(): void {
		const pickers = this.shadowRoot!.querySelectorAll('.picker');

		requestAnimationFrame(() => {
			const active = this.shadowRoot!.activeElement;
			pickers.forEach((el) => {
				if (el === active) {
					el.parentElement?.classList.add(this.focusedPickerClass);
				} else {
					el.parentElement?.classList.remove(this.focusedPickerClass);
				}
			});
		});
	}

	/**
	 * @internal
	 * Clear 'focused' classes from all pickers wrappers
	 */
	_clearFocusedClasses(): void {
		const pickers = this.shadowRoot!.querySelectorAll('.picker');
		pickers.forEach((el) => {
			el.parentElement?.classList.remove(this.focusedPickerClass);
		});
	}
}
