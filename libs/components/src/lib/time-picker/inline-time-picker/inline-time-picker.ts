import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../../shared/foundation/vivid-element/vivid-element';
import { isValidTimeStr } from '../time/time';
import { Localized } from '../../../shared/patterns';
import { applyMixinsWithObservables } from '../../../shared/utils/applyMixinsWithObservables';
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

export class InlineTimePicker extends VividElement {
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
	}
}

export interface InlineTimePicker extends Localized {}
applyMixinsWithObservables(InlineTimePicker, Localized);
