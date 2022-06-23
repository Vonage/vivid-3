import { attr } from '@microsoft/fast-element';
import { Checkbox as FastCheckbox } from '@microsoft/fast-foundation';

export const keySpace: ' ' = ' ' as const;

/**
 * Base class for checkbox
 *
 * @public
 */
export class Checkbox extends FastCheckbox {
	/**
	 * Indicates the checkbox's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * !remove method as will be implemented by fast-foundation in version > 2.46.9
	 *
	 * @param e
	 * @internal
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
	 * !remove method as will be implemented by fast-foundation in version > 2.46.9
	 *
	 * @param e
	 * @internal
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
