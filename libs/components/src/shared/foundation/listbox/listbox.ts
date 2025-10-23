import { attr, observable, Observable } from '@microsoft/fast-element';
import {
	findLastIndex,
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyEnter,
	keyEscape,
	keyHome,
	keySpace,
	keyTab,
	uniqueId,
} from '@microsoft/fast-web-utilities';
import {
	isListboxOption,
	type ListboxOption,
} from '../../../lib/option/option';
import { VividElement } from '../vivid-element/vivid-element';

export class Listbox extends VividElement {
	/**
	 * The internal unfiltered list of selectable options.
	 *
	 * @internal
	 */
	protected _options: ListboxOption[] = [];

	/**
	 * The first selected option.
	 *
	 * @internal
	 */
	get firstSelectedOption(): ListboxOption {
		return this.selectedOptions[0] ?? null;
	}

	/**
	 * The number of options.
	 *
	 * @public
	 */
	get length(): number {
		return this.options.length;
	}

	/**
	 * The list of options.
	 *
	 * @public
	 */
	get options(): ListboxOption[] {
		Observable.track(this, 'options');
		return this._options;
	}

	set options(value: ListboxOption[]) {
		const prev = this._options;
		this._options = value;
		Observable.notify(this, 'options');

		if (this.$fastController.isConnected) {
			const newSelectedIndex = this._newDefaultSelectedIndex(
				prev,
				value,
				this.selectedIndex
			);
			if (newSelectedIndex !== null) {
				this.selectedIndex = newSelectedIndex;
			}
		}
	}

	/**
	 * The disabled state of the listbox.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: `disabled`
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	disabled: boolean;

	/**
	 * The index of the selected option.
	 *
	 * @public
	 */
	@observable
	selectedIndex = -1;

	/**
	 * A collection of the selected options.
	 *
	 * @public
	 */
	@observable
	selectedOptions: ListboxOption[] = [];

	/**
	 * A standard `click` event creates a `focus` event before firing, so a
	 * `mousedown` event is used to skip that initial focus.
	 *
	 * @internal
	 */
	protected shouldSkipFocus = false;

	/**
	 * A static filter to include only selectable options.
	 *
	 * @param n - element to filter
	 * @public
	 */
	static slottedOptionFilter = (n: HTMLElement) =>
		isListboxOption(n) && !n.hidden;

	/**
	 * The default slotted elements.
	 *
	 * @internal
	 */
	@observable
	slottedOptions!: Element[];

	/**
	 * Typeahead timeout in milliseconds.
	 *
	 * @internal
	 */
	protected static readonly TYPE_AHEAD_TIMEOUT_MS = 1000;

	/**
	 * The current typeahead buffer string.
	 *
	 * @internal
	 */
	@observable
	protected typeaheadBuffer = '';

	/**
	 * Flag for the typeahead timeout expiration.
	 *
	 * @internal
	 */
	protected typeaheadExpired = true;

	/**
	 * The timeout ID for the typeahead handler.
	 *
	 * @internal
	 */
	protected typeaheadTimeout = -1;

	/**
	 * Handle click events for listbox options.
	 *
	 * @internal
	 */
	clickHandler(e: MouseEvent): boolean | void {
		const captured = (e.target as HTMLElement).closest(
			`option,[role=option],[data-vvd-component=option]`
		) as ListboxOption;

		if (captured && !captured.disabled) {
			this.selectedIndex = this.options.indexOf(captured);
			return true;
		}
	}

	/**
	 * Ensures that the provided option is focused and scrolled into view.
	 *
	 * @param optionToFocus - The option to focus
	 * @internal
	 */
	protected focusAndScrollOptionIntoView(
		optionToFocus: ListboxOption | null = this.firstSelectedOption
	): void {
		// To ensure that the browser handles both `focus()` and `scrollIntoView()`, the
		// timing here needs to guarantee that they happen on different frames. Since this
		// function is typically called from the `openChanged` observer, `DOM.queueUpdate`
		// causes the calls to be grouped into the same frame. To prevent this,
		// `requestAnimationFrame` is used instead of `DOM.queueUpdate`.
		if (this.contains(document.activeElement) && optionToFocus !== null) {
			optionToFocus.focus();
			requestAnimationFrame(() => {
				optionToFocus.scrollIntoView({ block: 'nearest' });
			});
		}
	}

