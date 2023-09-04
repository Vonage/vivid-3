import { attr, html, observable, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { Icon } from '../../../lib/icon/icon';
import messageStyles from './message.scss';

export interface FormElement {
	errorValidationMessage: string;
	label: string;
	userValid: boolean;
	dirtyValue: boolean;
}

export interface FormElementHelperText {
	helperText?: string;
}

export interface FormElementSuccessText {
	successText?: string;
}

export interface FormElementCharCount {
	charCount: boolean;
}

export interface ErrorText {
	errorText: string;
}

export class FormElementHelperText {
	@attr({ attribute: 'helper-text' }) helperText?: string;
}

export class FormElementSuccessText {
	@attr({ attribute: 'success-text' }) successText?: string;
}

export class FormElementCharCount {
	@attr({
		attribute: 'char-count',
		mode: 'boolean',
	})
		charCount = false;
}

export function formElements<
	T extends { new (...args: any[]): Record<string, any> }
>(constructor: T) {
	class Decorated extends constructor {
		@attr label?: string;

		/**
		 * Will hold the error message that should currently be visible in the UI.
		 * Note: Cannot be a getter because this.validationMessage is not observable
		 */
		@observable errorValidationMessage = '';

		#forceErrorDisplay = false;
		#hasBeenTouched = false;

		constructor(...args: any[]) {
			super(...args);
			(this as unknown as HTMLElement).addEventListener('blur', () => {
				this.#hasBeenTouched = true;
				this.#forceErrorDisplay = false;
				this.validate();
			});
			(this as unknown as HTMLElement).addEventListener('focus', () => {
				this.#hasBeenTouched = false;
			});
			this.addEventListener('invalid', () => {
				this.proxy.dispatchEvent(new Event('invalid'));
			});
		}

		connectedCallback() {
			super.connectedCallback?.();
			this.proxy.addEventListener('invalid', this.#handleInvalidEvent);
		}

		#handleInvalidEvent = () => {
			this.#forceErrorDisplay = true;
			this.validate();
		};

		disconnectedCallback() {
			super.disconnectedCallback?.();
			this.proxy.removeEventListener('invalid', this.#handleInvalidEvent);
		}

		formResetCallback() {
			this.#forceErrorDisplay = false;

			super.formResetCallback();

			// super.formResetCallback will reset the value, which triggers validate(), and only afterward clear dirtyValue
			// Therefore, we need to validate again now that dirtyValue has changed
			this.validate();
		}

		validate = () => {
			super.validate();

			const shouldShowValidationError =
				this.#forceErrorDisplay || (this.#hasBeenTouched && this.dirtyValue);

			this.errorValidationMessage = shouldShowValidationError
				? this.validationMessage
				: '';
		};
	}

	return Decorated;
}

type FeedbackType = 'error' | 'helper' | 'success';
type MessagePropertyType =
	| 'errorValidationMessage'
	| 'helperText'
	| 'successText';
type MessageTypeMap = {
	[key in FeedbackType]: {
		iconType: string;
		className: string;
		messageProperty: MessagePropertyType;
	};
};

/**
 * @param context - element definition context
 */
export function getFeedbackTemplate(
	messageType: FeedbackType,
	context: ElementDefinitionContext
) {
	const MessageTypeMap: MessageTypeMap = {
		helper: {
			messageProperty: 'helperText',
			className: 'helper',
			iconType: '',
		},
		error: {
			messageProperty: 'errorValidationMessage',
			className: 'error',
			iconType: 'info-line',
		},
		success: {
			messageProperty: 'successText',
			className: 'success',
			iconType: 'check-circle-line',
		},
	};
	const iconTag = context.tagFor(Icon);
	const messageTypeConfig = MessageTypeMap[messageType];
	const iconType = messageTypeConfig.iconType;
	return html<FormElement>` <style>
			${messageStyles}
		</style>
		<div class="message ${MessageTypeMap[messageType].className}-message">
			${when(
		() => iconType,
		html<FormElement>`
					  <${iconTag} class="message-icon" name="${iconType}"></${iconTag}>`
	)}
			${feedbackMessage({
		messageProperty: MessageTypeMap[messageType].messageProperty,
	})}
		</div>`;
}

function feedbackMessage({
	messageProperty,
}: {
	messageProperty: MessagePropertyType;
}) {
	return html<FormElement & FormElementHelperText & FormElementSuccessText>`
		<span class="message-text">${(x) => x[messageProperty]}</span>
	`;
}

export function errorText<
	T extends { new (...args: any[]): Record<string, any> }
>(constructor: T) {
	class Decorated extends constructor {
		@attr({ attribute: 'error-text' }) errorText?: string;
		#blockValidateCalls = false;

		constructor(...args: any[]) {
			super(...args);
			this._validate = this.validate;
			this.validate = () => {
				if (!this.#blockValidateCalls) this._validate();
			};
		}

		errorTextChanged(_: string, newErrorText: string | undefined) {
			if (newErrorText) {
				this.setValidity({ customError: true }, newErrorText, this.control);
				this.errorValidationMessage = newErrorText;

				this.#blockValidateCalls = true;
			} else {
				this.setValidity({ customError: false }, '', this.control);
				this.#blockValidateCalls = false;

				// Call now to restore potential error
				this.validate();
			}
		}
	}

	return Decorated;
}
