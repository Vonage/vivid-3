import { attr } from '@microsoft/fast-element';
import { ListboxElement as FoundationListboxElement } from '@microsoft/fast-foundation';
import type { Appearance } from '../enums';

/**
 * Types of listbox appearance.
 *
 * @public
 */
export type ListboxAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;

/**
 * Base class for listbox
 *
 * @public
 */
export class Listbox extends FoundationListboxElement {
	/**
	 * The appearance the listbox should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ListboxAppearance;

	/**
	 * To save the state of children options before going disabled.
	 */
	private _optionsState: boolean[] = [];

	/**
	 * Saves/restore children state when the `disabled` property changes.
	 *
	 * @param _ - The previous disabled value
	 * @param becomesDisabled - The next disabled value
	 *
	 * @internal
	 */
	public disabledChanged(_: boolean, becomesDisabled: boolean): void {
		if (becomesDisabled) {
			this._options.forEach((option, idx) => {
				this._optionsState[idx] = option.disabled;
				option.disabled = true;
			});
		}
		else {
			this._options.forEach((option, idx) => option.disabled = this._optionsState[idx]);
		}
	}	
}
