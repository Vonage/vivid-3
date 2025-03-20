import {
	attr,
	DOM,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import { memoizeWith } from 'ramda';
import type { Appearance, Shape, Size } from '../enums';
import {
	AffixIcon,
	type ErrorText,
	errorText,
	type FormElement,
	FormElementCharCount,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import { generateRandomId } from '../../shared/utils/randomId';
import { Reflector } from '../../shared/utils/Reflector';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { FormAssociatedTextField } from './text-field.form-associated';

export type TextFieldAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

export type TextFieldSize = Extract<Size, Size.Condensed | Size.Normal>;

/**
 * Text field sub-types
 * @public
 */
export const TextFieldType = {
	/**
	 * An email TextField
	 */
	email: 'email',

	/**
	 * A password TextField
	 */
	password: 'password',

	/**
	 * A telephone TextField
	 */
	tel: 'tel',

	/**
	 * A text TextField
	 */
	text: 'text',

	/**
	 * A URL TextField
	 */
	url: 'url',
} as const;

/**
 * Types for the text field sub-types
 * @public
 */
export type TextFieldType = typeof TextFieldType[keyof typeof TextFieldType];

// Safari does not support styling the `::placeholder` pseudo-element on slotted input
// See bug: https://bugs.webkit.org/show_bug.cgi?id=223814
// As a workaround we add a stylesheet to root of text-field to apply the styles
// Once fixed in Safari we can remove the workaround (VIV-1413)
const safariWorkaroundClassName = '_vvd-3-text-field-safari-workaround';
const getSafariWorkaroundStyleSheet = memoizeWith(
	() => '',
	() => {
		const styleSheet = new CSSStyleSheet();

		// Prevent error in environments that do not support `replaceSync` like JSDOM
		const supportsReplaceSync = 'replaceSync' in styleSheet;
		// istanbul ignore else
		if (supportsReplaceSync) {
			styleSheet.replaceSync(`
.${safariWorkaroundClassName}::placeholder {
	opacity: 1 !important;
	-webkit-text-fill-color: var(--_low-ink-color) !important;
}`);
		}

		return styleSheet;
	}
);

const installSafariWorkaroundStyle = (forElement: TextField) => {
	const root = forElement.getRootNode() as ShadowRoot | Document;
	const workaroundStyleSheet = getSafariWorkaroundStyleSheet();

	// Prevent error in environments that do not support `adoptedStyleSheets` like JSDOM
	const supportsAdoptedStyleSheets = 'adoptedStyleSheets' in root;
	if (!supportsAdoptedStyleSheets) {
		return;
	}

	if (!root.adoptedStyleSheets.includes(workaroundStyleSheet)) {
		root.adoptedStyleSheets = [
			...root.adoptedStyleSheets,
			workaroundStyleSheet,
		];
	}
};

/**
 * Base class for text-field
 *
 * @public
 * @component text-field
 * @slot leading-action-items - Used to add action items to the start of the text-field.
 * @slot action-items - Used to add action items to the end of the text-field.
 * @slot helper-text - Describes how to use the text-field. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value has changed
 * @vueModel modelValue value input `(event.currentTarget as HTMLInputElement).value`
 */
@errorText
@formElements
export class TextField extends DelegatesAria(FormAssociatedTextField) {
	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly!: boolean;
	/**
	 * @internal
	 */
	readOnlyChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.readOnly = this.readOnly;
			this.validate();
		}
	}

	/**
	 * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: autofocus
	 */
	@attr({ mode: 'boolean' })
	override autofocus!: boolean;
	/**
	 * @internal
	 */
	autofocusChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.autofocus = this.autofocus;
			this.validate();
		}
	}

	/**
	 * Sets the placeholder value of the element, generally used to provide a hint to the user.
	 * @public
	 * @remarks
	 * HTML Attribute: placeholder
	 * Using this attribute does is not a valid substitute for a labeling element.
	 */
	@attr
	placeholder!: string;
	/**
	 * @internal
	 */
	placeholderChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.placeholder = this.placeholder;
		}
	}

	/**
	 * Allows setting a type or mode of text.
	 * @public
	 * @remarks
	 * HTML Attribute: type
	 */
	@attr
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	type: TextFieldType = TextFieldType.text;
	/**
	 * @internal
	 */
	typeChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.type = this.type;
			this.validate();
		}
	}

	/**
	 * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
	 * @public
	 * @remarks
	 * HTML Attribute: list
	 */
	@attr
	list!: string;
	/**
	 * @internal
	 */
	listChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.setAttribute('list', this.list);
			this.validate();
		}
	}

	/**
	 * The maximum number of characters a user can enter.
	 * @public
	 * @remarks
	 * HTMLAttribute: maxlength
	 */
	@attr({ converter: nullableNumberConverter })
	maxlength!: number;
	/**
	 * @internal
	 */
	maxlengthChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.maxLength = this.maxlength;
			this.validate();
		}
	}

	/**
	 * The minimum number of characters a user can enter.
	 * @public
	 * @remarks
	 * HTMLAttribute: minlength
	 */
	@attr({ converter: nullableNumberConverter })
	minlength!: number;
	/**
	 * @internal
	 */
	minlengthChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.minLength = this.minlength;
			this.validate();
		}
	}

	/**
	 * A regular expression that the value must match to pass validation.
	 * @public
	 * @remarks
	 * HTMLAttribute: pattern
	 */
	@attr
	pattern!: string;
	/**
	 * @internal
	 */
	patternChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.pattern = this.pattern;
			this.validate();
		}
	}

	/**
	 * Sets the width of the element to a specified number of characters.
	 * @public
	 * @remarks
	 * HTMLAttribute: size
	 */
	@attr({ converter: nullableNumberConverter })
	size!: number;
	/**
	 * @internal
	 */
	sizeChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.size = this.size;
		}
	}

	/**
	 * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
	 * @public
	 * @remarks
	 * HTMLAttribute: spellcheck
	 */
	@attr({ mode: 'boolean' })
	override spellcheck!: boolean;
	/**
	 * @internal
	 */
	spellcheckChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.spellcheck = this.spellcheck;
		}
	}

	/**
	 * A reference to the internal input element
	 * @internal
	 */
	control!: HTMLInputElement;

	/**
	 * Selects all the text in the text field
	 *
	 * @public
	 */
	select() {
		this.control.select();
	}

	/**
	 * Handles the internal control's `input` event
	 * @internal
	 */
	handleTextInput(): void {
		this.value = this.control.value;
	}

	/**
	 * Change event handler for inner control.
	 * @remarks
	 * "Change" events are not `composable` so they will not
	 * permeate the shadow DOM boundary. This fn effectively proxies
	 * the change event, emitting a `change` event whenever the internal
	 * control emits a `change` event
	 * @internal
	 */
	handleChange(): void {
		this.$emit('change');
	}

	/** {@inheritDoc (FormAssociated:interface).validate} */
	override validate() {
		super.validate(this.control);
	}

	@attr appearance?: TextFieldAppearance;
	@attr shape?: TextFieldShape;
	@attr autoComplete?: string;

	/**
	 * The size the text-field should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr() scale?: TextFieldSize;

	/**
	 * Hints at the type of data that might be entered by the user while editing the element or its contents.
	 * This allows a browser to display an appropriate virtual keyboard.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: inputmode
	 */
	@attr({ attribute: 'inputmode' }) override inputMode!: string;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */

	@observable actionItemsSlottedContent?: HTMLElement[];
	@observable leadingActionItemsSlottedContent?: HTMLElement[];

	/**
	 * @internal
	 */
	private _labelEl: HTMLLabelElement | null = null;

	/**
	 * @internal
	 */
	labelChanged() {
		if (this._labelEl) {
			this.#handleLabelChange(this._labelEl);
		}
	}

	#handleLabelChange(labelEl: HTMLLabelElement) {
		if (!this.label) {
			labelEl.remove();
		} else {
			labelEl.textContent = this.label;
			if (!labelEl.isConnected) {
				this.appendChild(labelEl);
			}
		}
	}

	#reflectToInput?: Reflector<this, HTMLInputElement>;

	#helperTextMirrorEl?: HTMLElement;

	#helperTextSlotMutationObserver?: MutationObserver;

	override connectedCallback() {
		super.connectedCallback();

		this.proxy.setAttribute('type', this.type);
		this.validate();

		if (this.autofocus) {
			DOM.queueUpdate(() => {
				this.focus();
			});
		}

		if (!this.control) {
			// Input and label must be created outside the shadow dom to support autofill from some password managers.

			const uniqueId = this.id || generateRandomId();
			const controlId = `vvd-text-field-control-${uniqueId}`;
			const helperTextId = `vvd-text-field-helper-text-${uniqueId}`;

			const input = document.createElement('input');
			input.slot = '_control';
			input.id = controlId;
			input.className = safariWorkaroundClassName;
			this.control = input;

			input.addEventListener('input', () => {
				this.handleTextInput();
			});
			input.addEventListener('change', () => {
				this.handleChange();
			});
			input.addEventListener('blur', () => {
				this.$emit('blur', undefined, { bubbles: false });
			});
			input.addEventListener('focus', () => {
				this.$emit('focus', undefined, { bubbles: false });
			});

			this.appendChild(input);

			const label = document.createElement('label') as HTMLLabelElement;
			label.slot = '_label';
			label.htmlFor = controlId;
			this._labelEl = label;
			this.#handleLabelChange(label);

			// Helper text needs to be mirrored outside shadow DOM to be accessible to screen readers
			// The mirror still needs to become part of the flat tree to work, so it is assigned to a hidden slot
			this.#helperTextMirrorEl = document.createElement('div');
			this.#helperTextMirrorEl.id = helperTextId;
			this.#helperTextMirrorEl.slot = '_mirrored-helper-text';
			this.#updateMirroredHelperText();
			this.appendChild(this.#helperTextMirrorEl);

			installSafariWorkaroundStyle(this);
		}

		this.#reflectToInput = new Reflector(this, this.control);
		this.#reflectToInput.booleanAttribute('autofocus', 'autofocus');
		this.#reflectToInput.booleanAttribute('disabled', 'disabled');
		this.#reflectToInput.booleanAttribute('readOnly', 'readonly');
		this.#reflectToInput.booleanAttribute('required', 'required');
		this.#reflectToInput.booleanAttribute('spellcheck', 'spellcheck');
		this.#reflectToInput.attribute('list', 'list');
		this.#reflectToInput.attribute('maxlength', 'maxlength');
		this.#reflectToInput.attribute('minlength', 'minlength');
		this.#reflectToInput.attribute('pattern', 'pattern');
		this.#reflectToInput.attribute('placeholder', 'placeholder');
		this.#reflectToInput.attribute('size', 'size');
		this.#reflectToInput.attribute('autoComplete', 'autocomplete');
		this.#reflectToInput.attribute('type', 'type');
		this.#reflectToInput.attribute('inputMode', 'inputmode');
		this.#reflectToInput.attribute('ariaAtomic', 'aria-atomic');
		this.#reflectToInput.attribute('ariaBusy', 'aria-busy');
		this.#reflectToInput.attribute('ariaCurrent', 'aria-current');
		this.#reflectToInput.attribute('ariaDisabled', 'aria-disabled');
		this.#reflectToInput.attribute('ariaHasPopup', 'aria-haspopup');
		this.#reflectToInput.attribute('ariaHidden', 'aria-hidden');
		this.#reflectToInput.attribute('ariaInvalid', 'aria-invalid');
		this.#reflectToInput.attribute('ariaKeyShortcuts', 'aria-keyshortcuts');
		this.#reflectToInput.attribute('ariaLabel', 'aria-label');
		this.#reflectToInput.attribute('ariaLive', 'aria-live');
		this.#reflectToInput.attribute('ariaRelevant', 'aria-relevant');
		this.#reflectToInput.attribute(
			'ariaRoleDescription',
			'aria-roledescription'
		);
		this.#reflectToInput.property('value', 'value', true);

		this.#updateHelperTextMutationObserver();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#reflectToInput!.destroy();
		this.#reflectToInput = undefined;
		this.#updateHelperTextMutationObserver();
	}

	override focus() {
		this.control?.focus();
	}

	/**
	 * @internal
	 */
	helperTextChanged() {
		this.#updateMirroredHelperText();
	}

	/**
	 * @internal
	 */
	_helperTextSlottedContentChanged() {
		this.#updateMirroredHelperText();
		this.#updateHelperTextMutationObserver();
	}

	#updateHelperTextMutationObserver() {
		const usesHelperTextSlot = this._helperTextSlottedContent!.length;
		const shouldHaveMutationObserver = usesHelperTextSlot && this.isConnected;
		if (shouldHaveMutationObserver && !this.#helperTextSlotMutationObserver) {
			/**
			 * Mutation observer to update the helper text when the slotted content changes
			 */
			this.#helperTextSlotMutationObserver = new MutationObserver((records) => {
				if (
					records.some((record) => record.target !== this.#helperTextMirrorEl)
				) {
					this.#updateMirroredHelperText();
				}
			});
			this.#helperTextSlotMutationObserver.observe(this, {
				subtree: true,
				childList: true,
				characterData: true,
			});
		}
		if (!shouldHaveMutationObserver && this.#helperTextSlotMutationObserver) {
			this.#helperTextSlotMutationObserver.disconnect();
			this.#helperTextSlotMutationObserver = undefined;
		}
	}

	#updateMirroredHelperText() {
		let helperText = this.helperText ?? '';
		if (this._helperTextSlottedContent?.length) {
			helperText = this._helperTextSlottedContent
				.map((node) => node.innerText)
				.join(' ');
		}
		if (this.#helperTextMirrorEl) {
			this.#helperTextMirrorEl.textContent = helperText;

			if (helperText) {
				this.control.setAttribute(
					'aria-describedby',
					this.#helperTextMirrorEl.id
				);
			} else {
				this.control.removeAttribute('aria-describedby');
			}
		}
	}
}

export interface TextField
	extends AffixIcon,
		ErrorText,
		FormElement,
		FormElementCharCount,
		FormElementHelperText,
		FormElementSuccessText {}
applyMixinsWithObservables(
	TextField,
	AffixIcon,
	FormElementCharCount,
	FormElementHelperText,
	FormElementSuccessText
);
