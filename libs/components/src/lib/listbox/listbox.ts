import { attr } from '@microsoft/fast-element';
import { ListboxElement as FoundationListboxElement, ListboxOption } from '@microsoft/fast-foundation';
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
	private _optionsState = new WeakMap<ListboxOption, boolean>();

	override slottedOptionsChanged(prev: Element[] | undefined, next: Element[]) {
		if (!this.disabled) {
			super.slottedOptionsChanged(prev, next);
			return;
		}

		const prevOptions = [...this.options];
		super.slottedOptionsChanged(prev, next);
		const newOptions = this.options.filter(o => !prevOptions?.includes(o));
		newOptions.forEach(option => {
			this._optionsState.set(option, option.disabled);
			option.disabled = true;
		});
		const remOptions = prevOptions.filter(o => !this.options?.includes(o));
		remOptions.forEach(option => {
			this._optionsState.delete(option);
		});
	}

	/**
	 * Saves/restore children state when the `disabled` property changes.
	 *
	 * @param _ - The previous disabled value
	 * @param becomesDisabled - The next disabled value
	 * @internal
	 */
	disabledChanged(_: boolean, next: boolean): void {
		if (becomesDisabled) {
			this.options.forEach(option => {
				this._optionsState.set(option, option.disabled);
				option.disabled = true;
			});
		}
		else {
			this.options.forEach(option => option.disabled = !!this._optionsState.get(option));
		}
	}
}
