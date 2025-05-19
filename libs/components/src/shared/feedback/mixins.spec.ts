import { html, observable, ViewTemplate } from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { beforeAll } from 'vitest';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import {
	defineVividComponent,
	type VividElementDefinitionContext,
} from '../design-system/defineVividComponent';
import { FormAssociated } from '../foundation/form-associated/form-associated';
import { createRegisterFunction } from '../design-system/createRegisterFunction';
import type { Constructor } from '../utils/mixins';
import { WithFeedback, WithLightDOMFeedback } from './mixins';
import { FeedbackMessage, feedbackMessageDefinition } from './feedback-message';

class FormAssociatedElement extends FormAssociated(VividElement) {
	proxy = document.createElement('input');
}

class BaseElement extends (FormAssociatedElement as unknown as Constructor<
	VividElement & FormAssociated
>) {
	@observable errorValidationMessage?: string;
	@observable successText?: string;
}

const BaseElementTemplate = (
	ctx: VividElementDefinitionContext
): ViewTemplate<FeedbackElement> => {
	return html`${(x) => x._getFeedbackTemplate(ctx)}`;
};

class FeedbackElement extends WithFeedback(BaseElement) {}
class LightDOMFeedbackElement extends WithLightDOMFeedback(BaseElement) {}

export const feedbackElementDefinition = defineVividComponent(
	'feedback-element',
	FeedbackElement,
	BaseElementTemplate,
	[feedbackMessageDefinition],
	{}
);

export const lightDOMFeedbackElementDefinition = defineVividComponent(
	'light-dom-feedback-element',
	LightDOMFeedbackElement,
	BaseElementTemplate,
	[feedbackMessageDefinition],
	{}
);

describe('WithFeedback', () => {
	beforeAll(() => {
		createRegisterFunction(feedbackElementDefinition)();
	});

	const renderElement = async () => {
		const element = fixture(
			`<vwc-feedback-element></vwc-feedback-element>`
		) as unknown as FeedbackElement;
		await elementUpdated(element);
		return element;
	};

	const getInternalFeedbackMessage = (
		element: FeedbackElement
	): FeedbackMessage =>
		element.shadowRoot!.querySelector('vwc-feedback-message')!;

	const getSlottedFeedbackMessage = (
		element: FeedbackElement
	): FeedbackMessage =>
		element.shadowRoot!.querySelector('vwc-feedback-message:has(slot)')!;

	it('should render helperText as a helper FeedbackMessage', async () => {
		const element = await renderElement();

		element.helperText = 'Helper text';
		await elementUpdated(element);

		expect(getInternalFeedbackMessage(element).type).toBe('helper');
		expect(getInternalFeedbackMessage(element).textContent!.trim()).toBe(
			'Helper text'
		);
	});

	it('should render errorValidationMessage as a error FeedbackMessage', async () => {
		const element = await renderElement();

		element.errorValidationMessage = 'Error text';
		await elementUpdated(element);

		expect(getInternalFeedbackMessage(element).type).toBe('error');
		expect(getInternalFeedbackMessage(element).textContent!.trim()).toBe(
			'Error text'
		);
	});

	it('should render successText as a success FeedbackMessage', async () => {
		const element = await renderElement();

		element.successText = 'Success text';
		await elementUpdated(element);

		expect(getInternalFeedbackMessage(element).type).toBe('success');
		expect(getInternalFeedbackMessage(element).textContent!.trim()).toBe(
			'Success text'
		);
	});

	it('should render slotted helper text as a helper FeedbackMessage', async () => {
		const element = await renderElement();

		element.innerHTML = `<span slot="helper-text">Slotted helper text</span>`;
		await elementUpdated(element);

		expect(getSlottedFeedbackMessage(element).type).toBe('helper');
		expect(
			getSlottedFeedbackMessage(element).firstElementChild!.outerHTML
		).toBe('<slot name="helper-text"></slot>');
	});

	it('should provide the ids of internal and slotted feedback as _feedbackDescribedBy', async () => {
		const element = await renderElement();

		expect(element._feedbackDescribedBy).toBe(
			'feedback slotted-helper-text-feedback'
		);
		expect(getInternalFeedbackMessage(element)!.id).toBe('feedback');
		expect(getSlottedFeedbackMessage(element)!.id).toBe(
			'slotted-helper-text-feedback'
		);
	});
});

describe('WithLightDOMFeedback', () => {
	beforeAll(() => {
		createRegisterFunction(lightDOMFeedbackElementDefinition)();
	});

	const renderElement = async () => {
		const element = fixture(
			`<vwc-light-dom-feedback-element></vwc-light-dom-feedback-element>`
		) as unknown as LightDOMFeedbackElement;
		await elementUpdated(element);
		return element;
	};

	const getInternalFeedbackMessage = (
		element: FeedbackElement
	): FeedbackMessage | null => element.querySelector('vwc-feedback-message');

	it('should render internal feedback into light DOM', async () => {
		const element = await renderElement();

		element.helperText = 'Helper text';
		await elementUpdated(element);

		expect(getInternalFeedbackMessage(element)!.type).toBe('helper');
		expect(getInternalFeedbackMessage(element)!.textContent!.trim()).toBe(
			'Helper text'
		);
	});

	it('should assign random ids to internal and slotted feedback and provide them as _feedbackDescribedBy', async () => {
		const element = await renderElement();
		const slottedFeedback1 = document.createElement('span');
		slottedFeedback1.slot = 'helper-text';
		const slottedFeedbackWithId = document.createElement('span');
		slottedFeedbackWithId.id = 'my-id';
		slottedFeedbackWithId.slot = 'helper-text';
		element.appendChild(slottedFeedback1);
		element.appendChild(slottedFeedbackWithId);
		element.helperText = 'Helper text';
		await elementUpdated(element);

		const internalFeedbackId = getInternalFeedbackMessage(element)!.id;
		const slottedFeedbackId = slottedFeedback1.id;
		expect(element._feedbackDescribedBy).toBe(
			`${internalFeedbackId} ${slottedFeedbackId} my-id`
		);
		expect(slottedFeedbackWithId.id).toBe('my-id');
	});
});
