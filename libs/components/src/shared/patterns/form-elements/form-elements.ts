import { attr, html, observable, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../../../lib/icon/icon';
import type { VividElementDefinitionContext } from '../../design-system/defineVividComponent';
import messageStyles from './message.scss?inline';

export interface FormElement {
	errorValidationMessage: string;
	label: string;
	userValid: boolean;
	dirtyValue: boolean;
}

export interface FormElementHelperText {
	helperText?: string;
	_helperTextSlottedContent?: HTMLElement[];
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

	/**
	 * @internal
	 */
	@observable _helperTextSlottedContent?: HTMLElement[];
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
			super.connectedCallback();
			this.proxy.addEventListener('invalid', this.#handleInvalidEvent);
		}

		#handleInvalidEvent = () => {
			this.#forceErrorDisplay = true;
			this.validate();
		};

		disconnectedCallback() {
			super.disconnectedCallback();
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

type SomeFormElement = Partial<
	FormElement & FormElementHelperText & FormElementSuccessText & ErrorText
>;

type FeedbackConfig = {
	iconType?: string;
	className: string;
	messageProperty: 'errorValidationMessage' | 'helperText' | 'successText';
	slot?: {
		name: string;
		slottedContentProperty: '_helperTextSlottedContent';
	};
	role: 'status' | 'none';
};
const feedback: Record<string, FeedbackConfig> = {
	helper: {
		messageProperty: 'helperText',
		className: 'helper',
		slot: {
			name: 'helper-text',
			slottedContentProperty: '_helperTextSlottedContent',
		},
		role: 'none',
	},
	error: {
		messageProperty: 'errorValidationMessage',
		className: 'error',
		iconType: 'info-line',
		role: 'status',
	},
	success: {
		messageProperty: 'successText',
		className: 'success',
		iconType: 'check-circle-line',
		role: 'none',
	},
};

const isFeedbackAvailable = (config: FeedbackConfig, x: SomeFormElement) =>
	Boolean(
		x[config.messageProperty] ||
			(config.slot && x[config.slot.slottedContentProperty]?.length)
	);

export function getFeedbackTemplate(context: VividElementDefinitionContext) {
	return html<SomeFormElement>`
		<style>
			${messageStyles}
		</style>
		${getFeedbackTypeTemplate(
			context,
			feedback.helper,
			(x) =>
				isFeedbackAvailable(feedback.helper, x) &&
				!isFeedbackAvailable(feedback.error, x) &&
				!isFeedbackAvailable(feedback.success, x)
		)}
		${getFeedbackTypeTemplate(
			context,
			feedback.error,
			(x) =>
				isFeedbackAvailable(feedback.error, x) &&
				!isFeedbackAvailable(feedback.success, x)
		)}
		${getFeedbackTypeTemplate(context, feedback.success, (x) =>
			isFeedbackAvailable(feedback.success, x)
		)}
	`;
}

function getFeedbackTypeTemplate(
	context: VividElementDefinitionContext,
	config: FeedbackConfig,
	shouldShow: (x: SomeFormElement) => boolean
) {
	const iconTag = context.tagFor(Icon);

	const messageTemplate = html<SomeFormElement>`${(x) =>
		x[config.messageProperty]}`;
	const innerTemplate = config.slot
		? html<SomeFormElement>`<slot
				name="${config.slot.name}"
				${slotted(config.slot.slottedContentProperty)}
				>${messageTemplate}</slot
		  >`
		: messageTemplate;

	return html<SomeFormElement>`<div
		class="${(x) =>
			classNames(
				'message',
				`${config.className}-message`,
				['message--visible', config.role === 'status' || shouldShow(x)],
				['sr-only', !shouldShow(x)]
			)}"
		role="${config.role}"
		aria-atomic="false"
	>
		${when(
			(x) => shouldShow(x) && config.iconType,
			html`<${iconTag} class="message-icon" name="${config.iconType!}"></${iconTag}>`
		)}
		<span class="message-text">${innerTemplate}</span>
	</div>`;
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
				this.#forceCustomError(newErrorText);
			} else {
				this.#clearCustomErrorAndRevalidate();
			}
		}

		#forceCustomError(errorMessage: string) {
			this.setValidity({ customError: true }, errorMessage, this.control);
			this.errorValidationMessage = errorMessage;

			this.#blockValidateCalls = true;
		}

		#clearCustomErrorAndRevalidate() {
			this.setValidity({}, '', this.control);
			this.#blockValidateCalls = false;

			this.validate();
		}
	}

	return Decorated;
}
