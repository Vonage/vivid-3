import { elementUpdated, fixture } from '@vivid-nx/shared';
import { Radio } from './radio';
import '.';

const COMPONENT_TAG = 'vwc-radio';

describe('vwc-radio', () => {
	let element: Radio;

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Radio;
		await elementUpdated(element);
	});

	describe('require with internals', () => {
		function mockElementInternals() {
			function addElementInternals(this: Radio) {
				let internals = InternalsMap.get(this);

				if (!internals) {
					internals = (this as any).attachInternals();
					InternalsMap.set(this, internals);
				}

				return internals;
			}

			internalsMock = vi
				.spyOn(Radio.prototype, 'elementInternals', 'get')
				.mockImplementation(addElementInternals);
		}

		function mockFormAssociated() {
			formAssociatedMock = vi
				.spyOn(Radio as any, 'formAssociated', 'get')
				.mockReturnValue(true);
		}

		const InternalsMap = new WeakMap();
		const wrapper = document.createElement('div');
		let elementWithInternals: Radio;
		let sibling: Radio;
		let internalsMock: vi.SpyInstance | null = null;
		let formAssociatedMock: vi.SpyInstance | null = null;

		beforeAll(async () => {
			await import('element-internals-polyfill');
			document.body.appendChild(wrapper);
		});

		afterAll(() => {
			wrapper.remove();
			internalsMock?.mockRestore();
			formAssociatedMock?.mockRestore();
			internalsMock = null;
			formAssociatedMock = null;
			(window as any).ElementInternals = undefined;
			(HTMLElement.prototype as any).attachInternals = undefined;
		});

		beforeEach(async () => {
			mockFormAssociated();
			mockElementInternals();
			elementWithInternals = document.createElement(COMPONENT_TAG) as Radio;
			sibling = document.createElement(COMPONENT_TAG) as Radio;
			wrapper.appendChild(elementWithInternals);
			wrapper.appendChild(sibling);
			await elementUpdated(elementWithInternals);
		});

		afterEach(() => {
			wrapper.innerHTML = '';
		});

		it('should sync validity from siblings in same group and name when all unchecked', async () => {
			sibling = document.createElement(COMPONENT_TAG) as Radio;
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(true);
		});

		it('should sync validity with siblings in same group and name when checked', async () => {
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			sibling.checked = true;
			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should set the correct valueMissing validity when added to the DOM with valid group', async () => {
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			elementWithInternals.checked = true;

			await elementUpdated(elementWithInternals);

			expect(sibling.validity.valueMissing).toBe(false);
		});

		it("should sync siblings' validity.valueMissing when added as checked", async () => {
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			sibling.checked = true;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should sync values when name changes to that of siblings', async () => {
			sibling.name = 'not-test';
			elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			sibling.checked = true;

			await elementUpdated(elementWithInternals);

			const valueWhenNameIsDifferent =
				elementWithInternals.validity.valueMissing;

			elementWithInternals.name = sibling.name;
			await elementUpdated(elementWithInternals);

			expect(valueWhenNameIsDifferent).toBe(true);
			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should validate valueMissing on a single radio only when required is set', async () => {
			elementWithInternals.name = 'test';
			elementWithInternals.required = false;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should validate valueMissing on radio-group only when required is set', async () => {
			sibling.name = 'test';
			elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = false;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
			expect(sibling.validity.valueMissing).toBe(false);
		});

		it('should validate valueMissing when required is set on at least one sibling', async () => {
			sibling.name = elementWithInternals.name = 'test';

			sibling.required = false;
			elementWithInternals.required = true;
			await elementUpdated(elementWithInternals);

			sibling.checked = true;
			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
			expect(sibling.validity.valueMissing).toBe(false);
		});
	});
});
