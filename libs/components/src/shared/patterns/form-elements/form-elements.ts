import {attr, html, observable, volatile, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {Icon} from '../../../lib/icon/icon';
import messageStyles from './message.scss';

const ElementInternalsKey = 'ElementInternals';
const supportsElementInternals = () => ElementInternalsKey in window && 'setFormValue' in window[ElementInternalsKey].prototype;

export interface FormElement {
	errorValidationMessage: boolean;
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

export class FormElementHelperText {
	@attr({attribute: 'helper-text'}) helperText?: string;
}

export class FormElementSuccessText {
	@attr({attribute: 'success-text'}) successText?: string;
}

export class FormElementCharCount {
	@attr({
		attribute: 'char-count',
		mode: 'boolean'
	}) charCount = false;
}
/**
 * @param constructor
 */
export function formElements<T extends { new (...args: any[]): Record<string, any> }>(constructor: T) {
	class Decorated extends constructor {
		@attr label?: string;
		
		@observable userValid = true;
		#blurred = false;

		@volatile
		get errorValidationMessage() {
			return this.userValid ? '' : this.validationMessage;
		}

		errorValidationMessageChanged(oldmsg: string, newmsg: string) {
			console.log('in errorValidationMessageChanged', oldmsg, newmsg);
		}

		constructor(...args: any[]) {
			super(...args);
			(this as unknown as HTMLElement).addEventListener('blur', () => {
				this.#blurred = true;
				this.validate();
			});
			(this as unknown as HTMLElement).addEventListener('focus', () => {
				this.#blurred = false;
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
			if (this.#blurred && this.dirtyValue) return;
			this.#blurred = true;
			this.dirtyValue = true;
			this.validate();
		};

		disconnectedCallback() {
			super.disconnectedCallback?.();
			this.proxy.removeEventListener('invalid', this.#handleInvalidEvent);
		}

		validate = () => {
			if (supportsElementInternals() && this.proxy instanceof HTMLElement) {
				this.setValidity((this.proxy as any).validity, (this.proxy as any).validationMessage, this.control);
			} else {
				super.validate();
			}
			this.userValid = !this.userValid;
			if (this.proxy instanceof HTMLElement) {
				this.userValid = (this.#blurred && this.dirtyValue) ? !this.validationMessage : true;
			}
		};
	}

	return Decorated;
}

type FeedbackType = 'error' | 'helper' | 'success';
type MessagePropertyType = 'errorValidationMessage' | 'helperText' | 'successText';
type MessageTypeMap = { [key in FeedbackType]: {
	iconType: string;
	className: string;
	messageProperty: MessagePropertyType }
};

/**
 * @param messageType
 * @param context
 */
export function getFeedbackTemplate(messageType: FeedbackType, context: ElementDefinitionContext) {
	console.log('in getFeedbackTemplate', messageType, context);
	

	const MessageTypeMap: MessageTypeMap = {
		'helper': {
			'messageProperty': 'helperText',
			'className': 'helper',
			'iconType': ''
		},
		'error': {
			'messageProperty': 'errorValidationMessage',
			'className': 'error',
			'iconType': 'info-line'
		},
		'success': {
			'messageProperty': 'successText',
			'className': 'success',
			'iconType': 'check-circle-line'
		}
	};
	const iconTag = context.tagFor(Icon);
	const messageTypeConfig = MessageTypeMap[messageType];
	const iconType = messageTypeConfig.iconType;
	return html<FormElement>`
			<style>
				${messageStyles}

			</style>
			<div class="message ${MessageTypeMap[messageType].className}-message">
		  	${when(() => iconType, html<FormElement>`
					  <${iconTag} class="message-icon" name="${iconType}"></${iconTag}>`)}
				${feedbackMessage({
		messageProperty: MessageTypeMap[messageType].messageProperty})}
			</div>`;
}

/**
 * @param root0
 * @param root0.className
 * @param root0.messageProperty
 */
function feedbackMessage({messageProperty}: {messageProperty: MessagePropertyType }) {
	return html<FormElement & FormElementHelperText & FormElementSuccessText>`
	  <span class="message-text">${x => x[messageProperty]}</span>
	`;
}
