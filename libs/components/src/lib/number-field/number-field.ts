import {
	attr,
	DOM,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import { keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import type { Appearance, Shape, Size } from '../enums';
import {
	AffixIcon,
	FormElement,
	Localized,
	WithErrorText,
	WithSuccessText,
} from '../../shared/patterns';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { WithFeedback } from '../../shared/feedback/mixins';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

export type NumberFieldAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type NumberFieldShape = ExtractFromEnum<
	Shape,
	Shape.Rounded | Shape.Pill
>;
export type NumberFieldSize = ExtractFromEnum<
	Size,
	Size.Condensed | Size.Normal
>;

const STEP_DIRECTION = {
	up: 1,
	down: -1,
};

function makeStep(element: NumberField, direction: number) {
	const value = parseFloat(element.value);
	const stepUpValue = !isNaN(value)
		? value + direction * element.step
		: element.min > 0
		? element.min
		: element.max < 0
		? element.max
		: !element.min
		? direction * element.step
		: 0;

	element.value = Number(stepUpValue.toFixed(12)).toString();
}

const buildNumberPatterns = (decimalSeparator: RegExp) => {
	const ds = decimalSeparator.source;

	return {
		invalidCharacters: new RegExp(`[^0-9\\-+e${ds}]`, 'g'),
		additionalDecimalSeparators: new RegExp(`(?<=${ds}.*)${ds}`, 'g'),
		trailingDecimalSeparator: new RegExp(`${ds}$`),
		decimalSeparator,
	};
};
const numberPatternsWithPeriod = buildNumberPatterns(/\./);
const numberPatternsWithComma = buildNumberPatterns(/,/);

const validNumber = /^-?((\d*\.\d+)|(\d+))$/;

/**
 * @public
 * @component number-field
 * @slot helper-text - Describes how to use the number-field. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Fires a custom 'input' event when the value has changed
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value has changed
 * @vueModel modelValue value input `event.currentTarget.value`
 */
export class NumberField extends WithFeedback(
	WithErrorText(
		WithSuccessText(
			FormElement(
				AffixIcon(Localized(DelegatesAria(FormAssociated(VividElement))))
			)
		)
	)
) {
	/**
	 * @internal
	 */
	override proxy = document.createElement('input');

	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly = false;

	/**
	 * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: autofocus
	 */
	@attr({ mode: 'boolean' })
	override autofocus = false;

	/**
	 * Sets the placeholder value of the element, generally used to provide a hint to the user.
	 * @public
	 * @remarks
	 * HTML Attribute: placeholder
	 * Using this attribute does is not a valid substitute for a labeling element.
	 */
	@attr placeholder!: string;

	/**
	 * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
	 * @public
	 * @remarks
	 * HTML Attribute: list
	 */
	@attr list!: string;

	/**
	 * The maximum number of characters a user can enter.
	 * @public
	 * @remarks
	 * HTMLAttribute: maxlength
	 */
	@attr({ converter: nullableNumberConverter })
	maxlength!: number;

	/**
	 * The minimum number of characters a user can enter.
	 * @public
	 * @remarks
	 * HTMLAttribute: minlength
	 */
	@attr({ converter: nullableNumberConverter })
	minlength!: number;

	/**
	 * Sets the width of the element to a specified number of characters.
	 * @public
	 * @remarks
	 * HTMLAttribute: size
	 */
	@attr({ converter: nullableNumberConverter })
	size!: number;

	/**
	 * The size the number-field should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr() scale?: NumberFieldSize;

	/**
	 * Amount to increment or decrement the value by
	 * @public
	 * @remarks
	 * HTMLAttribute: step
	 */
	@attr({ converter: nullableNumberConverter })
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	step = 1;

	stepChanged(_: number, next: number) {
		this.proxy.setAttribute(
			'step',
			Number.isFinite(next) ? next.toString() : ''
		);
	}

	/**
	 * The maximum the value can be
	 * @public
	 * @remarks
	 * HTMLAttribute: max
	 */
	@attr({ converter: nullableNumberConverter })
	max!: number;

	/**
	 * Ensures that the max is greater than the min and that the value
	 *  is less than the max
	 *
	 * @internal
	 */
	maxChanged(_: number, next: number) {
		this.max = Math.max(next, this.min ?? next);
		this.proxy.max = this.max.toString();
		this.validate();
	}

	/**
	 * The minimum the value can be
	 * @public
	 * @remarks
	 * HTMLAttribute: min
	 */
	@attr({ converter: nullableNumberConverter })
	min!: number;

	/**
	 * Ensures that the min is less than the max and that the value
	 *  is greater than the min
	 *
	 * @internal
	 */
	minChanged(_: number, next: number) {
		this.min = Math.min(next, this.max ?? next);
		this.proxy.min = this.min.toString();
		this.validate();
	}

	/**
	 * The default slotted items
	 * @internal
	 */
	@observable defaultSlottedNodes!: Node[];

	/**
	 * A reference to the internal input element
	 * @internal
	 */
	control!: HTMLInputElement;

	/**
	 * Flag to indicate that the value change is from the user input
	 * @internal
	 */
	private isUserInput = false;

	/**
	 * The value property, typed as a number.
	 *
	 * @public
	 */
	get valueAsNumber(): number {
		return parseFloat(this.value);
	}

	set valueAsNumber(next: number) {
		this.value = next.toString();
	}

	/**
	 * @internal
	 */
	override valueChanged(previous: string, next: string) {
		this.value = validNumber.test(next) ? next : '';

		if (next !== this.value) {
			return;
		}

		if (this.control && !this.isUserInput) {
			this._presentationValue = this.#valueToPresentationValue(this.value);
		}

		super.valueChanged(previous, this.value);

		if (previous !== undefined && !this.isUserInput) {
			this.$emit('input');
			this.$emit('change');
		}
	}

	/**
	 * Current value of the input field
	 * @internal
	 */
	@observable _presentationValue = '';

	/**
	 * @internal
	 */
	get _numberPatterns() {
		return this.locale.common.useCommaAsDecimalSeparator
			? numberPatternsWithComma
			: numberPatternsWithPeriod;
	}

	#valueToPresentationValue(value: string): string {
		return value.replace(
			'.',
			this.locale.common.useCommaAsDecimalSeparator ? ',' : '.'
		);
	}

	#inputToPresentationValue(input: string): string {
		return input
			.replace(this._numberPatterns.invalidCharacters, '')
			.replace(this._numberPatterns.additionalDecimalSeparators, '');
	}

	#presentationValueToValue(presentationValue: string): string {
		const candidate = presentationValue
			.replace(this._numberPatterns.trailingDecimalSeparator, '')
			.replace(this._numberPatterns.decimalSeparator, '.');

		return validNumber.test(candidate) ? candidate : '';
	}

	/** {@inheritDoc (FormAssociated:interface).validate} */
	override validate() {
		super.validate(this.control);
	}

	/**
	 * Increments the value using the step value
	 *
	 * @public
	 */
	stepUp() {
		makeStep(this, STEP_DIRECTION.up);
	}

	/**
	 * Decrements the value using the step value
	 *
	 * @public
	 */
	stepDown() {
		makeStep(this, STEP_DIRECTION.down);
	}

	/**
	 * Sets up the initial state of the number field
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();

		this.proxy.setAttribute('type', 'number');
		this.validate();
		this._presentationValue = this.#valueToPresentationValue(this.value);

		if (this.autofocus) {
			DOM.queueUpdate(() => {
				this.focus();
			});
		}
	}

	/**
	 * Selects all the text in the number field
	 *
	 * @public
	 */
	select() {
		this.control.select();

		/**
		 * The select event does not permeate the shadow DOM boundary.
		 * This fn effectively proxies the select event,
		 * emitting a `select` event whenever the internal
		 * control emits a `select` event
		 */
		this.$emit('select');
	}

	/**
	 * Handles the internal control's `input` event
	 * @internal
	 */
	handleTextInput() {
		this._presentationValue = this.#inputToPresentationValue(
			this.control.value
		);

		if (this.control.value !== this._presentationValue) {
			this.control.value = this._presentationValue;
		}

		this.isUserInput = true;
		this.value = this.#presentationValueToValue(this._presentationValue);
		this.isUserInput = false;
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
	handleChange() {
		this.$emit('change');
	}

	/**
	 * Handles the internal control's `keydown` event
	 * @internal
	 */
	handleKeyDown(e: KeyboardEvent): boolean {
		const key = e.key;

		switch (key) {
			case keyArrowUp:
				this.stepUp();
				return false;

			case keyArrowDown:
				this.stepDown();
				return false;
		}

		return true;
	}

	@attr({ attribute: 'increment-button-aria-label' }) incrementButtonAriaLabel:
		| string
		| null = null;
	@attr({ attribute: 'decrement-button-aria-label' }) decrementButtonAriaLabel:
		| string
		| null = null;
	@attr appearance?: NumberFieldAppearance;
	@attr shape?: NumberFieldShape;
	@attr autoComplete?: string;
}
