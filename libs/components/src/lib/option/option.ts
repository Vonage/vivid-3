import { attr, observable, volatile } from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';
import type { OptionTagConnotation } from '../searchable-select/option-tag';

/**
 * Determines if the element is a {@link (ListboxOption:class)}
 *
 * @param element - the element to test.
 * @public
 */
export function isListboxOption(el: Element): el is ListboxOption {
	return (
		isHTMLElement(el) &&
		((el.getAttribute('role') as string) === 'option' ||
			el instanceof HTMLOptionElement ||
			el instanceof ListboxOption)
	);
}
/**
 * An Option Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#option | ARIA option }.
 *
 * @public
 * @component option
 * @slot icon - The preferred way to add an icon to the component.
 * @slot trailing-meta - For additional elements at the end of the Option.
 * @testAction click click #locator
 */
export class ListboxOption extends HostSemantics(
	AffixIconWithTrailing(VividElement)
) {
	/**
	 * @internal
	 */
	proxy: HTMLOptionElement;

	/**
	 * The checked state is used when the parent listbox is in multiple selection mode.
	 * To avoid accessibility conflicts, the checked state should not be present in
	 * single selection mode.
	 *
	 * @public
	 */
	@attr({
		converter: {
			fromView: (value) => {
				if (value === true || value === 'true') {
					return true;
				}
				if (value === false || value === 'false') {
					return false;
				}
				return undefined;
			},
			toView: (value) => value,
		},
	})
	checked?: boolean;

	/**
	 * The defaultSelected state of the option.
	 * @public
	 * @remarks
	 * HTML Attribute: selected
	 */
	@attr({ attribute: 'selected', mode: 'boolean' })
	defaultSelected = false;
	protected defaultSelectedChanged(): void {
		if (!this.dirtySelected) {
			this.selected = this.defaultSelected;
			if (this.proxy instanceof HTMLOptionElement) {
				this.proxy.selected = this.defaultSelected;
			}
		}
		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.defaultSelected = this.defaultSelected;
		}
	}

	/**
	 * Tracks whether the "selected" property has been changed.
	 * @internal
	 */
	private dirtySelected = false;

	/**
	 * The disabled state of the option.
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	disabled: boolean;
	protected disabledChanged(): void {
		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.disabled = this.disabled;
		}
	}

	/**
	 * @deprecated Use `defaultSelected` instead.
	 */
	get selectedAttribute() {
		return this.defaultSelected;
	}
	set selectedAttribute(value: boolean) {
		this.defaultSelected = value;
	}

	/**
	 * The checked state of the control.
	 *
	 * @public
	 */
	@attr({ attribute: 'current-selected', mode: 'boolean' })
	selected!: boolean;
	protected selectedChanged(): void {
		if (!this.dirtySelected) {
			this.dirtySelected = true;
		}

		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.selected = this.selected;
		}
	}

	/**
	 * The value of the option.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ attribute: 'value' })
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	value = '';

	protected valueChanged() {
		if (typeof this.value !== 'string') {
			this.value = '';
			return;
		}

		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.value = this.value;
		}
	}

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: text
	 */
	@attr({
		attribute: 'label',
	})
	_label?: string;

	get label(): string {
		return this._label ?? this.text;
	}

	set label(value: string) {
		this._label = value;
	}

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: text
	 */
	@attr({
		attribute: 'text',
	})
	_text?: string;

	set text(value) {
		this._text = value;
	}

	get text() {
		return this._text ?? '';
	}

	/**
	 * Provides an accessible name for use by parent components.
	 * Note: Does not implement full accessible name computation, e.g. slotted content is missed.
	 * @internal
	 */
	_getAccessibleName(): string {
		return this.ariaLabel || this.text || '';
	}

	get form(): HTMLFormElement | null {
		return null;
	}

	/**
	 * Whether to appear highlighted to indicate visual focus for keyboard interactions.
	 * @internal
	 */
	@observable _highlighted = false;

	/**
	 * Whether selected options should be decorated with a checkmark.
	 * @internal
	 */
	@observable _displayCheckmark = false;

	/**
	 * Text to highlighted as matching a search query.
	 * @remarks
	 * HTML Attribute: matched-text
	 */
	@attr({ attribute: 'matched-text' }) matchedText?: string;

	/**
	 * Search text set by a parent component.
	 * @internal
	 */
	@observable _vvdSearchText = '';

	@volatile
	get _hasMatchedText() {
		return Boolean(this.matchedText ?? this._vvdSearchText);
	}

	/**
	 * Whether the option is considered matching by a parent component.
	 * @internal
	 */
	@observable _isNotMatching = false;

	/**
	 * From is inclusive, to is exclusive.
	 * @internal
	 */
	@volatile
	get _matchedRange() {
		const matchedText = this.matchedText ?? this._vvdSearchText;
		if (matchedText) {
			const matchIndex = this.text
				.toLowerCase()
				.indexOf(matchedText.toLowerCase());
			return matchIndex === -1
				? { from: 0, to: 0 }
				: {
						from: matchIndex,
						to: matchIndex + matchedText.length,
				  };
		}
		return { from: 0, to: 0 };
	}

	/**
	 * When displayed as a tag, the connotation of the tag.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: tag-connotation
	 */
	@attr({ attribute: 'tag-connotation' }) tagConnotation?: OptionTagConnotation;

	constructor(
		text?: string,
		value?: string,
		defaultSelected?: boolean,
		selected?: boolean
	) {
		super();

		if (text) {
			this.text = text;
		}

		if (value) {
			this.value = value;
		}

		if (defaultSelected) {
			this.defaultSelected = defaultSelected;
		}

		if (selected) {
			this.selected = selected;
		}

		this.proxy = new Option(
			this.text,
			this.value,
			this.defaultSelected,
			this.selected
		);
		// @ts-expect-error Propery is used before it is assigned
		this.proxy.disabled = this.disabled;
	}

	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();

		// Initialize selected from defaultSelected if not already set
		if (!this.dirtySelected) {
			this.selected = this.defaultSelected;
			this.dirtySelected = false;
		}
	}
}
