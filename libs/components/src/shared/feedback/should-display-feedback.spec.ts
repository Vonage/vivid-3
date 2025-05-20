import {
	deepQuerySelectorAll,
	elementUpdated,
	getControlElement,
	getResolvedTextContent,
} from '@vivid-nx/shared';
import type { ErrorText, FormElementSuccessText } from '../patterns';
import type { ElementWithFeedback } from './mixins';
import type { FeedbackMessage } from './feedback-message';

export const getMessage = (element: Element, type: string) => {
	const messageEls = deepQuerySelectorAll<FeedbackMessage>(
		element,
		`vwc-feedback-message[type="${type}"]`
	);

	return cleanWhitespace(
		messageEls.map((fm) => getResolvedTextContent(fm)).join(' ')
	);
};

const getRootNode = (el: HTMLElement) =>
	el.getRootNode() as ShadowRoot | Document;

const cleanWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

const resolveAccessibleDescription = (el: HTMLElement) => {
	return cleanWhitespace(
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
};

export const itShouldHaveHelperTextFeedback = (
	getHost: () => ElementWithFeedback,
	getControl?: () => HTMLElement
) => {
	const getControlEl = getControl ?? (() => getControlElement(getHost()));
	const getMessageText = () => getMessage(getHost(), 'helper');

	it('should display the helper text and use it as the accessible description of the control when set', async () => {
		const element = getHost();

		element.helperText = 'helper text';
		await elementUpdated(element);

		expect(getMessageText()).toBe('helper text');
		expect(resolveAccessibleDescription(getControlEl())).toBe('helper text');
	});

	it('should display the helper text when passed to the helper-text slot and use it as the accessible description of the control', async () => {
		const element = getHost();

		const slotted = document.createElement('div');
		slotted.slot = 'helper-text';
		slotted.textContent = 'slotted helper text';
		element.appendChild(slotted);
		await elementUpdated(element);
		await elementUpdated(element); // if slot is forwarded

		expect(getMessageText()).toBe('slotted helper text');
		expect(resolveAccessibleDescription(getControlEl())).toBe(
			'slotted helper text'
		);
	});
};

export const itShouldHaveSuccessTextFeedback = (
	getHost: () => ElementWithFeedback & FormElementSuccessText,
	getControl?: () => HTMLElement
) => {
	const getControlEl = getControl ?? (() => getControlElement(getHost()));
	const getMessageText = () =>
		getMessage(getControlEl().getRootNode() as HTMLElement, 'success');

	it('should display the success text when set', async () => {
		const element = getHost();

		element.successText = 'success text';
		await elementUpdated(element);

		expect(getMessageText()).toBe('Success: success text');
	});

	it('should use the success text as the accessible description of the control element', async () => {
		const element = getHost();

		element.successText = 'success text';
		await elementUpdated(element);

		expect(resolveAccessibleDescription(getControlEl())).toBe(
			'Success: success text'
		);
	});
};

export const itShouldHaveErrorTextFeedback = (
	getHost: () => ElementWithFeedback & ErrorText,
	getControl?: () => HTMLElement
) => {
	const getControlEl = getControl ?? (() => getControlElement(getHost()));
	const getMessageText = () =>
		getMessage(getControlEl().getRootNode() as HTMLElement, 'error');

	it('should display the error text when set', async () => {
		const element = getHost();

		element.errorText = 'error text';
		await elementUpdated(element);

		expect(getMessageText()).toBe('Error: error text');
	});

	it('should use the error text as the accessible description of the control element', async () => {
		const element = getHost();

		element.errorText = 'error text';
		await elementUpdated(element);

		expect(resolveAccessibleDescription(getControlEl())).toBe(
			'Error: error text'
		);
	});
};
