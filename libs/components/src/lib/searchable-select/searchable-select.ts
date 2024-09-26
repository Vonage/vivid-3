import {
	attr,
	DOM,
	nullableNumberConverter,
	Observable,
	observable,
} from '@microsoft/fast-element';
import { Appearance, Shape } from '../enums';
import {
	AffixIconWithTrailing,
	type ErrorText,
	errorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
	Localized,
} from '../../shared/patterns';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';
import type { ListboxOption } from '../option/option';
import { FormAssociatedSearchableSelect } from './searchable-select.form-associated';
import type { OptionTag } from './option-tag';

export type SearchableSelectAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type SearchableSelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

const TagGapPx = 8;
const InputMinWidthPx = 100;
const PageSize = 10;

interface TagLayoutEntry {
	value: string;
	width: number;
}

/**
 * @public
 * @component searchable-select
 * @slot - Holds the available options.
 * @slot icon - Slot to add an icon to the control.
 * @slot meta - Slot to add meta content to the control.
 * @slot helper-text - Describes how to use the component. Alternative to the `helper-text` attribute.
 * @slot no-options - Message that appears when no options are available.
 * @slot no-matches - Message that appears when no options match the search query.
 * @event {CustomEvent<undefined>} input - Fired when the selected options change
 * @event {CustomEvent<undefined>} change - Fired when the selected options change
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 * @vueModel values values input `(event.target as any).values`
 */
@errorText
@formElements
export class SearchableSelect extends FormAssociatedSearchableSelect {
	/**
	 * @public
	 * HTML Attribute: appearance
	 */
	@attr appearance?: SearchableSelectAppearance;

	/**
	 * @public
	 * HTML Attribute: shape
	 */
	@attr shape?: SearchableSelectShape;

	/**
	 * @public
	 * HTML Attribute: fixed-dropdown
	 */
	@attr({ mode: 'boolean', attribute: 'fixed-dropdown' }) fixedDropdown = false;

	/**
	 * @public
	 * HTML Attribute: placeholder
	 */
	@attr placeholder: string | undefined;

	/**
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 * @public
	 * HTML Attribute: multiple
	 */
	@attr({ mode: 'boolean' }) multiple = false;

	/**
	 * @public
	 * HTML Attribute: external-tags
	 */
	@attr({ attribute: 'external-tags', mode: 'boolean' }) externalTags = false;

	/**
	 * @public
	 * HTML Attribute: max-lines
	 */
	@attr({ attribute: 'max-lines', converter: nullableNumberConverter })
	maxLines: number | null = null;

	// --- Values ---

	/**
	 * List of selected values.
	 */
	@observable values: string[] = [];
	/**
	 * @internal
	 */
	valuesChanged() {
		if (!this._areOptionsInitialized) {
			// Leave values in potential invalid state until options are available
			return;
		}

		if (!this.multiple && this.values.length > 1) {
			this.values = [this.values[0]];
			return;
		}

		if (this.values.some((value) => !this.#isValidValue(value))) {
			this.values = this.values.filter((value) => this.#isValidValue(value));
			return;
		}

		if (!this.multiple) {
			if (this.values.length) {
				this.#suppressFilter = true;
				this._inputValue = this.#textForValue(this.values[0])!;
			} else {
				this._inputValue = '';
			}
		}

		this.value = this.values.length ? this.values[0] : '';

		this.#updateSelectedOnSlottedOptions();
		if (this.$fastController.isConnected) {
			this.#updateTagLayout();
		}
	}

	#updateValuesThroughUserInteraction(newValues: string[]) {
		this.values = newValues;
		this.$emit('change', undefined, {
			bubbles: false,
		});
		this.$emit('input', undefined, {
			bubbles: false,
		});
	}

	#updateValuesWhileMaintainingOrder(newValues: string[]) {
		const oldSet = new Set(this.values);
		const newSet = new Set(newValues);
		this.values = [...this.values]
			.filter((v) => newSet.has(v))
			.concat([...newValues].filter((v) => !oldSet.has(v)));
	}

