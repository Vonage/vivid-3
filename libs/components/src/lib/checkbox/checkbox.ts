import { attr } from '@microsoft/fast-element';
import { Checkbox as FastCheckbox } from '@microsoft/fast-foundation';

export const keySpace: ' ' = ' ' as const;

/**
 * Base class for checkbox
 *
 * 
 */
export class Checkbox extends FastCheckbox {
	/**
	 * Indicates the checkbox's label.
	 *
	 * 
	 * 
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * 
	 * @param KeyboardEvent - keypressHandler
	 */
	override keypressHandler = (e: KeyboardEvent): void => {
		switch (e.key) {
			case keySpace:
				if (this.indeterminate) {
					this.indeterminate = false;
				}
				this.checked = !this.checked;
				break;
		}
	};

	/**
	 * 
	 */
	override clickHandler = (): void => {
		if (!this.disabled && !this.readOnly) {
			if (this.indeterminate) {
				this.indeterminate = false;
			}
			this.checked = !this.checked;
		}
	};
}
