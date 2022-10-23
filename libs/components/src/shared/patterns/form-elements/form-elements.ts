import {attr, ComposableStyles, html, observable, volatile, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {Icon} from '../../../lib/icon/icon';
import errorMessageStyles from './error-message.scss';
import helperTextStyles from './helper-text.scss';
import successTextStyles from './success-message.scss';

const ElementInternalsKey = 'ElementInternals';
const supportsElementInternals = () => ElementInternalsKey in window && 'setFormValue' in window[ElementInternalsKey].prototype;

export interface FormElement {
	charCount: boolean;
	errorValidationMessage: boolean;
	helperText: string;
	successText: string;
	label: string;
	userValid: boolean;
	dirtyValue: boolean;
}

export function formElements<T extends { new (...args: any[]): Record<string, any> }>(constructor: T) {
	class Decorated extends constructor {
		@attr label?: string;
		@attr({attribute: 'helper-text'}) helperText?: string;
		@attr({attribute: 'success-text'}) successText?: string;
		@attr({
			attribute: 'char-count',
			mode: 'boolean'
		}) charCount = false;
		@observable userValid = true;
		#blurred = false;

		@volatile
		get errorValidationMessage() {
			return this.userValid ? '' : this.validationMessage;
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
			(this as unknown as HTMLElement).addEventListener('invalid', () => {
				if (this.#blurred && this.dirtyValue) return;
				this.#blurred = true;
				this.dirtyValue = true;
				this.validate();
			});
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
	styles: string | ComposableStyles;
	messageProperty: MessagePropertyType }
};

export function getFeedbackTemplate(messageType: FeedbackType, context: ElementDefinitionContext) {
	const MessageTypeMap: MessageTypeMap = {
		'helper': {
			'messageProperty': 'helperText',
			'className': 'helper-text',
			'styles': helperTextStyles,
			'iconType': ''
		},
		'error': {
			'messageProperty': 'errorValidationMessage',
			'className': 'error-message',
			'styles': errorMessageStyles,
			'iconType': 'info-negative'
		},
		'success': {
			'messageProperty': 'successText',
			'className': 'success-message',
			'styles': successTextStyles,
			'iconType': 'check-circle-solid'
		}
	};
	const iconTag = context.tagFor(Icon);
	const messageTypeConfig = MessageTypeMap[messageType];
	const iconType = messageTypeConfig.iconType;
	return html<FormElement>`
			<style>
				${MessageTypeMap[messageType].styles}
			</style>
		  	${when(() => iconType, html<FormElement>`
					  <${iconTag} class="${MessageTypeMap[messageType].className}-icon" type="${iconType}"></${iconTag}>`)}
				${feedbackMessage({
		className: MessageTypeMap[messageType].className, 
		messageProperty: MessageTypeMap[messageType].messageProperty})}
		`;
}

/**
 * @param root0
 * @param root0.className
 * @param root0.messageProperty
 */
function feedbackMessage({className, messageProperty}: {className: string; messageProperty: MessagePropertyType }) {
	return html<FormElement>`
	  <span class="${className}">${x => x[messageProperty]}</span>
	`;
}
