import { axe, elementUpdated, fixture, getBaseElement, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation } from '../enums';
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
			expect(element.controlAriaLabel).toBe(null);
			expect(element.controlAriaLabelledby).toBe(null);
			expect(element.controlType).toBe(undefined);
			expect(element.connotation).toBe(undefined);
			expect(element.spacing).toBe(undefined);
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
			const control = getControlElement(element);

			expect(control?.getAttribute('connotation')).toBe('cta');
		});

		describe('radio', () => {
			it('should set connotation attribute on the control element', async function () {
				element.controlType = 'radio';
				element.connotation = Connotation.CTA;
				await elementUpdated(element);
				const control = getControlElement(element);
	
				expect(control?.getAttribute('connotation')).toBe('cta');
			});
		});
	});

	describe('control', () => {
		it('should display a checkbox by default', async () => {
			const control = getControlElement(element);

			expect(control).not.toBe(null);
			expect(control?.getAttribute('checked')).toBe(null);
		});

		it('should display a radio when control is set to radio', async () => {
			element.controlType = 'radio';
			await elementUpdated(element);
			const control = getControlElement(element);

			expect(control).not.toBe(null);
			expect(control?.getAttribute('current-checked')).toBe('false');
		});
	});

	describe('spacing', () => {
		it('should set spacing class on the base element', async function () {
			element.spacing = 'small';
			await elementUpdated(element);

			expect(baseElement?.classList?.contains('spacing-small')).toBe(true);
		});
	});

	describe('tight', () => {
		it('should set tight class on the base element', async function () {
			element.tight = true;
			await elementUpdated(element);

			expect(baseElement?.classList?.contains('tight')).toBe(true);
		});
	});

	describe('checked', () => {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} checked></${COMPONENT_TAG}>`
			)) as SelectableBox;
			baseElement = getBaseElement(element);
		});
		
		it('should set checked class on the base element', async function () {
			expect(baseElement?.classList?.contains('checked')).toBe(true);
		});

		it('should set the checked attribute on the control element', async () => {
			const control = getControlElement(element);
			const controlElement = control.shadowRoot?.querySelector('[role="checkbox"]');
			
			expect(controlElement?.getAttribute('aria-checked')).toBe('true');
		});

		describe('radio', () => {
			it('should set the checked attribute on the control element', async () => {
				element = (await fixture(
					`<${COMPONENT_TAG} control-type="radio" checked></${COMPONENT_TAG}>`
				)) as SelectableBox;
				const control = getControlElement(element);
				const controlElement = control.shadowRoot?.querySelector('[role="radio"]');
			
				expect(controlElement?.getAttribute('aria-checked')).toBe('true');
			});
		});
	});

	describe('clickable', () => {
		it('should set clickable class on the base element', async function () {
			element.clickable = true;
			await elementUpdated(element);
			
			expect(baseElement?.classList?.contains('clickable')).toBe(true);
		});
	});

	describe('change event', () => {
		const spy = jest.fn();

		beforeEach(() => {
			element.addEventListener('change', spy);
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should not emit the change event when the base element is clicked and the element is not clickable', async () => {
			baseElement.click();
			
			expect(spy).not.toHaveBeenCalled();
		});

		it('should emit the change event when the control element changes', async () => {
			const controlElement = getControlElement(element);
			controlElement.dispatchEvent(new Event('change'));

			expect(spy).toHaveBeenCalled();
			expect(element.checked).toBe(true);
		});

		describe('clickable', () => {
			beforeEach(async () => {
				element.clickable = true;
				await elementUpdated(element);
			});

			it('should emit the change event when the checked state changes', async () => {
				baseElement.click();
				
				expect(spy).toHaveBeenCalled();
				expect(element.checked).toBe(true);
			});

			describe('keyboard', () => {
				it('should emit the change event when the checked state changes with Space keypress', async () => {
					baseElement.dispatchEvent(new KeyboardEvent('keydown', { composed: true, code: 'Space' }));
					
					expect(spy).toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});

				it('should emit the change event when the checked state changes with Enter keypress', async () => {
					baseElement.dispatchEvent(new KeyboardEvent('keydown', { composed: true, code: 'Enter' }));
					
					expect(spy).toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});
			});
		});
	});

	describe('a11y', () => {
		beforeEach(async () => {
			element.controlAriaLabel = 'Box 1';
			element.controlAriaLabelledby = 'heading1';
			await elementUpdated(element);
		});

		it('should put the correct a11y attributes on the control element', async () => {
			const control = getControlElement(element);
			
			expect(control?.getAttribute('tabindex')).toBe('0');
			expect(control?.getAttribute('aria-label')).toBe('Box 1');
			expect(control?.getAttribute('aria-labelledby')).toBe('heading1');
		});

		describe('radio', () => {
			it('should put the correct a11y attributes on the control element', async () => {
				element.controlType = 'radio';
				await elementUpdated(element);

				const control = getControlElement(element);

				expect(control?.getAttribute('tabindex')).toBe('0');
				expect(control?.getAttribute('aria-label')).toBe('Box 1');
				expect(control?.getAttribute('aria-labelledby')).toBe('heading1');
			});
		});

		describe('clickable', () => {
			beforeEach(async () => {
				element.clickable = true;
				await elementUpdated(element);
			});

			it('should put the correct a11y attributes on the control element', async () => {
				const control = getControlElement(element);
				
				expect(control?.getAttribute('tabindex')).toBe('-1');
				expect(control?.getAttribute('aria-hidden')).toBe('true');
			});

			describe('radio', () => {
				it('should put the correct a11y attributes on the control element', async () => {
					element.controlType = 'radio';
					await elementUpdated(element);
					const control = getControlElement(element);
					
					expect(control?.getAttribute('tabindex')).toBe('-1');
					expect(control?.getAttribute('aria-hidden')).toBe('true');
				});
			});

			it('should put the correct a11y attributes on the base element', async () => {
				expect(baseElement?.getAttribute('aria-label')).toBe('Box 1');
				expect(baseElement?.getAttribute('aria-labelledby')).toBe('heading1');
				expect(baseElement?.getAttribute('aria-pressed')).toBe(null);
				expect(baseElement?.getAttribute('role')).toBe('button');
				expect(baseElement?.getAttribute('tabindex')).toBe('0');
			});

			it('should add the aria-checked attribute to the base element when checked is true', async () => {
				element.checked = true;
				await elementUpdated(element);
				
				expect(baseElement?.getAttribute('aria-pressed')).toBe('true');
			});
		});

		/* these are skipped until aria-label and aria-labelledby 
		   can be passed down the checkbox's control element */
		xit('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});

		xdescribe('clickable', () => {
			it('should pass html a11y test', async () => {
				expect(await axe(element)).toHaveNoViolations();
			});
		});
	});
});
