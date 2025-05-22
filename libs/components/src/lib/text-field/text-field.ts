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
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import { generateRandomId } from '../../shared/utils/randomId';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { WithLightDOMFeedback } from '../../shared/feedback/mixins';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { WithCharCount } from '../../shared/char-count';
import { FormAssociatedTextField } from './text-field.form-associated';

export type TextFieldAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type TextFieldShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;

export type TextFieldSize = ExtractFromEnum<Size, Size.Condensed | Size.Normal>;

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

const installSafariWorkaroundStyleIfNeeded = (
	forElement: TextField & {
		_isSafariWorkaroundInstalled?: boolean;
	}
) => {
	if (forElement._isSafariWorkaroundInstalled) {
		return;
	}
	forElement._isSafariWorkaroundInstalled = true;

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
 * @vueModel modelValue value input `event.currentTarget.value`
 */
@errorText
@formElements
export class TextField extends WithLightDOMFeedback(
	AffixIcon(WithCharCount(DelegatesAria(FormAssociatedTextField)))
) {
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
	 * @internal
	 */
	override valueChanged(previous: string, next: string) {
		super.valueChanged(previous, next);
		this._updateControlValueIfNeeded();
		if (this.charCount && this.maxlength) {
			this._updateCharCountRemaining();
		}
	}

	/**
	 * A reference to the internal input element
	 * @internal
	 */
	control!: HTMLInputElement;

	/**
	 * Update the controls value only if it is actually different from the actual value.
	 * This is important as to not reset the browser's "dirtiness" flag on the input, which is used for min/maxlength
	 * constraints.
	 * @internal
	 */
	_updateControlValueIfNeeded() {
		if (this.control && this.control.value !== this.value) {
			this.control.value = this.value;
		}
	}

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

	override connectedCallback() {
		super.connectedCallback();

		this.proxy.setAttribute('type', this.type);
		this.validate();

		if (this.autofocus) {
			DOM.queueUpdate(() => {
				this.focus();
			});
		}

		this._updateControlValueIfNeeded();
		installSafariWorkaroundStyleIfNeeded(this);

		if (this.charCount && this.maxlength) {
			this._renderCharCountRemaining();
		}
	}

	override focus() {
		this.control?.focus();
	}

	#randomId = generateRandomId();

	/**
	 * @internal
	 */
	get _uniqueId() {
		return this.id || this.#randomId;
	}
}

export interface TextField
	extends ErrorText,
		FormElement,
		FormElementSuccessText {}
applyMixins(TextField, FormElementSuccessText);
