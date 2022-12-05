import { attr } from '@microsoft/fast-element';
import { RadioGroup as FastRadioGroup } from '@microsoft/fast-foundation';

/**
 * Base class for radio-group
 *
 * @public
 */
export class RadioGroup extends FastRadioGroup {
	/**
	 * Indicates the group's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * To save the state of children radios before going disabled.
	 */
	private _radiosState: boolean[] = [];

	// super-mega-ugly hack to workaround the fact that in our current version
	// of fast-foundation disabledChanged is private instead of protected
	constructor() {
		super();
		(this as any).disabledChanged = (_: boolean, becomesDisabled: boolean): void => {
			if (this.slottedRadioButtons !== undefined) {
				if (becomesDisabled) {
					this.slottedRadioButtons.forEach((radio: any, idx) => {
						this._radiosState[idx] = radio.disabled;
						radio.disabled = true;
					});
				}
				else {
					this.slottedRadioButtons.forEach((radio: any, idx) => {
						radio.disabled = this._radiosState[idx];
					});
				}
			}
		}
	}
}