	/**
	 * Handles `focusin` actions for the component. When the component receives focus,
	 * the list of selected options is refreshed and the first selected option is scrolled
	 * into view.
	 *
	 * @internal
	 */
	focusinHandler(e: FocusEvent): void {
		if (!this.shouldSkipFocus && e.target === e.currentTarget) {
			this.setSelectedOptions();
			this.focusAndScrollOptionIntoView();
		}

		this.shouldSkipFocus = false;
	}

	/**
	 * Returns the options which match the current typeahead buffer.
	 *
	 * @internal
	 */
	protected getTypeaheadMatches(): ListboxOption[] {
		const pattern = this.typeaheadBuffer.replace(
			/[.*+\-?^${}()|[\]\\]/g,
			'\\$&'
		);
		const re = new RegExp(`^${pattern}`, 'gi');
		return this.options.filter((o: ListboxOption) => o.text.trim().match(re));
	}

	protected getNextSelectableIndex(fromIndex: number) {
		const nextSelectableOption = this.options.reduce<ListboxOption | null>(
			(nextSelectableOption, thisOption, index) =>
				!nextSelectableOption && !thisOption.disabled && index >= fromIndex
					? thisOption
					: nextSelectableOption,
			null
		);

		return this.options.indexOf(nextSelectableOption as any);
	}

	/**
	 * Handles external changes to child options.
	 *
	 * @param source - the source object
	 * @param propertyName - the property
	 *
	 * @internal
	 */
	handleChange(source: any, propertyName: string) {
		switch (propertyName) {
			case 'selected': {
				if (Listbox.slottedOptionFilter(source)) {
					this.selectedIndex = this.options.indexOf(source);
				}
				this.setSelectedOptions();
				break;
			}
		}
	}

	/**
	 * Moves focus to an option whose label matches characters typed by the user.
	 * Consecutive keystrokes are batched into a buffer of search text used
	 * to match against the set of options.  If `TYPE_AHEAD_TIMEOUT_MS` passes
	 * between consecutive keystrokes, the search restarts.
	 *
	 * @param key - the key to be evaluated
	 *
	 * @internal
	 */
	handleTypeAhead(key: string): void {
		if (this.typeaheadTimeout) {
			window.clearTimeout(this.typeaheadTimeout);
		}

		this.typeaheadTimeout = window.setTimeout(
			() => (this.typeaheadExpired = true),
			Listbox.TYPE_AHEAD_TIMEOUT_MS
		);

		this.typeaheadBuffer = `${
			this.typeaheadExpired ? '' : this.typeaheadBuffer
		}${key}`;
	}

	/**
	 * Handles `keydown` actions for listbox navigation and typeahead.
	 *
	 * @internal
	 */
	keydownHandler(e: KeyboardEvent): boolean | void {
		if (this.disabled) {
			return true;
		}

		this.shouldSkipFocus = false;

		const key = e.key;

		switch (key) {
			// Select the first available option
			case keyHome: {
				if (!e.shiftKey) {
					e.preventDefault();
					this.selectFirstOption();
				}
				break;
			}

			// Select the next selectable option
			case keyArrowDown: {
				if (!e.shiftKey) {
					e.preventDefault();
					this.selectNextOption();
				}
				break;
			}

			// Select the previous selectable option
			case keyArrowUp: {
				if (!e.shiftKey) {
					e.preventDefault();
					this.selectPreviousOption();
				}
				break;
			}

			// Select the last available option
			case keyEnd: {
				e.preventDefault();
				this.selectLastOption();
				break;
			}

			case keyTab: {
				this.focusAndScrollOptionIntoView();
				return true;
			}

			case keyEnter:
			case keyEscape:
				return true;

			// @ts-expect-error - fallthrough case
			case keySpace:
				if (this.typeaheadExpired) {
					return true;
				}

			// fallthrough:
			default: {
				if (key.length === 1) {
					// Send key to Typeahead handler
					this.handleTypeAhead(`${key}`);
				}
				return true;
			}
		}
	}

	/**
	 * Prevents `focusin` events from firing before `click` events when the
	 * element is unfocused.
	 *
	 * @internal
	 */
	mousedownHandler(_: MouseEvent): boolean | void {
		this.shouldSkipFocus = !this.contains(document.activeElement);
		return true;
	}

