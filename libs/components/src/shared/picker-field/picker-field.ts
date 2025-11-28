import {
	attr,
	ExecutionContext,
	type ExpressionNotifier,
	Observable,
	observable,
} from '@microsoft/fast-element';
import type { TextField } from '../../lib/text-field/text-field';
import type { Button } from '../../lib/button/button';
import { handleEscapeKeyAndStopPropogation } from '../dialog';
import {
	FormElement,
	Localized,
	TrappedFocus,
	WithContextualHelp,
	WithErrorText,
} from '../patterns';
import { WithFeedback } from '../feedback/mixins';
import { FormAssociated } from '../foundation/form-associated/form-associated';
import { VividElement } from '../foundation/vivid-element/vivid-element';

/**
 * Base class for picker fields. Picker fields consist of a text field with a button that opens a popup that allows
 * picking values.
 * @testAction clear clearPicker
 * @testRef control shadowTextField [data-vvd-component=text-field].control
 * @testRef pickerButton shadowButton #picker-button
 * @testRef clearButton shadowButton #clear-button
 */
export abstract class PickerField extends WithContextualHelp(
	WithFeedback(
		WithErrorText(
			FormElement(TrappedFocus(Localized(FormAssociated(VividElement))))
		)
	)
) {
	// --- Attributes ---
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
	override proxy = document.createElement('input');

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

	#localeChangeObserver!: ExpressionNotifier;

	#startObservingLocaleChanges() {
		this.#localeChangeObserver = Observable.binding(
			() => this.locale,
			this.#localeChangeHandler
		);
		this.#localeChangeObserver.observe(this, ExecutionContext.default);
	}

	#stopObservingLocaleChanges() {
		this.#localeChangeObserver.dispose();
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
		/* v8 ignore else -- @preserve */
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
		this.$emit('clear-click');
	}
}
