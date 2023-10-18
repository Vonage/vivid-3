import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation, Size } from '../enums';
import { SelectableBox } from './selectable-box';
import { selectableBoxDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-selectable-box';

describe('vwc-selectable-box', () => {
	let element: SelectableBox;
	let baseElement: HTMLElement;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SelectableBox;
		baseElement = getBaseElement(element);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-selectable-box', async () => {
			expect(selectableBoxDefinition()).toBeInstanceOf(
				FoundationElementRegistry
			);
			expect(element).toBeInstanceOf(SelectableBox);
			expect(element.control).toBe(undefined);
			expect(element.connotation).toBe(undefined);
			expect(element.spacing).toBe(undefined);
			expect(element.noPadding).toBe(false);
			expect(element.checked).toBe(false);
		});
	});

	describe('connotation', () => {
		it('should set connotation class on the base element', async function () {
			element.connotation = Connotation.CTA;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains(`connotation-${Connotation.CTA}`)).toBe(true);
		});

		it('should set connotation attribute on the control element', async function () {
			element.connotation = Connotation.CTA;
			await elementUpdated(element);
			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.getAttribute('connotation')).toBe('cta');
		});
	});

	describe('control', () => {
		it('should display a checkbox by default', async () => {
			const control = element.shadowRoot?.querySelector('.checkbox');
			expect(control).not.toBe(null);
		});

		it('should display a radio when control is set to radio', async () => {
			element.control = 'radio';
			await elementUpdated(element);
			const control = element.shadowRoot?.querySelector('.radio');
			expect(control).not.toBe(null);
		});
	});

	describe('spacing', () => {
		it('should set spacing class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.spacing = Size.Condensed;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains(`spacing-${Size.Condensed}`)).toBe(true);
		});
	});

	describe('no-padding', () => {
		it('should set no-padding class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.noPadding = true;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains('no-padding')).toBe(true);
		});
	});

	describe('checked', () => {
		it('should set active class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.checked = true;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains('active')).toBe(true);
		});

		it('should set the checked attribute on the control element', async () => {
			element.checked = true;
			await elementUpdated(element);
			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.getAttribute('checked')).toBe('true');
		});
	});

	describe('clickable', () => {
		it('should set clickable class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.clickable = true;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains('clickable')).toBe(true);
		});
	});

	describe('changed event', () => {
		it('should emit the changed event when the checked state changes', async () => {
			element.clickable = true;
			await elementUpdated(element);
			const baseElement = getBaseElement(element);
			const spy = jest.fn();
			element.addEventListener('change', spy);
			baseElement.click();
			await elementUpdated(element);

			expect(spy).toHaveBeenCalled();
		});
	});

	describe('a11y', () => {
		it('should put the correct a11y attributes on the control element', async () => {
			element.ariaLabel = 'Box 1';
			element.ariaLabelledby = 'heading1';
			await elementUpdated(element);
			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.getAttribute('aria-label')).toBe('Box 1');
			expect(control?.getAttribute('aria-labelledby')).toBe('heading1');
		});

		describe('clickable', () => {
			beforeEach(async () => {
				element.clickable = true;
				element.ariaLabel = 'Box 1';
				element.ariaLabelledby = 'heading1';
				await elementUpdated(element);
			});

			it('should put the correct a11y attributes on the control element', async () => {
				const control = element.shadowRoot?.querySelector('.control');
				expect(control?.getAttribute('aria-hidden')).toBe('true');
				expect(control?.getAttribute('tabindex')).toBe('-1');
				expect(control?.getAttribute('aria-label')).toBe(null);
				expect(control?.getAttribute('aria-labelledby')).toBe(null);
			});

			it('should put the correct a11y attributes on the base element', async () => {
				const baseElement = getBaseElement(element);
				expect(baseElement?.getAttribute('aria-label')).toBe('Box 1');
				expect(baseElement?.getAttribute('aria-labelledby')).toBe('heading1');
				expect(baseElement?.getAttribute('aria-checked')).toBe(null);
				expect(baseElement?.getAttribute('role')).toBe('checkbox');
				expect(baseElement?.getAttribute('tabindex')).toBe('0');
			});

			it('should add the aria-checked attribute to the base element when checked is true', async () => {
				element.checked = true;
				await elementUpdated(element);
				const baseElement = getBaseElement(element);
				expect(baseElement?.getAttribute('aria-checked')).toBe('true');
			});
		});

		it('should pass html a11y test', async () => {
			element.clickable = true;
			element.ariaLabel = 'Box 1';
			await elementUpdated(element);
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