	/**
	 * Updates the list of selected options when the `selectedIndex` changes.
	 *
	 * @param prev - the previous selected index value
	 * @param next - the current selected index value
	 *
	 * @internal
	 */
	selectedIndexChanged(prev: number | undefined, next: number): void {
		const validNext = this._validSelectedIndex(next);
		if (next !== validNext) {
			this.selectedIndex = validNext;
			return;
		}
		this.setSelectedOptions();
	}

	protected _validSelectedIndex(index: number): number {
		const outOfRange = index > this.options.length - 1 || index < -1;
		return outOfRange ? -1 : index;
	}

	/**
	 * Updates the selectedness of each option when the list of selected options changes.
	 *
	 * @internal
	 */
	protected selectedOptionsChanged(
		_: ListboxOption[] | undefined,
		next: ListboxOption[]
	): void {
		const filteredNext = next.filter(Listbox.slottedOptionFilter);
		this.options.forEach((o) => {
			const notifier = Observable.getNotifier(o);
			notifier.unsubscribe(this, 'selected');
			o.selected = filteredNext.includes(o);
			notifier.subscribe(this, 'selected');
		});
	}

	/**
	 * Moves focus to the first selectable option.
	 *
	 * @public
	 */
	selectFirstOption(): void {
		if (!this.disabled) {
			this.selectedIndex = this.options.findIndex((o) => !o.disabled);
		}
	}

	/**
	 * Moves focus to the last selectable option.
	 *
	 * @internal
	 */
	selectLastOption(): void {
		if (!this.disabled) {
			this.selectedIndex = findLastIndex(this.options, (o) => !o.disabled);
		}
	}

	/**
	 * Moves focus to the next selectable option.
	 *
	 * @internal
	 */
	selectNextOption(): void {
		if (!this.disabled && this.selectedIndex < this.options.length - 1) {
			this.selectedIndex += 1;
		}
	}

	/**
	 * Moves focus to the previous selectable option.
	 *
	 * @internal
	 */
	selectPreviousOption(): void {
		if (!this.disabled && this.selectedIndex > 0) {
			this.selectedIndex = this.selectedIndex - 1;
		}
	}

	/// For this options change, determine if selectedIndex should change based on defaultSelected. Otherwise, returns null.
	protected _newDefaultSelectedIndex(
		prev: ListboxOption[],
		next: ListboxOption[],
		currentSelectedIndex: number
	): number | null {
		// When a new option with defaultSelected=true is added, select it
		for (const [index, newOption] of next.entries()) {
			if (this._isDefaultSelected(newOption) && !prev.includes(newOption)) {
				return index;
			}
		}
		return null;
	}

	/// Whether an option should be considered defaultSelected
	protected _isDefaultSelected(option: ListboxOption) {
		return option.defaultSelected;
	}

	/**
	 * @internal
	 */
	@observable _activeDescendant: string | null = null;

	/**
	 * Sets an option as selected and gives it focus.
	 *
	 * @public
	 */
	protected setSelectedOptions() {
		this.selectedOptions =
			this.selectedIndex !== -1 ? [this.options[this.selectedIndex]] : [];
		this._activeDescendant = this.firstSelectedOption?.id ?? '';
		this.focusAndScrollOptionIntoView();
	}

	/**
	 * Updates the list of options and resets the selected option when the slotted option content changes.
	 *
	 * @internal
	 */
	slottedOptionsChanged(_: Element[] | undefined, next: Element[]) {
		this.options = next.reduce<ListboxOption[]>((options, item) => {
			if (isListboxOption(item)) {
				options.push(item);
			}
			return options;
		}, []);

		const setSize = `${this.options.length}`;
		this.options.forEach((option, index) => {
			if (!option.id) {
				option.id = uniqueId('option-');
			}
			option.ariaPosInSet = `${index + 1}`;
			option.ariaSetSize = setSize;
		});
	}

	/**
	 * Updates the filtered list of options when the typeahead buffer changes.
	 *
	 * @internal
	 */
	typeaheadBufferChanged(_prev: string, _next: string): void {
		if (this.$fastController.isConnected) {
			const typeaheadMatches = this.getTypeaheadMatches();

			if (typeaheadMatches.length) {
				const selectedIndex = this.options.indexOf(typeaheadMatches[0]);
				if (selectedIndex > -1) {
					this.selectedIndex = selectedIndex;
				}
			}

			this.typeaheadExpired = false;
		}
	}
}
