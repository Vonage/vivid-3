import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	listenToFormSubmission,
} from '@vivid-nx/shared';
import { Connotation } from '../enums';
import { Radio } from './radio';
import '.';

const COMPONENT_TAG = 'vwc-radio';

async function setBoolAttributeOn(
	el: Radio,
	attr: string
): Promise<DOMTokenList> {
	el.toggleAttribute(attr, true);
	await elementUpdated(el);
	return getBaseElement(el).classList;
}

describe('vwc-radio', () => {
	let element: Radio;
	let internalsMock: jest.SpyInstance | null = null;
	let formAssociatedMock: jest.SpyInstance | null = null;

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Radio;
	});

	afterEach(async () => {
		internalsMock?.mockRestore();
		formAssociatedMock?.mockRestore();
		internalsMock = null;
		formAssociatedMock = null;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio', async () => {
			expect(element).toBeInstanceOf(Radio);
			expect(element.checked).toBeFalsy();
			expect(element.disabled).toBeFalsy();
			expect(element.value).toEqual('on');
			expect(element.label).toBeUndefined();
			expect(element.connotation).toBeUndefined();
		});
	});

	describe('label', () => {
		it('set label property to node', async () => {
			const label = 'lorem';
			element.setAttribute('label', label);

			await elementUpdated(element);

			const labelEl = element.shadowRoot?.querySelector('label');
			expect(labelEl?.textContent?.trim()).toEqual(label);
		});
	});

	describe('checked', () => {
		let base: HTMLElement;
		beforeEach(() => (base = getBaseElement(element)));

		it('should set the element property and the base class when the attribute is set', async () => {
			const classes = await setBoolAttributeOn(element, 'checked');
			expect(element.checked).toBeTruthy();
			expect(classes.contains('checked')).toBeTruthy();
		});

		it('should set the element attribute and the base class when the property is set', async () => {
			element.checked = true;
			await elementUpdated(element);
			expect(base.classList.contains('checked')).toBeTruthy();
			expect(element.checked).toBeTruthy();
		});

		const sendEventAndVerifyChecked = async (e: Event) => {
			base.dispatchEvent(e);
			await elementUpdated(element);
			expect(element.checked).toBeTruthy();
		};

		it('should switch to checked when clicked', async () =>
			await sendEventAndVerifyChecked(new MouseEvent('click')));

		it('should switch to checked when space is pressed', async () =>
			await sendEventAndVerifyChecked(
				new KeyboardEvent('keypress', { key: ' ' })
			));
	});

	describe('connotation', function () {
		it('should set the connotation class on base', async function () {
			const connotation = Connotation.CTA;
			(element as any).connotation = 'cta';
			await elementUpdated(element);
			expect(
				element.shadowRoot
					?.querySelector('.base')
					?.classList.contains(`connotation-${connotation}`)
			).toEqual(true);
		});
	});

	it('should not prevent default of keypress other than Space', () => {
		const event = new KeyboardEvent('keypress', { key: 'Enter' });
		const spy = jest.spyOn(event, 'preventDefault');
		getBaseElement(element).dispatchEvent(event);
		expect(spy).not.toHaveBeenCalled();
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			const classes = await setBoolAttributeOn(element, 'disabled');
			expect(classes.contains('disabled')).toBeTruthy();
		});
	});

	describe('readonly', function () {
		it('should set readonly class when readonly is true', async () => {
			const classes = await setBoolAttributeOn(element, 'readonly');
			expect(classes.contains('readonly')).toBeTruthy();
		});
	});

	describe('form association', function () {
		it('should attach to closest form', async function () {
			const formWrapper = document.createElement('div');
			const formId = 'testFormId';
			const fieldName = 'testRadio';
			const checked = 'on';
			const { form: formElement } = createFormHTML<Radio>({
				fieldName,
				formId,
				formWrapper,
				checked,
				componentTagName: COMPONENT_TAG,
			});
			document.body.append(formWrapper);

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();
			(await submitPromise).forEach(
				(formDataValue: any, formDataKey: string) => {
					expect(formDataKey).toEqual(fieldName);
					expect(formDataValue).toEqual(checked);
				}
			);
		});
	});

	describe('required', () => {
		it('should reflect required attribute', async () => {
			element.required = true;
			await elementUpdated(element);
			expect(element.hasAttribute('required')).toBe(true);
		});

		it('should invalidate the element when required and not selected', async () => {
			element.required = true;
			await elementUpdated(element);
			element.checkValidity();
			expect(element.validity.valueMissing).toBe(true);
		});

		it('should set the name attribute on the proxy element so that elementals validation works', async () => {
			element.name = 'test';
			await elementUpdated(element);
			expect(element.proxy.name).toBe('test');
		});

		it('should remove the proxy name attribute if removed from the element', async () => {
			element.name = 'test';
			await elementUpdated(element);

			element.removeAttribute('name');
			await elementUpdated(element);

			expect(element.proxy.getAttribute('name')).toBeNull();
		});

		function mockElementInternals() {
			function addElementInternals(this: Radio) {
				let internals = InternalsMap.get(this);

				if (!internals) {
					internals = (this as any).attachInternals();
					InternalsMap.set(this, internals);
				}

				return internals;
			}

			return (internalsMock = jest
				.spyOn(Radio.prototype, 'elementInternals', 'get')
				.mockImplementation(addElementInternals));
		}

		function mockFormAssociated() {
			return (formAssociatedMock = jest
				.spyOn(Radio as any, 'formAssociated', 'get')
				.mockReturnValue(true));
		}

		const InternalsMap = new WeakMap();
		it('should sync validity from siblings in same group and name when all unchecked', async () => {
			await import('element-internals-polyfill');

			mockFormAssociated();
			mockElementInternals();

			const sibling = document.createElement(COMPONENT_TAG) as Radio;
			sibling.name = element.name = 'test';
			sibling.required = element.required = true;

			element.parentElement?.appendChild(sibling);
			await elementUpdated(element);

			expect(element.validity.valueMissing).toBe(true);
		});

		it('should sync validity with siblings in same group and name when checked', async () => {
			await import('element-internals-polyfill');

			mockFormAssociated();
			mockElementInternals();

			const sibling = document.createElement(COMPONENT_TAG) as Radio;
			sibling.name = element.name = 'test';
			sibling.required = element.required = true;

			element.parentElement?.appendChild(sibling);
			await elementUpdated(element);
			sibling.checked = true;
			await elementUpdated(element);

			expect(element.validity.valueMissing).toBe(false);
		});

		it('should set the correct valueMissing validity when added to the DOM with valid group', async () => {
			await import('element-internals-polyfill');

			mockFormAssociated();
			mockElementInternals();

			const sibling = document.createElement(COMPONENT_TAG) as Radio;
			sibling.name = element.name = 'test';
			sibling.required = element.required = true;
			element.checked = true;

			await elementUpdated(element);
			element.parentElement?.appendChild(sibling);

			await elementUpdated(element);

			expect(sibling.validity.valueMissing).toBe(false);
		});

		it("should sync siblings' validity.valueMissing when added as checked", async () => {
			await import('element-internals-polyfill');

			mockFormAssociated();
			mockElementInternals();

			const sibling = document.createElement(COMPONENT_TAG) as Radio;
			sibling.name = element.name = 'test';
			sibling.required = element.required = true;
			sibling.checked = true;

			await elementUpdated(element);
			element.parentElement?.appendChild(sibling);

			await elementUpdated(element);

			expect(element.validity.valueMissing).toBe(false);
		});
	});
	describe('change', () => {
		it('should be fired when a user toggles the radio', async () => {
			const spy = jest.fn();
			element.addEventListener('change', spy);

			getBaseElement(element).click();
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'lorem';
			element.checked = true;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		it('should not render a role attribute on the component element', async () => {
			expect(element.getAttribute('role')).toBe(null);
		});

		it('should render the correct a11y attributes', async () => {
			const baseElement = getBaseElement(element);

			expect(baseElement?.getAttribute('role')).toBe('radio');
		});

		describe('aria-label', () => {
			beforeEach(async () => {
				element.ariaLabel = 'Label';
				await elementUpdated(element);
			});

			it('should render role as presentation on the component element', async () => {
				expect(element.getAttribute('role')).toBe('presentation');
			});

			it('should render the correct a11y attributes', async () => {
				const baseElement = getBaseElement(element);

				expect(baseElement?.getAttribute('role')).toBe('radio');
				expect(baseElement?.getAttribute('aria-label')).toBe('Label');
			});

			it('should pass html a11y test', async () => {
				expect(await axe(element)).toHaveNoViolations();
			});
		});
	});
});
