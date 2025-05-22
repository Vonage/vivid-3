import {
	deepQuerySelectorAll,
	elementUpdated,
	getControlElement,
	getResolvedTextContent,
} from '@vivid-nx/shared';
import type { ErrorText, FormElementSuccessText } from '../patterns';
import type { FormAssociated } from '../foundation/form-associated/form-associated';
import type { ElementWithFeedback } from './mixins';
import type { FeedbackMessage, FeedbackType } from './feedback-message';

export const getIconLabel = (element: Element) => {
	const icon = deepQuerySelectorAll<FeedbackMessage>(
		element,
		`.icon`
	)[0];
	if (!icon) return '';
	return icon.getAttribute('label');
};

export const getMessage = (element: Element, type: FeedbackType) => cleanWhitespace(
		deepQuerySelectorAll<FeedbackMessage>(
			element,
			`vwc-feedback-message[type="${type}"]`
		)
			.map((fm) => getResolvedTextContent(fm))
			.join(' ')
	);

const getRootNode = (el: HTMLElement) =>
	el.getRootNode() as ShadowRoot | Document;

const cleanWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

const resolveAccessibleDescription = (el: HTMLElement) =>
	cleanWhitespace(
		Array.from(
			getRootNode(el).querySelectorAll(
				el
					.getAttribute('aria-describedby')!
					.split(' ')
					.map((id) => `#${id}`)
					.join(',')
			)
		)
			.map(getResolvedTextContent)
			.join('')
	);

export const itShouldDisplayHelperTextFeedback = (
	getElement: () => ElementWithFeedback,
	getControl = () => getControlElement(getElement())
) => {
	it('should display the helper text and use it as the accessible description of the control when set', async () => {
		getElement().helperText = 'helper text';
		await elementUpdated(getElement());

		expect(getMessage(getElement(), 'helper')).toBe('helper text');
		expect(resolveAccessibleDescription(getControl())).toBe('helper text');
	});

	it('should display the helper text when passed to the helper-text slot and use it as the accessible description of the control', async () => {
		const slotted = document.createElement('div');
		slotted.slot = 'helper-text';
		slotted.textContent = 'slotted helper text';
		getElement().appendChild(slotted);
		await elementUpdated(getElement());
		await elementUpdated(getElement()); // if slot is forwarded

		expect(getMessage(getElement(), 'helper')).toBe('slotted helper text');
		expect(resolveAccessibleDescription(getControl())).toBe(
			'slotted helper text'
		);
	});
};

export const itShouldDisplaySuccessTextFeedback = (
	getElement: () => ElementWithFeedback & FormElementSuccessText & ErrorText,
	getControl = () => getControlElement(getElement())
) => {
	it('should display the success text and use it as the accessible description of the control when set', async () => {
		getElement().successText = 'success text';
		await elementUpdated(getElement());

		expect(getIconLabel(getElement())).toBe('Success:');
		expect(getMessage(getElement(), 'success')).toBe('success text');
		expect(resolveAccessibleDescription(getControl())).toBe(
			'success text'
		);
	});

	it('should display success text over helper and error text', async () => {
		getElement().helperText = 'helper text';
		getElement().errorText = 'error text';
		getElement().successText = 'success text';
		await elementUpdated(getElement());

		expect(getIconLabel(getElement())).toBe('Success:');	
		expect(getMessage(getElement(), 'success')).toBe('success text');
	});
};

export const itShouldDisplayErrorTextFeedback = (
	getElement: () => ElementWithFeedback & ErrorText,
	getControl = () => getControlElement(getElement())
) => {
	it('should display the error text and use it as the accessible description of the control when set', async () => {
		getElement().errorText = 'error text';
		await elementUpdated(getElement());

		expect(getIconLabel(getElement())).toBe('Error:');
		expect(getMessage(getElement(), 'error')).toBe('error text');
		expect(resolveAccessibleDescription(getControl())).toBe(
			'error text'
		);
	});

	it('should display error text over helper text', async () => {
		getElement().helperText = 'helper text';
		getElement().errorText = 'error text';
		await elementUpdated(getElement());

		expect(getIconLabel(getElement())).toBe('Error:');	
		expect(getMessage(getElement(), 'error')).toBe('error text');
	});
};

export const itShouldDisplayValidationErrorFeedback = (
	getElement: () => ElementWithFeedback & ErrorText & FormAssociated,
	getControl = () => getControlElement(getElement())
) => {
	const setValidationError = (error: string) => {
		// FIXME: Components don't implement setCustomValidity
		const proxy = (getElement() as any).proxy as HTMLInputElement;
		proxy.setCustomValidity(error);
		proxy.setCustomValidity = () => {
			// ignore components setting custom validity
		};
		// FIXME: Report validity should force error display without blur
		getElement().dispatchEvent(new Event('blur'));
		getElement().reportValidity();
	};

	it('should display a validation error and use it as the accessible description of the control when set', async () => {
		setValidationError('validation error');
		await elementUpdated(getElement());

		expect(getIconLabel(getElement())).toBe('Error:');	
		expect(getMessage(getElement(), 'error')).toBe('validation error');
		expect(resolveAccessibleDescription(getControl())).toBe(
			'validation error'
		);
	});

	it('should display error text over validation error if both are present', async () => {
		getElement().errorText = 'error text';
		await elementUpdated(getElement());
		setValidationError('validation error');
		await elementUpdated(getElement());

		expect(getMessage(getElement(), 'error')).toBe('Error: error text');
		expect(resolveAccessibleDescription(getControl())).toBe(
			'Error: error text'
		);
	});
};
