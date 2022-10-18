import {attr, html, observable, ViewTemplate, volatile, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {Icon} from '../../lib/icon/icon';
import type {TextField} from '../../lib/text-field/text-field';
import errorMessageStyles from './error-message.scss';

const ElementInternalsKey = 'ElementInternals';
const supportsElementInternals = () => ElementInternalsKey in window && 'setFormValue' in window[ElementInternalsKey].prototype;

export interface FormElement {
	charCount: boolean;
	errorValidationMessage: boolean;
	helperText: string;
	label: string;
	userValid: boolean;
	dirtyValue: boolean;
}
export function formElements<T extends { new (...args: any[]): Record<string, any> }>(constructor: T) {
	class Decorated extends constructor {
		@attr label?: string;
		@attr({attribute: 'helper-text'}) helperText?: string;
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

export const getErrorMessageTemplate = (context: ElementDefinitionContext): ViewTemplate<FormElement> => {
	const iconTag = context.tagFor(Icon);
	return html<FormElement>`
			<style>
				${errorMessageStyles}
			</style>
			${when(x => x.errorValidationMessage, html<TextField>`
				<${iconTag} class="error-message-icon" type="info-negative"></${iconTag}>
				<span class="error-message">${x => x.errorValidationMessage}</span>`)}
		`;
};
