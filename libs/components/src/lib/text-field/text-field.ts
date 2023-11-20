import {
	applyMixins,
	TextField as FoundationTextfield,
} from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import { memoizeWith } from 'ramda';
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
import { Reflector } from '../../shared/utils/Reflector';

export type TextFieldAppearance = Extract<
Appearance,
Appearance.Fieldset | Appearance.Ghost
>;
export type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

// Safari does not support styling the `::placeholder` pseudo-element on slotted input
// See bug: https://bugs.webkit.org/show_bug.cgi?id=223814
// As a workaround we add a stylesheet to root of text-field to apply the styles
const safariWorkaroundClassName = '_vvd-3-text-field-safari-workaround';
const getSafariWorkaroundStyleSheet = memoizeWith(() => '', () => {
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
});

const installSafariWorkaroundStyle = (forElement: TextField) => {
	const root = forElement.getRootNode() as ShadowRoot | Document;
	const workaroundStyleSheet = getSafariWorkaroundStyleSheet();


	// Prevent error in environments that do not support `adoptedStyleSheets` like JSDOM
	const supportsAdoptedStyleSheets = 'adoptedStyleSheets' in root;
	// istanbul ignore if
	if (!supportsAdoptedStyleSheets) {
		return;
	}

	if (!root.adoptedStyleSheets.includes(workaroundStyleSheet)) {
		root.adoptedStyleSheets = [...root.adoptedStyleSheets, workaroundStyleSheet];
	}
};

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

	#reflectToInput?: Reflector<this, HTMLInputElement>;

	override connectedCallback() {
		super.connectedCallback();

		if (!this.control) {
			// Input and label must be created outside the shadow dom to support autofill from some password managers.

			const uniqueId = this.id || generateRandomId();
			const controlId = `vvd-text-field-control-${uniqueId}`;

			const input = document.createElement('input');
			input.slot = '_control';
			input.id = controlId;
			input.className = safariWorkaroundClassName;
			this.control = input;

			this.#reflectToInput = new Reflector(this, input);
			this.#reflectToInput.booleanAttribute('autofocus', 'autofocus',);
			this.#reflectToInput.booleanAttribute('disabled', 'disabled',);
			this.#reflectToInput.booleanAttribute('readOnly', 'readonly',);
			this.#reflectToInput.booleanAttribute('required', 'required',);
			this.#reflectToInput.booleanAttribute('spellcheck', 'spellcheck',);
			this.#reflectToInput.attribute('list', 'list',);
			this.#reflectToInput.attribute('maxlength', 'maxlength',);
			this.#reflectToInput.attribute('minlength', 'minlength',);
			this.#reflectToInput.attribute('pattern', 'pattern',);
			this.#reflectToInput.attribute('placeholder', 'placeholder',);
			this.#reflectToInput.attribute('size', 'size',);
			this.#reflectToInput.attribute('autoComplete', 'autocomplete',);
			this.#reflectToInput.attribute('type', 'type',);
			this.#reflectToInput.attribute('ariaAtomic', 'aria-atomic');
			this.#reflectToInput.attribute('ariaBusy', 'aria-busy');
			this.#reflectToInput.attribute('ariaControls', 'aria-controls');
			this.#reflectToInput.attribute('ariaCurrent', 'aria-current');
			this.#reflectToInput.attribute('ariaDescribedby', 'aria-describedby');
			this.#reflectToInput.attribute('ariaDetails', 'aria-details');
			this.#reflectToInput.attribute('ariaDisabled', 'aria-disabled');
			this.#reflectToInput.attribute('ariaErrormessage', 'aria-errormessage');
			this.#reflectToInput.attribute('ariaFlowto', 'aria-flowto');
			this.#reflectToInput.attribute('ariaHaspopup', 'aria-haspopup');
			this.#reflectToInput.attribute('ariaHidden', 'aria-hidden');
			this.#reflectToInput.attribute('ariaInvalid', 'aria-invalid');
			this.#reflectToInput.attribute('ariaKeyshortcuts', 'aria-keyshortcuts');
			this.#reflectToInput.attribute('ariaLabel', 'aria-label');
			this.#reflectToInput.attribute('ariaLabelledby', 'aria-labelledby');
			this.#reflectToInput.attribute('ariaLive', 'aria-live');
			this.#reflectToInput.attribute('ariaOwns', 'aria-owns');
			this.#reflectToInput.attribute('ariaRelevant', 'aria-relevant');
			this.#reflectToInput.attribute('ariaRoledescription', 'aria-roledescription');
			this.#reflectToInput.property('value', 'value', true);

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

			installSafariWorkaroundStyle(this);
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#reflectToInput!.destroy();
	}

	override focus() {
		this.control?.focus();
	}
}

export interface TextField extends AffixIcon, ErrorText, FormElement, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(TextField, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
