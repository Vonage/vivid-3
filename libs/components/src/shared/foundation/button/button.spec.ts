import { DOM } from '@microsoft/fast-element';
import { eventClick } from '@microsoft/fast-web-utilities';
import { fixture } from '../test-utilities/fixture';
import { createRegisterFunction } from '../../design-system/createRegisterFunction';
import { defineVividComponent } from '../../design-system/defineVividComponent';
import {
	VividFoundationButton as Button,
	buttonTemplate as template,
	VividFoundationButton,
} from './index';

const buttonDefinition = defineVividComponent(
	'button',
	Button,
	template,
	[],
	{}
);
createRegisterFunction(buttonDefinition)();

async function setup() {
	const { connect, disconnect, element, parent } =
		await fixture<VividFoundationButton>('vwc-button');

	return { connect, disconnect, element, parent };
}

describe('Foundation Button', () => {
	it('should set the `autofocus` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();

		element.autofocus = true;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.hasAttribute('autofocus')
		).toEqual(true);

		await disconnect();
	});

	it('should set the `disabled` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();

		element.disabled = true;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.hasAttribute('disabled')
		).toEqual(true);

		await disconnect();
	});

	it('should set the `form` attribute on the internal button when `formId` is provided', async () => {
		const { element, connect, disconnect } = await setup();
		const formId = 'testId';

		element.formId = 'testId';

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('form')
		).toEqual(formId);

		await disconnect();
	});

	it('should set the `formaction` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const formaction = 'test_action.asp';

		element.formaction = formaction;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('formaction')
		).toEqual(formaction);

		await disconnect();
	});

	it('should set the `formenctype` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const formenctype = 'text/plain';

		element.formenctype = formenctype;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('formenctype')
		).toEqual(formenctype);

		await disconnect();
	});

	it('should set the `formmethod` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const formmethod = 'post';

		element.formmethod = formmethod;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('formmethod')
		).toEqual(formmethod);

		await disconnect();
	});

	it('should set the `formnovalidate` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const formnovalidate = true;

		element.formnovalidate = formnovalidate;

		await connect();

		expect(
			element.shadowRoot
				?.querySelector('button')
				?.getAttribute('formnovalidate')
		).toEqual(formnovalidate.toString());

		await disconnect();
	});

	it('should set the `formtarget` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const formtarget = '_blank';

		element.formtarget = formtarget;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('formtarget')
		).toEqual(formtarget);

		await disconnect();
	});

	it('should set the `name` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const name = 'testName';

		element.name = name;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('name')
		).toEqual(name);

		await disconnect();
	});

	it('should set the `type` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const type = 'submit';

		element.type = type;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('type')
		).toEqual(type);

		await disconnect();
	});

	it('should set the `value` attribute on the internal button when provided', async () => {
		const { element, connect, disconnect } = await setup();
		const value = 'Reset';

		element.value = value;

		await connect();

		expect(
			element.shadowRoot?.querySelector('button')?.getAttribute('value')
		).toEqual(value);

		await disconnect();
	});

	describe("of type 'submit'", () => {
		it('should submit the parent form when clicked', async () => {
			const { connect, disconnect, element, parent } = await setup();
			const form = document.createElement('form');
			element.setAttribute('type', 'submit');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			form.requestSubmit = vi.fn();

			element.click();

			expect(form.requestSubmit).toHaveBeenCalledWith(element.proxy);

			await disconnect();
		});

		it('should no longer submit the parent form when clicked after type is changed', async () => {
			const { connect, disconnect, element, parent } = await setup();
			const form = document.createElement('form');
			element.setAttribute('type', 'submit');
			element.setAttribute('type', '');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			form.requestSubmit = vi.fn();

			element.click();

			expect(form.requestSubmit).not.toHaveBeenCalled();

			await disconnect();
		});

		it('should should not throw when clicked without a form', async () => {
			const { connect, disconnect, element, parent } = await setup();
			element.setAttribute('type', 'submit');
			parent.appendChild(element);

			await connect();

			element.click();

			await disconnect();
		});
	});

	describe("of type 'reset'", () => {
		it('should reset the parent form when clicked', async () => {
			const { connect, disconnect, element, parent } = await setup();
			const form = document.createElement('form');
			element.setAttribute('type', 'reset');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			const wasReset = await new Promise((resolve) => {
				// Resolve true when the event listener is handled
				form.addEventListener('reset', () => resolve(true));

				element.click();

				// Resolve false on the next update in case reset hasn't happened
				DOM.queueUpdate(() => resolve(false));
			});

			expect(wasReset).toEqual(true);

			await disconnect();
		});

		it('should no longer reset the parent form when clicked after type is changed', async () => {
			const { connect, disconnect, element, parent } = await setup();
			const form = document.createElement('form');
			element.setAttribute('type', 'reset');
			element.setAttribute('type', '');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			const wasReset = await new Promise((resolve) => {
				// Resolve true when the event listener is handled
				form.addEventListener('reset', () => resolve(true));

				element.click();

				// Resolve false on the next update in case reset hasn't happened
				DOM.queueUpdate(() => resolve(false));
			});

			expect(wasReset).toEqual(false);

			await disconnect();
		});

		it('should should not throw when clicked without a form', async () => {
			const { connect, disconnect, element, parent } = await setup();
			element.setAttribute('type', 'reset');
			parent.appendChild(element);

			await connect();

			element.click();

			await disconnect();
		});
	});

	describe("of 'disabled'", () => {
		it.skip('should not propagate when clicked', async () => {
			const { connect, disconnect, element, parent } = await setup();

			element.disabled = true;
			parent.appendChild(element);

			let wasClicked = false;
			await connect();

			parent.addEventListener(eventClick, () => {
				wasClicked = true;
			});

			await DOM.nextUpdate();
			element.click();

			expect(wasClicked).toEqual(false);

			await disconnect();
		});

		it('should not propagate when spans within shadowRoot are clicked', async () => {
			const { connect, disconnect, element, parent } = await setup();

			element.disabled = true;
			parent.appendChild(element);

			let wasClicked = false;

			await connect();

			parent.addEventListener(eventClick, () => {
				wasClicked = true;
			});

			await DOM.nextUpdate();

			const elements = element.shadowRoot?.querySelectorAll('span');
			if (elements) {
				const spans: HTMLSpanElement[] = Array.from(elements);
				spans.forEach((span: HTMLSpanElement) => {
					span.click();
					expect(wasClicked).toEqual(false);
				});
			}

			await disconnect();
		});
	});
});
