import {
	attr,
	type BindingObserver,
	defaultExecutionContext,
	observable,
	Observable,
} from '@microsoft/fast-element';
import type { TextField } from '../../lib/text-field/text-field';
import type { Button } from '../../lib/button/button';
import { handleEscapeKeyAndStopPropogation } from '../dialog';
import { FormElementHelperText, Localized, TrappedFocus } from '../patterns';
import { applyMixinsWithObservables } from '../utils/applyMixinsWithObservables';
import { FormAssociatedPickerField } from './picker-field.form-associated';

/**
 * Base class for picker fields. Picker fields consist of a text field with a button that opens a popup that allows
 * picking values.
 */
export abstract class PickerField extends FormAssociatedPickerField {
	// --- Attributes ---

	/**
	 * @internal
	 */
	abstract label: string;

	/**
	 * The initial value of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ attribute: 'value' })
	override initialValue!: string;

	/**
	 * The current value of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: current-value
	 */
	@attr({ attribute: 'current-value' })
	override currentValue!: string;

	/**
	 * Whether the date-picker is readonly.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly = false;

	/**
	 * @internal
	 */
	readOnlyChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.readOnly = this.readOnly;
			this.validate();
		}
	}

	// --- Refs ---

	/**
	 * @internal
	 */
	_textFieldEl!: TextField;
	/**
	 * @internal
	 */
	_dialogEl!: HTMLElement;
	/**
	 * @internal
	 */
	_pickerButtonEl!: Button;

	// --- Core ---

	constructor() {
		super();
		this.value = '';
	}

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();

		document.addEventListener('click', this.#dismissOnClickOutside);
		this.addEventListener('focusin', this.#onFocusIn);
		this.addEventListener('focusout', this.#onFocusOut);

		this.#startObservingLocaleChanges();
	}

	/**
	 * @internal
	 */
	override disconnectedCallback() {
		super.disconnectedCallback();

		document.removeEventListener('click', this.#dismissOnClickOutside);

		this.removeEventListener('focusin', this.#onFocusIn);
		this.removeEventListener('focusout', this.#onFocusOut);

		this.#stopObservingLocaleChanges();
	}

	#onFocusIn = () => {
		this.$emit('focus', undefined, { bubbles: false });
	};

	#onFocusOut = () => {
		this.$emit('blur', undefined, { bubbles: false });
	};

	/**
	 * @internal
	 */
	abstract errorValidationMessage: string;

	/**
	 * @internal
	 */
	override validate() {
		// When error-text is present, validate() is skipped and the error-text is used instead

		// Otherwise, super.validate() will use validity of the proxy
		// We can use .setCustomValidity to force any custom error on it here
		if (this.proxy) {
			this.proxy.setCustomValidity(this._getCustomValidationError() ?? '');
		}

		super.validate(this._textFieldEl?.querySelector('input') ?? undefined);
	}

	/**
	 * @internal
	 */
	abstract _getCustomValidationError(): string | null;

	// Reformat the presentation value when the locale changes
	#localeChangeHandler = {
		handleChange: () => {
			this._updatePresentationValue();
		},
	};
	#localeChangeObserver!: BindingObserver;
	#startObservingLocaleChanges() {
		this.#localeChangeObserver = Observable.binding(
			() => this.locale,
			this.#localeChangeHandler
		);
		this.#localeChangeObserver.observe(this, defaultExecutionContext);
	}
	#stopObservingLocaleChanges() {
		this.#localeChangeObserver.disconnect();
	}

	// --- Popup ---

	/**
	 * @internal
	 */
	@observable _popupOpen = false;

	#dismissOnClickOutside = (event: MouseEvent) => {
		if (!this._popupOpen) {
			return;
		}

		const path = event.composedPath();
		const elementsToIgnoreClicksOn = [this._dialogEl, this._pickerButtonEl];
		if (!elementsToIgnoreClicksOn.some((element) => path.includes(element))) {
			this._closePopup(false);
		}
	};

	#openPopupIfPossible() {
		if (!this.readOnly) {
			this._popupOpen = true;
		}
	}

	/**
	 * @internal
	 */
	_closePopup(restoreFocusToTextField = true) {
		this._popupOpen = false;

		if (restoreFocusToTextField) {
			this._textFieldEl.focus();
		}
	}

	/**
	 * On keydown anywhere in the picker.
	 * @internal
	 */
	_onBaseKeyDown(event: KeyboardEvent) {
		// Close dialog on Escape
		if (this._popupOpen && handleEscapeKeyAndStopPropogation(event)) {
			this._closePopup();
			return false;
		}

		if (this._trappedFocus(event, () => this._focusableElsWithinDialog())) {
			return false;
		}

		// Otherwise, don't prevent default
		return true;
	}

	/**
	 * @internal
	 */
	abstract _focusableElsWithinDialog(): NodeListOf<HTMLElement>;

	/**
	 * @internal
	 */
	abstract get _dialogLabel(): string;

	// --- Text field ---

	/**
	 * Stores the value of the text field.
	 * @internal
	 */
	@observable _presentationValue = '';

	/**
	 * @internal
	 */
	_presentationValueChanged() {
		this.dirtyValue = true;
		this.validate();
	}

	/**
	 * @internal
	 */
	abstract _updatePresentationValue(): void;

	/**
	 * @internal
	 */
	abstract get _textFieldPlaceholder(): string;

	/**
	 * @internal
	 */
	_textFieldSize?: string;

	/**
	 * @internal
	 */
	_onTextFieldInput(event: Event) {
		const textField = event.currentTarget as TextField;
		this._presentationValue = textField.value;
	}

	/**
	 * @internal
	 */
	abstract _onTextFieldChange(): void;

	// --- Picker button ---

	/**
	 * @internal
	 */
	abstract get _pickerButtonLabel(): string;

	/**
	 * @internal
	 */
	abstract get _pickerButtonIcon(): string;

	/**
	 * @internal
	 */
	_onPickerButtonClick() {
		if (this._popupOpen) {
			this._closePopup();
		} else {
			this.#openPopupIfPossible();
		}
	}

	// --- Dialog footer ---

	/**
	 * @internal
	 */
	_onOkClick() {
		this._closePopup();
	}

	/**
	 * @internal
	 */
	_onClearClick() {
		this._closePopup();
		this.$emit('clear-click');
	}
}

export interface PickerField
	extends Localized,
		FormElementHelperText,
		TrappedFocus {}
applyMixinsWithObservables(
	PickerField,
	Localized,
	FormElementHelperText,
	TrappedFocus
);
