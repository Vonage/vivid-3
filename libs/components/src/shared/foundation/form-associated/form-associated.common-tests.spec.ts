import { customElement, DOM, html } from '@microsoft/fast-element';
import { fixture } from '../test-utilities/fixture';
import { VividElement } from '../vivid-element/vivid-element';
import { CheckableFormAssociated, FormAssociated } from './form-associated';

// As the ElementInternals polyfill will apply to a whole test suite, we define common tests in this suite and then
// import them into 2 different suites where ElementInternals is supported and not supported.

const template = html` <slot></slot> `;

@customElement({
	name: 'test-element',
	template,
})
export class TestElement extends FormAssociated(VividElement) {
	override proxy = document.createElement('input');

	constructor() {
		super();

		this.proxy.setAttribute('type', 'text');
	}
}

@customElement({
	name: 'custom-initial-value',
	template,
})
export class CustomInitialValue extends FormAssociated(VividElement) {
	override proxy = document.createElement('input');

	constructor() {
		super();

		this.proxy.setAttribute('type', 'text');
	}

	override initialValue = 'foobar';
}

@customElement({
	name: 'validate-test',
	template,
})
export class ValidateTest extends FormAssociated(VividElement) {
	override proxy = document.createElement('input');
	control = document.createElement('input');

	constructor() {
		super();

		this.proxy.setAttribute('type', 'text');
		(this as any).setValidity = vi.fn();
		Object.defineProperty(this.proxy, 'validationMessage', {
			value: 'proxy validation message',
		});
		Object.defineProperty(this.control, 'validationMessage', {
			value: 'control validation message',
		});
	}
}

@customElement({
	name: 'checkable-form-associated',
	template,
})
export class Checkable extends CheckableFormAssociated(VividElement) {
	override proxy = document.createElement('input');

	constructor() {
		super();

		this.proxy.setAttribute('type', 'checkbox');
	}
}

export async function setup<T = TestElement>(el = 'test-element') {
	const { connect, disconnect, element, parent } = await fixture<T>(el);

	return { connect, disconnect, element, parent };
}

