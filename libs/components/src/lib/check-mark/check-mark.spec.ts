import { axe, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { CheckMark } from './check-mark';
import { checkMarkDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-check-mark';

describe('vwc-check-mark', () => {
	let element: CheckMark;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as CheckMark;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-check-mark', async () => {
			expect(checkMarkDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(CheckMark);
		});
	});

	describe('checked', () => {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} checked></${COMPONENT_TAG}>`
			)) as CheckMark;
		});

		it('should render the correct class', async () => {
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('checked')).toBe(true);
		});

		it('should render the correct icon', async () => {
			const iconElement = element.shadowRoot?.querySelector('.icon');
			
			expect(iconElement?.getAttribute('name')).toBe('check-solid');
		});
	});

	describe('indeterminate', () => {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} indeterminate></${COMPONENT_TAG}>`
			)) as CheckMark;
		});

		it('should render the correct class', async () => {
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('checked')).toBe(true);
		});

		it('should render the correct icon', async () => {
			const iconElement = element.shadowRoot?.querySelector('.icon');
			
			expect(iconElement?.getAttribute('name')).toBe('minus-solid');
		});
	});

	describe('disabled', () => {
		it('should render the correct class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} disabled></${COMPONENT_TAG}>`
			)) as CheckMark;
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('disabled')).toBe(true);
		});
	});

	describe('readonly', () => {
		it('should render the correct class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} readonly></${COMPONENT_TAG}>`
			)) as CheckMark;
			const baseElement = getBaseElement(element);
			
			expect(baseElement.classList.contains('readonly')).toBe(true);
		});
	});

	describe('connotation', () => {
		it('should render the correct class', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} connotation="cta"></${COMPONENT_TAG}>`
			)) as CheckMark;
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