	#isValidValue(value: string) {
		return this._slottedOptions.some((option) => option.value === value);
	}

	/**
	 * @internal
	 */
	override valueChanged(_: string, next: string) {
		if (!this._areOptionsInitialized) {
			// Leave value in potential invalid state until options are available
			return;
		}
		const isValidValue = this._slottedOptions.some(
			(option) => option.value === next
		);
		if (this.values[0] !== next) {
			this.values = isValidValue ? [next] : [];
		}
	}

	get selectedIndex() {
		if (this.values.length) {
			return this._slottedOptions.findIndex(
				(option) => option.value === this.values[0]
			);
		} else {
			return -1;
		}
	}
	set selectedIndex(index: number) {
		this.value = this._slottedOptions[index]?.value ?? '';
	}

	get options() {
		return [...this._slottedOptions];
	}

	get selectedOptions() {
		return this._slottedOptions.filter((option) =>
			this.values.includes(option.value)
		);
	}

	// --- Input ---

	/**
	 * @internal
	 */
	@observable _input!: HTMLInputElement;

	/**
	 * @internal
	 */
	@observable _inputValue = '';
	/**
	 * @internal
	 */
	_inputValueChanged() {
		this.#updateFilteredOptions();
	}

	/**
	 * @internal
	 */
	_onInputInput(event: InputEvent) {
		this.#suppressFilter = false;
		this._inputValue = (event.target as HTMLInputElement).value;
	}

	/**
	 * @internal
	 */
	_onInputFocus(_: FocusEvent) {
		this.#suppressFilter = true;
		this.#updateFilteredOptions();
		this.open = true;
	}

	/**
	 * @internal
	 */
	_onInputBlur(_: FocusEvent) {
		this.open = false;
		if (this.multiple) {
			this._inputValue = '';
		} else {
			if (this.values.length === 0) {
				this._inputValue = '';
			} else {
				this._inputValue = this.#textForValue(this.values[0])!;
			}
		}
	}

	/**
	 * @internal
	 */
	_onInputKeydown(e: KeyboardEvent) {
		if (e.ctrlKey || e.shiftKey) {
			return true;
		}

		switch (e.key) {
			case 'Enter':
				this.#selectHighlightedOption();
				return false;

			case 'Escape':
				this.open = false;
				break;

			case 'Home':
				if (!this.open) {
					this.open = true;
					break;
				}
				this.#highlightFirstOption();
				return false;

			case 'End':
				if (!this.open) {
					this.open = true;
					break;
				}
				this.#highlightLastOption();
				return false;

			case 'PageUp':
				if (!this.open) {
					this.open = true;
					break;
				}
				this.#highlightPrevPage();
				return false;

			case 'PageDown':
				if (!this.open) {
					this.open = true;
					break;
				}
				this.#highlightNextPage();
				return false;

			case 'ArrowUp':
				if (!this.open) {
					this.open = true;
					break;
				}
				this.#highlightPreviousOption();
				return false;

			case 'ArrowDown':
				if (!this.open) {
					this.open = true;
					break;
				}

				this.#highlightNextOption();
				return false;

			case 'ArrowLeft':
				if (
					this.multiple &&
					this._inputValue === '' &&
					this.values.length &&
					!this.externalTags
				) {
					this.#moveTagFocusTo(this.#nextTagIndexLeft(this.values.length));
					return false;
				}
				return true;

			case 'Backspace':
				if (this.multiple && this._inputValue === '' && this.values.length) {
					this._onTagRemoved(this.values[this.values.length - 1]);
					return false;
				}
				return true;

			default:
				if (!this.open) {
					this.open = true;
				}
				return true;
		}

		return true;
	}

	// --- Slotted options ---

	/**
	 * @internal
	 */
	private _areOptionsInitialized = false;

	/**
	 * @internal
	 */
	@observable _slottedOptions!: ListboxOption[];
	/**
	 * @internal
	 */
	_slottedOptionsChanged(
		oldValue: ListboxOption[] | undefined,
		newValue: ListboxOption[] | undefined
	) {
		const hasSlottedOptions = Boolean(
			this.querySelectorAll(`:not([slot])`).length
		);
		if (!newValue!.length && hasSlottedOptions) {
			// Wait until slotted options become available before initialising
			return;
		}

		this._areOptionsInitialized = true;

		if (oldValue) {
			for (const option of oldValue) {
				const notifier = Observable.getNotifier(option);
				notifier.unsubscribe(this.#slottedOptionsChangeHandler, 'selected');
			}
		}

		if (newValue) {
			for (const option of newValue) {
				option._displayCheckmark = true;
				const notifier = Observable.getNotifier(option);
				notifier.subscribe(this.#slottedOptionsChangeHandler, 'selected');
			}
		}

		// When options initialize or change, we will consider all options selected now that are `selected` or
		// in`values` / `value`.
		const values: string[] = [];
		for (const option of this._slottedOptions) {
			if (
				option.selected ||
				option.value === this.value ||
				this.values.includes(option.value)
			) {
				values.push(option.value);
			}
		}

		this.#updateValuesWhileMaintainingOrder(values);
		this.#updateFilteredOptions();
	}

	#slottedOptionsChangeHandler = {
		handleChange: (source: ListboxOption, _: string) => {
			if (source.selected && !this.values.includes(source.value)) {
				this.values = [...this.values, source.value];
			} else if (!source.selected && this.values.includes(source.value)) {
				this.values = this.values.filter((option) => option !== source.value);
			}
		},
	};

	#clonedTagIcons = new Map<ListboxOption, HTMLElement>();

	#updateSelectedOnSlottedOptions() {
		for (const option of this._slottedOptions) {
			option.selected = this.values.includes(option.value);

			// Clone slotted tag-icon and give them a unique slot name, so that they can be forwarded to the correct tag
			if (option.selected && option.querySelector('[slot="tag-icon"]')) {
				let clone = this.#clonedTagIcons.get(option);
				if (!clone) {
					clone = option
						.querySelector('[slot="tag-icon"]')!
						.cloneNode(true) as HTMLElement;
					this.#clonedTagIcons.set(option, clone);
				}
				clone.slot = `_tag-icon-${this.values.indexOf(option.value)}`;
				this.appendChild(clone);
			} else {
				// Remove the cloned tag-icon if the option is no longer selected
				const clone = this.#clonedTagIcons.get(option);
				if (clone) {
					clone.remove();
					this.#clonedTagIcons.delete(option);
				}
			}
		}
	}

	#handleOptionInteraction(option: ListboxOption) {
		const value = option.value;
		let newValues: string[];

		if (this.multiple) {
			if (!this.values.includes(value)) {
				newValues = [...this.values, value];
			} else {
				newValues = this.values.filter((option) => option !== value);
			}
			this._inputValue = '';
		} else {
			if (this.values.includes(value)) {
				newValues = [];
			} else {
				newValues = [value];
				this._inputValue = option.text;
			}
			this.open = false;
		}

		this.#updateValuesThroughUserInteraction(newValues);
	}

	// --- Option filtering ---

	/**
	 * @internal
	 */
	@observable _filteredOptions: ListboxOption[] = [];

	/**
	 * @internal
	 */
	@observable _filteredEnabledOptions: ListboxOption[] = [];

	#suppressFilter = false;

	#updateFilteredOptions() {
		const newFilteredOptions = [];

		for (const option of this._slottedOptions ?? []) {
			const matches =
				this.#suppressFilter ||
				option.text.toLowerCase().includes(this._inputValue.toLowerCase());

			option.hidden = !matches;

			if (!option.hidden) {
				newFilteredOptions.push(option);
			}
		}

		this.#transitionHighlightedOptionTo(null);
		this._filteredOptions = newFilteredOptions;
		this._filteredEnabledOptions = newFilteredOptions.filter(
			(option) => !option.disabled
		);
	}

	// --- Highlighted option (visual focus) ---

	/**
	 * Currently visually highlighted option as an index into _filteredEnabledOptions
	 * @internal
	 */
	_highlightedOptionIndex: number | null = null;

	#transitionHighlightedOptionTo(index: number | null) {
		if (typeof this._highlightedOptionIndex === 'number') {
			this._filteredEnabledOptions[this._highlightedOptionIndex]._highlighted =
				false;
		}
		if (typeof index === 'number') {
			if (!this._filteredEnabledOptions.length) {
				index = null;
			} else {
				index = Math.max(
					0,
					Math.min(this._filteredEnabledOptions.length - 1, index)
				);
			}
		}
		this._highlightedOptionIndex = index;
		if (typeof this._highlightedOptionIndex === 'number') {
			this._filteredEnabledOptions[this._highlightedOptionIndex]._highlighted =
				true;
		}
	}

	#selectHighlightedOption() {
		if (this._highlightedOptionIndex === null) {
			return;
		}
		this.#handleOptionInteraction(
			this._filteredEnabledOptions[this._highlightedOptionIndex]
		);
	}

	#highlightFirstOption() {
		this.#transitionHighlightedOptionTo(0);
	}

	#highlightLastOption() {
		this.#transitionHighlightedOptionTo(
			this._filteredEnabledOptions.length - 1
		);
	}

	#highlightPrevPage() {
		this.#transitionHighlightedOptionTo(
			(this._highlightedOptionIndex ?? this._filteredEnabledOptions.length) -
				PageSize
		);
	}

	#highlightNextPage() {
		this.#transitionHighlightedOptionTo(
			(this._highlightedOptionIndex ?? -1) + PageSize
		);
	}

	#highlightPreviousOption() {
		this.#transitionHighlightedOptionTo(
			(this._highlightedOptionIndex ?? this._filteredEnabledOptions.length) - 1
		);
	}

	#highlightNextOption() {
		this.#transitionHighlightedOptionTo(
			(this._highlightedOptionIndex ?? -1) + 1
		);
	}

	// --- Tags ---

	/**
	 * @internal
	 */
	_tagLabelForValue(value: string) {
		const option = this._slottedOptions.find(
			(option) => option.value === value
		)!;
		return option.label;
	}

	/**
	 * @internal
	 */
	_isTagDisabled(value: string) {
		const option = this._slottedOptions.find(
			(option) => option.value === value
		)!;
		return this.disabled || option.disabled;
	}

	#textForValue(value: string) {
		const option = this._slottedOptions.find(
			(option) => option.value === value
		)!;
		return option.text;
	}

	/**
	 * @internal
	 */
	_optionTagTagName!: string;

	/**
	 * @internal
	 */
	#measureTagWidth(label: string, removable: boolean, hasIcon: boolean) {
		const tag = document.createElement(this._optionTagTagName) as OptionTag;
		tag.label = label;
		tag.removable = removable;
		tag.style.cssText = 'position: absolute; visibility: hidden;';
		tag.hasIconPlaceholder = hasIcon;
		this.shadowRoot!.appendChild(tag);
		const width = tag.getBoundingClientRect().width;
		tag.remove();
		return width;
	}

	/**
	 * @internal
	 */
	@observable _contentArea!: HTMLElement;

	/**
	 * The number of tags that are not visible due to space constraints.
	 * @internal
	 */
	@observable _numEllidedTags = 0;

	/**
	 * The visible option tags laid out in rows.
	 * @internal
	 */
	@observable _tagRows: Array<string[]> = [];
	/**
	 * The last row is stored separately to maintain identity of <input> in template.
	 * @internal
	 */
	@observable _lastTagRow: string[] = [];

	#updateTagLayout() {
		if (!this.multiple) {
			// Single select does not display tags
			this._numEllidedTags = 0;
			this._tagRows = [];
			this._lastTagRow = [];
			return;
		}

		if (this.externalTags) {
			// Elide all tags
			this._numEllidedTags = this.values.length;
			this._tagRows = [];
			this._lastTagRow = [];
			return;
		}

		const rowWidth = this._contentArea.getBoundingClientRect().width;

		// First, place tags in reverse order starting from the input
		const rows: Array<TagLayoutEntry[]> = [[]];
		let currentRowIndex = 0;
		let currentRowWidth = InputMinWidthPx;

		let i;
		for (i = this.values.length - 1; i >= 0; i--) {
			const isLastRow = this.maxLines && currentRowIndex === this.maxLines - 1;

			const tagWidth = this.#measureTagWidth(
				this._tagLabelForValue(this.values[i])!,
				true,
				this.selectedOptions[i].querySelector('[slot="tag-icon"]') !== null
			);
			const entry: TagLayoutEntry = {
				value: this.values[i],
				width: tagWidth,
			};

			let elidedTagCounterWidth = 0;
			if (isLastRow) {
				// On the last row, we need to consider the space needed for the tag counter
				const numElidedTags = i;
				if (numElidedTags) {
					elidedTagCounterWidth =
						TagGapPx +
						this.#measureTagWidth(numElidedTags.toString(), false, false);
				}
			}

			const totalWidthNeeded =
				currentRowWidth + TagGapPx + tagWidth + elidedTagCounterWidth;

			if (totalWidthNeeded > rowWidth) {
				if (isLastRow) {
					if (i === this.values.length - 1) {
						// Last tag is always shown
						rows[currentRowIndex].unshift(entry);
						currentRowWidth += TagGapPx + tagWidth;
					} else {
						break;
					}
				} else {
					// Place on next row
					rows.push([]);
					currentRowIndex++;
					rows[currentRowIndex].unshift(entry);
					currentRowWidth = tagWidth;
				}
				continue;
			}

			// Place tag on current row
			rows[currentRowIndex].unshift(entry);
			currentRowWidth += TagGapPx + tagWidth;
		}

		this._numEllidedTags = i + 1;

		// Bring rows into the correct order
		rows.reverse();

		// Tags may have been placed on a later row than necessary. Pull them up.
		for (let i = 0; i < rows.length - 1; i++) {
			let lineWidth =
				rows[i].map((e) => e.width).reduce((a, b) => a + b, 0) +
				(rows[i].length - 1) * TagGapPx;

			// Add tag counter if needed
			if (i === 0 && this._numEllidedTags) {
				lineWidth +=
					TagGapPx +
					this.#measureTagWidth(this._numEllidedTags.toString(), false, false);
			}

			// Pull up tags from the next line as long as they fit
			while (
				rows[i + 1].length &&
				lineWidth + TagGapPx + rows[i + 1][0].width <= rowWidth
			) {
				const nextTag = rows[i + 1].shift()!;
				rows[i].push(nextTag);
				lineWidth += TagGapPx + nextTag.width;
			}
		}

		const rowValues = rows.map((line) => line.map((entry) => entry.value));

		this._tagRows = rowValues.slice(0, -1);
		this._lastTagRow = rowValues.slice(-1)[0];
	}

	/**
	 * @internal
	 */
	_onTagRemoved(value: string) {
		this.#updateValuesThroughUserInteraction(
			this.values.filter((option) => option !== value)
		);
		this.#updateFilteredOptions();
	}

	/**
	 * @internal
	 */
	_onTagKeydown(event: KeyboardEvent) {
		const tagIndex = parseInt((event.target as HTMLElement).dataset.index!);

		switch (event.key) {
			case 'Backspace':
			case 'Delete':
			case 'Enter':
			case ' ': {
				this._onTagRemoved(this.values[tagIndex]);
				DOM.processUpdates();
				this.#moveTagFocusTo(this.#nextTagIndexForRemoved(tagIndex));
				break;
			}
			case 'ArrowLeft':
				this.#moveTagFocusTo(this.#nextTagIndexLeft(tagIndex) ?? tagIndex);
				break;
			case 'ArrowRight':
				this.#moveTagFocusTo(this.#nextTagIndexRight(tagIndex));
				break;
		}

		return true;
	}

	#moveTagFocusTo(index: number | null) {
		if (index === null) {
			this._input.focus();
		} else {
			(
				this.shadowRoot!.querySelector(`[data-index="${index}"]`) as HTMLElement
			).focus();
		}
	}

	#nextTagIndexLeft(index: number) {
		if (!this.values.length) {
			return null;
		}
		for (let i = index - 1; i >= 0; i--) {
			if (!this._isTagDisabled(this.values[i])) {
				return i;
			}
		}
		return null;
	}

	#nextTagIndexRight(index: number) {
		if (!this.values.length) {
			return null;
		}
		for (let i = index + 1; i < this.values.length; i++) {
			if (!this._isTagDisabled(this.values[i])) {
				return i;
			}
		}
		return null;
	}

	#nextTagIndexForRemoved(index: number) {
		return this.#nextTagIndexRight(index - 1) ?? this.#nextTagIndexLeft(index);
	}

	// --- Listbox ---
	/**
	 * @internal
	 */
	@observable _listbox?: HTMLElement;

	/**
	 * @internal
	 */
	_onListboxClick(e: MouseEvent): boolean | void {
		if (this.disabled) {
			return;
		}

		const capturedOption = (e.target as HTMLElement).closest(
			`option,[role=option]`
		) as ListboxOption | null;

		if (capturedOption && !capturedOption.disabled) {
			this.#handleOptionInteraction(capturedOption);
		}
	}

	// --- Clear button ---

	/**
	 * Adds a clear button to the input field that clears the selected values.
	 * @public
	 * HTML Attribute: clearable
	 */
	@attr({ mode: 'boolean' }) clearable = false;

	/**
	 * @internal
	 */
	get _shouldShowClearButton() {
		return this.clearable && this.values.length > 0;
	}

	/**
	 * @internal
	 */
	_onClearButtonClick() {
		this.#updateValuesThroughUserInteraction(
			this.selectedOptions
				.filter((option) => option.disabled)
				.map((option) => option.value)
		);
	}

	// --- Core ---

	#resizeObserver = new ResizeObserver(() => {
		this.#updateTagLayout();
	});

	/**
	 * @internal
	 */
	@observable _anchor!: HTMLElement;

	/**
	 * @internal
	 */
	_onFieldsetClick(e: MouseEvent) {
		if (this.disabled) {
			return;
		}

		if (!e.defaultPrevented) {
			// Unless something was clicked on that handled the event, e.g. tag remove button, focus the input when clicking anywhere
			this._input.focus();
		}
	}

	override connectedCallback() {
		super.connectedCallback();

		this.#resizeObserver.observe(this._contentArea);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		this.#resizeObserver.disconnect();
	}
}

export interface SearchableSelect
	extends AffixIconWithTrailing,
		FormElement,
		FormElementHelperText,
		ErrorText,
		FormElementSuccessText,
		Localized {}
applyMixinsWithObservables(
	SearchableSelect,
	AffixIconWithTrailing,
	FormElementHelperText,
	FormElementSuccessText,
	Localized
);