export const formAssociatedCommonTests = () => {
	describe('construction and connection:', () => {
		it('should have an empty string value prior to connectedCallback', async () => {
			const { element } = await setup();

			expect(element.value).toBe('');
			expect(element.currentValue).toBe(element.value);
		});

		it('should initialize to the initial value if no value property is set', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.value).toBe(element.initialValue);
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should initialize to the provided value ATTRIBUTE if set pre-connection', async () => {
			const { connect, disconnect, element } = await setup();

			element.setAttribute('value', 'foobar');

			await connect();

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should initialize to the provided value ATTRIBUTE if set post-connection', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			element.setAttribute('value', 'foobar');

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should initialize to the provided value PROPERTY if set pre-connection', async () => {
			const { connect, disconnect, element } = await setup();

			element.value = 'foobar';

			await connect();

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should initialize to the provided value PROPERTY if set post-connection', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			element.value = 'foobar';

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should initialize to the initial value when initial value is assigned by extending class', async () => {
			const { connect, disconnect, element } = await setup<CustomInitialValue>(
				'custom-initial-value'
			);

			await connect();

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should communicate initial value to the parent form', async () => {
			const { connect, disconnect, element, parent } =
				await setup<CustomInitialValue>('custom-initial-value');

			element.setAttribute('name', 'test');

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			const formData = new FormData(form);

			expect(formData.get('test')).toBe('foobar');

			await disconnect();
		});
	});

	describe('changes:', () => {
		it('setting value ATTRIBUTE should set value if value PROPERTY has not been explicitly set', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			element.setAttribute('value', 'foobar');

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			element.setAttribute('value', 'barbat');

			expect(element.value).toBe('barbat');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('setting value ATTRIBUTE should not set value if value PROPERTY has been explicitly set', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			element.value = 'foobar';

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			element.setAttribute('value', 'barbat');

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('setting value ATTRIBUTE should set parent form value if value PROPERTY has not been explicitly set', async () => {
			const { connect, disconnect, element, parent } = await setup();

			element.setAttribute('name', 'test');

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			let formData = new FormData(form);

			expect(formData.get('test')).toBe('');

			element.setAttribute('value', 'foobar');

			formData = new FormData(form);

			expect(formData.get('test')).toBe('foobar');

			await disconnect();
		});

		it('setting value PROPERTY should set parent form value', async () => {
			const { connect, disconnect, element, parent } = await setup();
			element.setAttribute('name', 'test');

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			let formData = new FormData(form);

			expect(formData.get('test')).toBe('');

			element.value = 'foobar';

			formData = new FormData(form);

			expect(formData.get('test')).toBe('foobar');

			await disconnect();
		});

		it('assigning the currentValue property should set the controls value property to the same value', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.value).toBe('');
			expect(element.currentValue).toBe(element.value);

			element.currentValue = 'foobar';

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('setting the current-value property should set the controls value property to the same value', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.value).toBe('');
			expect(element.currentValue).toBe(element.value);

			element.setAttribute('current-value', 'foobar');

			expect(element.value).toBe('foobar');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});
	});

	describe('checkValidity', () => {
		it('should return true if the control is valid', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.checkValidity()).toBe(true);

			await disconnect();
		});

		it('should return false if the control is invalid', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			element.setValidity(
				{
					valueMissing: true,
				},
				'Value missing'
			);

			expect(element.checkValidity()).toBe(false);

			await disconnect();
		});
	});

	describe('reportValidity', () => {
		it('should return true if the control is valid', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.reportValidity()).toBe(true);

			await disconnect();
		});

		it('should return false if the control is invalid', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			element.setValidity(
				{
					valueMissing: true,
				},
				'Value missing'
			);

			expect(element.reportValidity()).toBe(false);

			await disconnect();
		});
	});

	describe('labels', () => {
		it('should return a NodeList of all label elements associated with the control', async () => {
			const { connect, disconnect, element, parent } = await setup();

			element.id = 'test';

			const label1 = document.createElement('label');
			label1.htmlFor = 'test';
			label1.textContent = 'test-label-1';

			const label2 = document.createElement('label');
			label2.htmlFor = 'test';
			label2.textContent = 'test-label-2';

			parent.appendChild(label1);
			parent.appendChild(label2);

			await connect();

			const labels = element.labels;

			expect(labels.length).toBe(2);
			expect(labels[0]).toBe(label1);
			expect(labels[1]).toBe(label2);

			await disconnect();
		});

		it('should return an empty list if the element is not connected', async () => {
			const { element } = await setup();

			expect(element.labels).toHaveLength(0);
		});
	});

	describe('willValidate', () => {
		it('should return true if the element participates in constraint validation', async () => {
			const { element } = await setup();

			expect(element.willValidate).toBe(true);
		});

		it('should return false if the element is barred from constraint validation, e.g. by being disabled', async () => {
			const { element } = await setup();
			element.disabled = true;

			expect(element.willValidate).toBe(false);
		});
	});

	it('should click the submit button of the owning form when Enter is pressed', async () => {
		const { connect, disconnect, element, parent } = await setup();

		const form = document.createElement('form');
		form.appendChild(element);
		parent.appendChild(form);

		const submitButton = document.createElement('button');
		submitButton.type = 'submit';
		submitButton.click = vi.fn();
		form.appendChild(submitButton);

		await connect();

		const event = new KeyboardEvent('keypress', { key: 'Enter' });
		element.dispatchEvent(event);

		expect(submitButton.click).toHaveBeenCalled();

		await disconnect();
	});

	it('should do nothing if the owning form does not have a submit button when Enter is pressed', async () => {
		const { connect, disconnect, element, parent } = await setup();

		const form = document.createElement('form');
		form.appendChild(element);
		parent.appendChild(form);

		await connect();

		const event = new KeyboardEvent('keypress', { key: 'Enter' });
		element.dispatchEvent(event);

		await disconnect();
	});

	describe("when the owning form's reset() method is invoked", () => {
		it("should reset it's value property to an empty string if no value attribute is set", async () => {
			const { connect, disconnect, element, parent } = await setup();

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			element.value = 'test-value';

			expect(element.getAttribute('value')).toBe(null);

			expect(element.value).toBe('test-value');
			expect(element.currentValue).toBe(element.value);

			form.reset();

			expect((element as TestElement).value).toBe('');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it("should reset it's value property to the value of the value attribute if it is set", async () => {
			const { connect, disconnect, element, parent } = await setup();

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			element.setAttribute('value', 'attr-value');
			expect(element.currentValue).toBe(element.value);

			element.value = 'test-value';

			expect(element.getAttribute('value')).toBe('attr-value');
			expect(element.value).toBe('test-value');
			expect(element.currentValue).toBe(element.value);

			form.reset();

			expect((element as TestElement).value).toBe('attr-value');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});

		it('should put the control into a clean state, where value attribute changes change the property value prior to user or programmatic interaction', async () => {
			const { connect, disconnect, element, parent } = await setup();

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			element.value = 'test-value';

			element.setAttribute('value', 'attr-value');

			expect(element.value).toBe('test-value');
			expect(element.currentValue).toBe(element.value);

			form.reset();

			expect((element as TestElement).value).toBe('attr-value');
			expect(element.currentValue).toBe(element.value);

			element.setAttribute('value', 'new-attr-value');

			expect((element as TestElement).value).toBe('new-attr-value');
			expect(element.currentValue).toBe(element.value);

			await disconnect();
		});
	});
};

export const checkableFormAssociatedCommonTests = () => {
	function assertChecked(element: Checkable) {
		return (value: boolean) => {
			expect(element.checked).toBe(value);
			expect(element.currentChecked).toBe(value);
			expect(element.getAttribute('current-checked')).toBe(`${value}`);
		};
	}
	it("should have a 'checked' property that is initialized to false", async () => {
		const { connect, element } = await setup<Checkable>(
			'checkable-form-associated'
		);

		await connect();
		await DOM.nextUpdate();

		assertChecked(element)(false);
	});
	it('should align the `currentChecked` property and `current-checked` attribute with `checked` property changes', async () => {
		const { connect, element } = await setup<Checkable>(
			'checkable-form-associated'
		);

		await connect();
		await DOM.nextUpdate();
		const test = assertChecked(element);

		test(false);

		element.checked = true;

		await DOM.nextUpdate();
		test(true);

		element.checked = false;
		await DOM.nextUpdate();
		test(false);
	});
	it('should align the `checked` property and `currentChecked` attribute with `current-checked` attribute changes', async () => {
		const { connect, element } = await setup<Checkable>(
			'checkable-form-associated'
		);

		await connect();
		await DOM.nextUpdate();
		const test = assertChecked(element);

		test(false);

		element.setAttribute('current-checked', 'true');

		await DOM.nextUpdate();
		test(true);

		element.setAttribute('current-checked', 'false');
		await DOM.nextUpdate();
		test(false);
	});

	describe('currentChecked property', () => {
		it('should reflect the `checked` property', async () => {
			const { connect, element } = await setup<Checkable>(
				'checkable-form-associated'
			);
			await connect();
			await DOM.nextUpdate();

			element.checked = true;
			expect(element.currentChecked).toBe(true);

			element.currentChecked = false;
			expect(element.checked).toBe(false);
		});
	});

	describe('checkedAttribute property', () => {
		it('should reflect the `defaultChecked` property', async () => {
			const { connect, element } = await setup<Checkable>(
				'checkable-form-associated'
			);
			await connect();
			await DOM.nextUpdate();

			element.defaultChecked = true;
			expect(element.checkedAttribute).toBe(true);

			element.checkedAttribute = false;
			expect(element.defaultChecked).toBe(false);
		});
	});

	describe("when the owning form's reset() method is invoked", () => {
		it("should reset it's checked property to the value of the checked attribute", async () => {
			const { connect, disconnect, element, parent } = await setup<Checkable>(
				'checkable-form-associated'
			);

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			DOM.setBooleanAttribute(element, 'checked', true);

			form.reset();

			expect(element.checked).toBe(true);
			expect(element.currentChecked).toBe(element.checked);

			await disconnect();
		});

		it('should put the control into a clean state, where checked attribute changes change the property value prior to user or programmatic interaction', async () => {
			const { connect, disconnect, element, parent } = await setup<Checkable>(
				'checkable-form-associated'
			);

			const form = document.createElement('form');
			form.appendChild(element);
			parent.appendChild(form);

			await connect();

			element.checked = true;

			form.reset();

			DOM.setBooleanAttribute(element, 'checked', true);

			expect(element.checked).toBe(true);
			expect(element.currentChecked).toBe(element.checked);

			await disconnect();
		});
	});
};

// Workaround as one test is required per test suite
it('dummy test', () => undefined);
