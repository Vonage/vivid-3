import { elementUpdated } from '@vivid-nx/shared';
import type { MockInstance } from 'vitest';
import type { RadioGroup } from '../radio-group/radio-group';
import { Radio } from './radio';
import '.';

const COMPONENT_TAG = 'vwc-radio';
const RADIO_GROUP_COMPONENT_TAG = 'vwc-radio-group';

const setupFixture = async (
	wrapper: HTMLElement,
	options?: { insideRadioGroup?: boolean }
) => {
	const { insideRadioGroup = false } = options || {};
	let elementWithInternals: Radio = document.createElement(COMPONENT_TAG);
	let sibling: Radio = document.createElement(COMPONENT_TAG);
	let radioGroup: RadioGroup | null = null;

	if (insideRadioGroup) {
		radioGroup = document.createElement(RADIO_GROUP_COMPONENT_TAG);
		elementWithInternals = radioGroup.appendChild(elementWithInternals);
		sibling = radioGroup.appendChild(sibling);
		wrapper.appendChild(radioGroup);
	} else {
		wrapper.appendChild(elementWithInternals);
		wrapper.appendChild(sibling);
	}

	await elementUpdated(elementWithInternals);

	return { wrapper, elementWithInternals, sibling, radioGroup };
};

describe('vwc-radio', () => {
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
		wrapper.id = 'wrapper';
		let internalsMock: MockInstance | null = null;
		let formAssociatedMock: MockInstance | null = null;

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
		});

		afterEach(() => {
			wrapper.innerHTML = '';
		});

		it('should sync validity from siblings in same group and name when all unchecked', async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(true);
		});

		it('should sync validity with siblings in same group and name when checked', async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			sibling.checked = true;
			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should set the correct valueMissing validity when added to the DOM with valid group', async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			elementWithInternals.checked = true;

			await elementUpdated(elementWithInternals);

			expect(sibling.validity.valueMissing).toBe(false);
		});

		it("should sync siblings' validity.valueMissing when added as checked", async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
			sibling.name = elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = true;
			sibling.checked = true;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should sync values when name changes to that of siblings', async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
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
			const { elementWithInternals } = await setupFixture(wrapper);
			elementWithInternals.name = 'test';
			elementWithInternals.required = false;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
		});

		it('should validate valueMissing on radio-group only when required is set', async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
			sibling.name = 'test';
			elementWithInternals.name = 'test';
			sibling.required = elementWithInternals.required = false;

			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
			expect(sibling.validity.valueMissing).toBe(false);
		});

		it('should validate valueMissing when required is set on at least one sibling', async () => {
			const { sibling, elementWithInternals } = await setupFixture(wrapper);
			sibling.name = elementWithInternals.name = 'test';

			sibling.required = false;
			elementWithInternals.required = true;
			await elementUpdated(elementWithInternals);

			sibling.checked = true;
			await elementUpdated(elementWithInternals);

			expect(elementWithInternals.validity.valueMissing).toBe(false);
			expect(sibling.validity.valueMissing).toBe(false);
		});

		describe('inside the radio-group', () => {
			it('should sync the validation inside the radio-group', async () => {
				const { sibling, elementWithInternals, radioGroup } =
					await setupFixture(wrapper, { insideRadioGroup: true });
				radioGroup?.setAttribute('required', '');
				radioGroup?.setAttribute('name', 'test');
				sibling.name = elementWithInternals.name = 'test';

				sibling.required = false;
				sibling.checked = true;
				elementWithInternals.required = true;
				await elementUpdated(elementWithInternals);

				sibling.checked = true;
				await elementUpdated(elementWithInternals);

				expect(elementWithInternals.validity.valueMissing).toBe(false);
				expect(sibling.validity.valueMissing).toBe(false);
			});

			it('should set the correct valueMissing validity when added to the DOM with valid group', async () => {
				const { sibling, elementWithInternals, radioGroup } =
					await setupFixture(wrapper, { insideRadioGroup: true });
				radioGroup?.setAttribute('required', '');
				radioGroup?.setAttribute('name', 'test');

				sibling.name = elementWithInternals.name = 'test';
				sibling.required = elementWithInternals.required = true;
				elementWithInternals.checked = true;

				await elementUpdated(elementWithInternals);

				expect(sibling.validity.valueMissing).toBe(false);
			});
		});
	});
});
