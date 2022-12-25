import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { Select } from './select';
import '.';

const COMPONENT_TAG = 'vwc-select';

describe('vwc-select', () => {
	let element: Select;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Select;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-select', async () => {
			expect(element).toBeInstanceOf(Select);
			expect(element.open).toEqual(false);
			expect(element.disabled).toEqual(false);
		});
	});

	describe('label', function () {
		it('should set a select label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeTruthy();
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});
	});

	describe('disabled', function () {
		it('should set disabled class for select  when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.disabled')).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.disabled')).toBeTruthy();
		});
	});

	describe('open', function () {
		it('should set open when clicked', async () => {
			expect(element.open).toEqual(false);
			getBaseElement(element).click();
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'fieldset';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			expect(getBaseElement(element)
				.classList
				.contains('appearance-fieldset'))
				.toEqual(true);
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			expect(getBaseElement(element)
				.classList
				.contains('shape-pill'))
				.toEqual(true);
		});
	});


});
