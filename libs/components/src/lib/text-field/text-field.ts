import {
	applyMixins,
	TextField as FoundationTextfield,
} from '@microsoft/fast-foundation';
import { attr, Observable, observable } from '@microsoft/fast-element';
import type { Appearance, Shape } from '../enums';
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

export type TextFieldAppearance = Extract<
Appearance,
Appearance.Fieldset | Appearance.Ghost
>;
export type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

const propertiesForwardedToInternalInput = new Map<
keyof TextField,
{
	type: 'boolean-attr' | 'attr' | 'prop';
	target: string;
}
>([
	['autofocus', { target: 'autofocus', type: 'boolean-attr' }],
	['disabled', { target: 'disabled', type: 'boolean-attr' }],
	['readOnly', { target: 'readonly', type: 'boolean-attr' }],
	['required', { target: 'required', type: 'boolean-attr' }],
	['spellcheck', { target: 'spellcheck', type: 'boolean-attr' }],
	['list', { target: 'list', type: 'attr' }],
	['maxlength', { target: 'maxlength', type: 'attr' }],
	['minlength', { target: 'minlength', type: 'attr' }],
	['pattern', { target: 'pattern', type: 'attr' }],
	['placeholder', { target: 'placeholder', type: 'attr' }],
	['size', { target: 'size', type: 'attr' }],
	['autoComplete', { target: 'autocomplete', type: 'attr' }],
	['type', { target: 'type', type: 'attr' }],
	['ariaAtomic', { target: 'aria-atomic', type: 'attr' }],
	['ariaBusy', { target: 'aria-busy', type: 'attr' }],
	['ariaControls', { target: 'aria-controls', type: 'attr' }],
	['ariaCurrent', { target: 'aria-current', type: 'attr' }],
	['ariaDescribedby', { target: 'aria-describedby', type: 'attr' }],
	['ariaDetails', { target: 'aria-details', type: 'attr' }],
	['ariaDisabled', { target: 'aria-disabled', type: 'attr' }],
	['ariaErrormessage', { target: 'aria-errormessage', type: 'attr' }],
	['ariaFlowto', { target: 'aria-flowto', type: 'attr' }],
	['ariaHaspopup', { target: 'aria-haspopup', type: 'attr' }],
	['ariaHidden', { target: 'aria-hidden', type: 'attr' }],
	['ariaInvalid', { target: 'aria-invalid', type: 'attr' }],
	['ariaKeyshortcuts', { target: 'aria-keyshortcuts', type: 'attr' }],
	['ariaLabel', { target: 'aria-label', type: 'attr' }],
	['ariaLabelledby', { target: 'aria-labelledby', type: 'attr' }],
	['ariaLive', { target: 'aria-live', type: 'attr' }],
	['ariaOwns', { target: 'aria-owns', type: 'attr' }],
	['ariaRelevant', { target: 'aria-relevant', type: 'attr' }],
	['ariaRoledescription', { target: 'aria-roledescription', type: 'attr' }],
	['value', { target: 'value', type: 'prop' }],
]);

/**
 * Base class for text-field
 *
 * @public
 * @slot leading-action-items - Used to add action items to the start of the text-field.
 * @slot action-items - Used to add action items to the end of the text-field.
 *
 */
@errorText
@formElements
export class TextField extends FoundationTextfield {
	@attr appearance?: TextFieldAppearance;
	@attr shape?: TextFieldShape;
	@attr autoComplete?: string;

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

	override connectedCallback() {
		super.connectedCallback();

		if (!this.control) {
			// Input and label must be created outside the shadow dom to support autofill from some password managers.

			const uniqueId = this.id || generateRandomId();
			const controlId = `vvd-text-field-control-${uniqueId}`;

			const input = document.createElement('input');
			input.slot = '_control';
			input.id = controlId;
			this.control = input;

			const notifier = Observable.getNotifier(this);
			for (const prop of propertiesForwardedToInternalInput.keys()) {
				notifier.subscribe(this.#propertyChangeHandler, prop);
				this.#propertyChangeHandler.handleChange(this, prop);
			}

			input.addEventListener('input', () => {
				this.handleTextInput();
			});
			input.addEventListener('change', () => {
				this.handleChange();
			});
			input.addEventListener('blur', () => {
				this.$emit('blur');
			});
			input.addEventListener('focus', () => {
				this.$emit('focus');
			});

			this.appendChild(input);

			const label = document.createElement('label') as HTMLLabelElement;
			label.slot = '_label';
			label.htmlFor = controlId;
			this._labelEl = label;
			this.#handleLabelChange(label);
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		const notifier = Observable.getNotifier(this);
		for (const prop of propertiesForwardedToInternalInput.keys()) {
			notifier.unsubscribe(this.#propertyChangeHandler, prop);
		}
	}

	#propertyChangeHandler = {
		handleChange(source: TextField, propertyName: keyof TextField) {
			const { type, target } = propertiesForwardedToInternalInput.get(propertyName)!;
			const value = source[propertyName];

			switch (type) {
				case 'boolean-attr':
					if (Boolean(value)) {
						source.control.setAttribute(target, '');
					} else {
						source.control.removeAttribute(target);
					}
					break;
				case 'attr':
					if (value !== undefined && value !== null) {
						source.control.setAttribute(target, String(value));
					} else {
						source.control.removeAttribute(target);
					}
					break;
				case 'prop':
					(source.control as any)[target] = value as any;
					break;
			}
		},
	};

	override focus() {
		this.control?.focus();
	}
}

export interface TextField extends AffixIcon, ErrorText, FormElement, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(TextField, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
