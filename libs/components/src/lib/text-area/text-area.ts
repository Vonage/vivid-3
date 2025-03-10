import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import {
	errorText,
	type ErrorText,
	type FormElement,
	FormElementCharCount,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import { Reflector } from '../../shared/utils/Reflector';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { FormAssociatedTextArea } from './text-area.form-associated';

export type TextAreaWrap = 'hard' | 'soft' | 'off';

/**
 * Resize mode for a TextArea
 * @public
 */
export const TextAreaResize = {
	/**
	 * No resize.
	 */
	none: 'none',

	/**
	 * Resize vertically and horizontally.
	 */
	both: 'both',

	/**
	 * Resize horizontally.
	 */
	horizontal: 'horizontal',

	/**
	 * Resize vertically.
	 */
	vertical: 'vertical',
} as const;

/**
 * Types for the Text Area resize mode
 * @public
 */
export type TextAreaResize = typeof TextAreaResize[keyof typeof TextAreaResize];

/**
 * @public
 * @component text-area
 * @slot helper-text - Describes how to use the text-area. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Emits a custom 'change' event when the textarea emits a change event
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class TextArea extends DelegatesAria(FormAssociatedTextArea) {
	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	readOnly: boolean;
	/**
	 * @internal
	 */
	readOnlyChanged() {
		if (this.proxy instanceof HTMLTextAreaElement) {
			this.proxy.readOnly = this.readOnly;
		}
	}

	/**
	 * The resize mode of the element.
	 * @public
	 * @remarks
	 * HTML Attribute: resize
	 */
	@attr
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	resize: TextAreaResize = TextAreaResize.none;

	/**
	 * A reference to the internal textarea element
	 * @internal
	 */
	control!: HTMLTextAreaElement;

	/**
	 * Indicates that this element should get focus after the page finishes loading.
	 * @public
	 * @remarks
	 * HTML Attribute: autofocus
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	autofocus: boolean;
	/**
	 * @internal
	 */
	autofocusChanged() {
		if (this.proxy instanceof HTMLTextAreaElement) {
			this.proxy.autofocus = this.autofocus;
		}
	}

	/**
	 * The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id | id} of the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form | form} the element is associated to
	 * @public
	 */
	@attr({ attribute: 'form' })
	// @ts-expect-error Type is incorrectly non-optional
	formId: string;

	/**
	 * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
	 * @public
	 * @remarks
	 * HTML Attribute: list
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	list: string;
	/**
	 * @internal
	 */
	listChanged() {
		if (this.proxy instanceof HTMLTextAreaElement) {
			this.proxy.setAttribute('list', this.list);
		}
	}

	/**
	 * The maximum number of characters a user can enter.
	 * @public
	 * @remarks
	 * HTMLAttribute: maxlength
	 */
	@attr({ converter: nullableNumberConverter })
	// @ts-expect-error Type is incorrectly non-optional
	maxlength: number;
	/**
	 * @internal
	 */
	maxlengthChanged() {
		if (this.proxy instanceof HTMLTextAreaElement) {
			this.proxy.maxLength = this.maxlength;
		}
	}

	/**
	 * The minimum number of characters a user can enter.
	 * @public
	 * @remarks
	 * HTMLAttribute: minlength
	 */
	@attr({ converter: nullableNumberConverter })
	// @ts-expect-error Type is incorrectly non-optional
	minlength: number;
	/**
	 * @internal
	 */
	minlengthChanged() {
		if (this.proxy instanceof HTMLTextAreaElement) {
			this.proxy.minLength = this.minlength;
		}
	}

	/**
	 * The name of the element.
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	name: string;

	/**
	 * Sets the placeholder value of the element, generally used to provide a hint to the user.
	 * @public
	 * @remarks
	 * HTML Attribute: placeholder
	 * Using this attribute does is not a valid substitute for a labeling element.
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	placeholder: string;

	/**
	 * Sizes the element horizontally by a number of character columns.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: cols
	 */
	@attr({ converter: nullableNumberConverter, mode: 'fromView' })
	cols = 20;

	/**
	 * Sizes the element vertically by a number of character rows.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: rows
	 */
	@attr({ converter: nullableNumberConverter, mode: 'fromView' })
	// @ts-expect-error Type is incorrectly non-optional
	rows: number;

	/**
	 * Sets if the element is eligible for spell checking
	 * but the UA.
	 * @public
	 * @remarks
	 * HTML Attribute: spellcheck
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	spellcheck: boolean;
	/**
	 * @internal
	 */
	spellcheckChanged() {
		if (this.proxy instanceof HTMLTextAreaElement) {
			this.proxy.spellcheck = this.spellcheck;
		}
	}

	/**
	 * @internal
	 */
	@observable
	defaultSlottedNodes!: Node[];

	/**
	 * Selects all the text in the text area
	 *
	 * @public
	 */
	select() {
		this.control.select();
	}

	/**
	 * @internal
	 */
	handleTextInput = (): void => {
		this.value = this.control.value;
	};

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
	override validate(): void {
		super.validate(this.control);
	}

	/**
	 * The wrap attribute
	 *
	 * @public
	 * HTML Attribute: wrap
	 */
	@attr wrap?: TextAreaWrap;

	#reflectToTextArea?: Reflector<this, HTMLTextAreaElement>;

	override connectedCallback() {
		super.connectedCallback();
		this.#reflectToTextArea = new Reflector(this, this.control);
		this.#reflectToTextArea.property('value', 'value', true);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#reflectToTextArea!.destroy();
	}
}

export interface TextArea
	extends FormElement,
		ErrorText,
		FormElementCharCount,
		FormElementHelperText,
		FormElementSuccessText {}
applyMixinsWithObservables(
	TextArea,
	FormElementCharCount,
	FormElementHelperText,
	FormElementSuccessText
);
