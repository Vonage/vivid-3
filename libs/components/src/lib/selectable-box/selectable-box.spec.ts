import { axe, elementUpdated, fixture, getBaseElement, getControlElement } from '@vivid-nx/shared';
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
			expect(element.controlType).toBe(undefined);
			expect(element.connotation).toBe(undefined);
			expect(element.size).toBe(undefined);
			expect(element.tight).toBe(false);
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
			expect(control?.getAttribute('checked')).toBe('false');
		});

		it('should display a radio when control is set to radio', async () => {
			element.controlType = 'radio';
			await elementUpdated(element);
			const control = element.shadowRoot?.querySelector('.radio');
			expect(control).not.toBe(null);
			expect(control?.getAttribute('current-checked')).toBe('false');
		});
	});

	describe('size', () => {
		it('should set size class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.size = Size.Condensed;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains(`size-${Size.Condensed}`)).toBe(true);
		});
	});

	describe('tight', () => {
		it('should set tight class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.tight = true;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains('tight')).toBe(true);
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
			expect(control?.hasAttribute('checked')).toBe(true);
			expect(control?.getAttribute('current-checked')).toBe('true');
		});

		describe('radio', () => {
			it('should set the checked attribute on the control element', async () => {
				element.controlType = 'radio';
				element.checked = true;
				await elementUpdated(element);
				const control = element.shadowRoot?.querySelector('.control');
				expect(control?.hasAttribute('checked')).toBe(true);
				expect(control?.getAttribute('current-checked')).toBe('true');
			});
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
		it('should not emit the change event when the base element is clicked and the element is not clickable', async () => {
			const baseElement = getBaseElement(element);
			const spy = jest.fn();
			element.addEventListener('change', spy);
			baseElement.click();
			
			expect(spy).not.toHaveBeenCalled();
		});

		it('should emit the change event when the control element changes', async () => {
			const controlElement = getControlElement(element);
			const spy = jest.fn();
			element.addEventListener('change', spy);

			controlElement.dispatchEvent(new Event('change'));
			expect(spy).toHaveBeenCalled();
		});

		describe('clickable', () => {
			it('should emit the change event when the checked state changes', async () => {
				element.clickable = true;
				await elementUpdated(element);
				const baseElement = getBaseElement(element);
				const spy = jest.fn();
				element.addEventListener('change', spy);
				baseElement.click();
				
				expect(spy).toHaveBeenCalled();
			});

			it('should emit the change event when the checked state changes with keydown', async () => {
				element.clickable = true;
				await elementUpdated(element);
				const baseElement = getBaseElement(element);
				const spy = jest.fn();
				element.addEventListener('change', spy);
				baseElement.dispatchEvent(new KeyboardEvent('keydown', { composed: true, code: 'Space' }));
				
				expect(spy).toHaveBeenCalled();
			});
		});

		describe('checked radio', () => {
			it('should not emit the change event', async () => {
				element.controlType = 'radio';
				element.checked = true;
				element.clickable = true;
				await elementUpdated(element);
				const baseElement = getBaseElement(element);
				const spy = jest.fn();
				element.addEventListener('change', spy);
				baseElement.click();
				await elementUpdated(element);
	
				expect(spy).not.toHaveBeenCalled();
			});
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
				expect(baseElement?.getAttribute('aria-pressed')).toBe(null);
				expect(baseElement?.getAttribute('role')).toBe('button');
				expect(baseElement?.getAttribute('tabindex')).toBe('0');
			});

			it('should add the aria-checked attribute to the base element when checked is true', async () => {
				element.checked = true;
				await elementUpdated(element);
				const baseElement = getBaseElement(element);
				expect(baseElement?.getAttribute('aria-pressed')).toBe('true');
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
