import { axe, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { RadioMark } from './radio-mark';
import { radioMarkDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-radio-mark';

describe('vwc-radio-mark', () => {
	let element: RadioMark;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RadioMark;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio-mark', async () => {
			expect(radioMarkDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(RadioMark);
		});
	});

	describe('checked', () => {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} checked></${COMPONENT_TAG}>`
			)) as RadioMark;
		});

		it('should render the correct class', async () => {
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('checked')).toBe(true);
		});
	});

	describe('disabled', () => {
		it('should render the correct class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} disabled></${COMPONENT_TAG}>`
			)) as RadioMark;
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('disabled')).toBe(true);
		});
	});

	describe('readonly', () => {
		it('should render the correct class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} readonly></${COMPONENT_TAG}>`
			)) as RadioMark;
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('readonly')).toBe(true);
		});
	});

	describe('connotation', () => {
		it('should render the correct class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} connotation="cta"></${COMPONENT_TAG}>`
			)) as RadioMark;
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('connotation-cta')).toBe(true);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
