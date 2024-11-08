import { DOM } from '@microsoft/fast-element';
import { eventClick } from '@microsoft/fast-web-utilities';
import { fixture } from '../test-utilities/fixture';
import {
	FoundationButton as Button,
	buttonTemplate as template,
} from './index';

const FASTButton = Button.compose({
	baseName: 'button',
	template,
});

async function setup() {
	const { connect, disconnect, element, parent } = await fixture(FASTButton());

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

	describe('Delegates ARIA button', () => {
		it('should set the `aria-atomic` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaAtomic = 'true';

			element.ariaAtomic = ariaAtomic;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-atomic')
			).toEqual(ariaAtomic);

			await disconnect();
		});

		it('should set the `aria-busy` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaBusy = 'false';

			element.ariaBusy = ariaBusy;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-busy')
			).toEqual(ariaBusy);

			await disconnect();
		});

		it('should set the `aria-controls` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaControls = 'testId';

			element.ariaControls = ariaControls;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-controls')
			).toEqual(ariaControls);

			await disconnect();
		});

		it('should set the `aria-current` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaCurrent = 'page';

			element.ariaCurrent = ariaCurrent;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-current')
			).toEqual(ariaCurrent);

			await disconnect();
		});

		it('should set the `aria-describedby` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaDescribedby = 'testId';

			element.ariaDescribedby = ariaDescribedby;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-describedby')
			).toEqual(ariaDescribedby);

			await disconnect();
		});

		it('should set the `aria-details` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaDetails = 'testId';

			element.ariaDetails = ariaDetails;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-details')
			).toEqual(ariaDetails);

			await disconnect();
		});

		it('should set the `aria-disabled` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaDisabled = 'true';

			element.ariaDisabled = ariaDisabled;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-disabled')
			).toEqual(ariaDisabled);

			await disconnect();
		});

		it('should set the `aria-errormessage` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaErrormessage = 'test';

			element.ariaErrormessage = ariaErrormessage;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-errormessage')
			).toEqual(ariaErrormessage);

			await disconnect();
		});

		it('should set the `aria-expanded` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaExpanded = 'true';

			element.ariaExpanded = ariaExpanded;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-expanded')
			).toEqual(ariaExpanded);

			await disconnect();
		});

		it('should set the `aria-flowto` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaFlowto = 'testId';

			element.ariaFlowto = ariaFlowto;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-flowto')
			).toEqual(ariaFlowto);

			await disconnect();
		});

		it('should set the `aria-haspopup` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaHaspopup = 'true';

			element.ariaHaspopup = ariaHaspopup;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-haspopup')
			).toEqual(ariaHaspopup);

			await disconnect();
		});

		it('should set the `aria-hidden` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaHidden = 'true';

			element.ariaHidden = ariaHidden;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-hidden')
			).toEqual(ariaHidden);

			await disconnect();
		});

		it('should set the `aria-invalid` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaInvalid = 'spelling';

			element.ariaInvalid = ariaInvalid;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-invalid')
			).toEqual(ariaInvalid);

			await disconnect();
		});

		it('should set the `aria-keyshortcuts` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaKeyshortcuts = 'F4';

			element.ariaKeyshortcuts = ariaKeyshortcuts;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-keyshortcuts')
			).toEqual(ariaKeyshortcuts);

			await disconnect();
		});

		it('should set the `aria-label` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaLabel = 'Foo label';

			element.ariaLabel = ariaLabel;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-label')
			).toEqual(ariaLabel);

			await disconnect();
		});

		it('should set the `aria-labelledby` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaLabelledby = 'testId';

			element.ariaLabelledby = ariaLabelledby;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-labelledby')
			).toEqual(ariaLabelledby);

			await disconnect();
		});

		it('should set the `aria-live` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaLive = 'polite';

			element.ariaLive = ariaLive;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-live')
			).toEqual(ariaLive);

			await disconnect();
		});

		it('should set the `aria-owns` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaOwns = 'testId';

			element.ariaOwns = ariaOwns;

			await connect();

			expect(
				element.shadowRoot?.querySelector('button')?.getAttribute('aria-owns')
			).toEqual(ariaOwns);

			await disconnect();
		});

		it('should set the `aria-pressed` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaPressed = 'true';

			element.ariaPressed = ariaPressed;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-pressed')
			).toEqual(ariaPressed);

			await disconnect();
		});

		it('should set the `aria-relevant` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaRelevant = 'removals';

			element.ariaRelevant = ariaRelevant;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-relevant')
			).toEqual(ariaRelevant);

			await disconnect();
		});

		it('should set the `aria-roledescription` attribute on the internal button when provided', async () => {
			const { element, connect, disconnect } = await setup();
			const ariaRoledescription = 'slide';

			element.ariaRoledescription = ariaRoledescription;

			await connect();

			expect(
				element.shadowRoot
					?.querySelector('button')
					?.getAttribute('aria-roledescription')
			).toEqual(ariaRoledescription);

			await disconnect();
		});
	});

	describe("of type 'submit'", () => {
		it('should submit the parent form when clicked', async () => {
			const { connect, disconnect, element, parent } = await setup();
			const form = document.createElement('form');
			element.setAttribute('type', 'submit');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			form.requestSubmit = jest.fn();

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

			form.requestSubmit = jest.fn();

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
		xit('should not propagate when clicked', async () => {
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
