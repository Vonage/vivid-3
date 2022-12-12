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
	private _radiosState = new WeakMap<HTMLElement, boolean>();

	// super-mega-ugly hack to workaround the fact that in our current version
	// of fast-foundation disabledChanged is private instead of protected
	constructor() {
		super();

		(this as any).slottedRadioButtonsChanged = (oldValue: HTMLElement[], newValue: HTMLElement[]) => {
			if (!this.disabled) {
				super['slottedRadioButtonsChanged'](oldValue, newValue);
				return;
			}
	
			super['slottedRadioButtonsChanged'](oldValue, newValue);
			const nextRadios = newValue.filter(r => !oldValue?.includes(r));
			nextRadios.forEach((radio: any) => {
				this._radiosState.set(radio, radio.disabled);
				radio.disabled = true;
			});
			const remRadios = oldValue.filter(r => !newValue?.includes(r));
			remRadios.forEach(radio => {
				this._radiosState.delete(radio);
			});
		};
		
		(this as any).disabledChanged = (_: boolean, becomesDisabled: boolean): void => {
			if (this.slottedRadioButtons !== undefined) {
				if (becomesDisabled) {
					this.slottedRadioButtons.forEach((radio: any) => {
						this._radiosState.set(radio, radio.disabled);
						radio.disabled = true;
					});
				}
				else {
					this.slottedRadioButtons.forEach((radio: any) => {
						radio.disabled = !!this._radiosState.get(radio);
					});
				}
			}
		};
	}
}
