import {
	axe,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import { Connotation } from '../enums';
import { SelectableBox } from './selectable-box';
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
			expect(element).toBeInstanceOf(SelectableBox);
			expect(element.controlType).toBe(undefined);
			expect(element.connotation).toBe(undefined);
			expect(element.clickableBox).toBe(false);
			expect(element.clickable).toBe(false);
			expect(element.tight).toBe(false);
			expect(element.checked).toBe(false);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should render the role attribute set to "presentation"', async () => {
			expect(element.getAttribute('role')).toBe('presentation');
		});
	});

	describe('connotation', () => {
		it('should set connotation class on the base element', async function () {
			element.connotation = Connotation.CTA;
			await elementUpdated(element);

			expect(
				baseElement?.classList?.contains(`connotation-${Connotation.CTA}`)
			).toBe(true);
		});

		it('should set connotation attribute on the control element', async function () {
			element.connotation = Connotation.CTA;
			await elementUpdated(element);
			const control = getControlElement(element);

			expect(control?.getAttribute('connotation')).toBe('cta');
		});

		describe('clickableBox', () => {
			it('should set connotation attribute on the control element', async function () {
				element = (await fixture(
					`<${COMPONENT_TAG} clickable-box connotation="cta"></${COMPONENT_TAG}>`
				)) as SelectableBox;
				const control = getControlElement(element);

				expect(control?.getAttribute('connotation')).toBe('cta');
			});
		});

		describe('clickable', () => {
			it('should set connotation attribute on the control element', async function () {
				element = (await fixture(
					`<${COMPONENT_TAG} clickable connotation="cta"></${COMPONENT_TAG}>`
				)) as SelectableBox;
				const control = getControlElement(element);

				expect(control?.getAttribute('connotation')).toBe('cta');
			});
		});

		describe('radio', () => {
			it('should set connotation attribute on the control element', async function () {
				element = (await fixture(
					`<${COMPONENT_TAG} control-type="radio" connotation="cta"></${COMPONENT_TAG}>`
				)) as SelectableBox;
				const control = getControlElement(element);

				expect(control?.getAttribute('connotation')).toBe('cta');
			});

			describe('clickableBox', () => {
				it('should set connotation attribute on the control element', async function () {
					element = (await fixture(
						`<${COMPONENT_TAG} control-type="radio" connotation="cta" clickable-box></${COMPONENT_TAG}>`
					)) as SelectableBox;
					const control = getControlElement(element);

					expect(control?.getAttribute('connotation')).toBe('cta');
				});
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
			expect(baseElement?.classList?.contains('selected')).toBe(true);
		});

		it('should set the checked attribute on the control element', async () => {
			const control = getControlElement(element);
			const controlElement =
				control.shadowRoot?.querySelector('[role="checkbox"]');

			expect(controlElement?.getAttribute('aria-checked')).toBe('true');
		});

		describe('radio', () => {
			it('should set the checked attribute on the control element', async () => {
				element = (await fixture(
					`<${COMPONENT_TAG} control-type="radio" checked></${COMPONENT_TAG}>`
				)) as SelectableBox;
				const control = getControlElement(element);
				const controlElement =
					control.shadowRoot?.querySelector('[role="radio"]');

				expect(controlElement?.getAttribute('aria-checked')).toBe('true');
			});
		});
	});

	describe('clickableBox', () => {
		it('should set clickable class on the base element', async function () {
			element.clickableBox = true;
			await elementUpdated(element);

			expect(baseElement?.classList?.contains('clickable')).toBe(true);
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
		let controlElement: any;

		beforeEach(async () => {
			element.addEventListener('change', spy);
			controlElement = getControlElement(element);
			controlElement.addEventListener('change', spy);
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		describe('checkbox', () => {
			beforeEach(async () => {
				element.addEventListener('change', spy);
				controlElement = getControlElement(element);
				controlElement.addEventListener('change', spy);
			});

			it('should not emit the change event when the base element is clicked and the element is not clickable', async () => {
				baseElement.click();

				expect(spy).not.toHaveBeenCalled();
			});

			it('should emit the change event when the control element changes', async () => {
				const controlElement = getControlElement(element);
				controlElement.dispatchEvent(new Event('change'));

				expect(spy).toHaveBeenCalledTimes(1);
				expect(element.checked).toBe(true);
			});

			describe('keyboard (not clickable)', () => {
				it('should not emit the change event with Space keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Space' })
					);

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(false);
				});

				it('should not emit the change event with Enter keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Enter' })
					);

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(false);
				});
			});
		});

		describe('radio', () => {
			beforeEach(async () => {
				element = (await fixture(
					`<${COMPONENT_TAG} control-type="radio"></${COMPONENT_TAG}>`
				)) as SelectableBox;
				controlElement = getControlElement(element);
				controlElement.addEventListener('change', spy);
			});

			it('should not emit the change event when the base element is clicked and the element is not clickable', async () => {
				baseElement.click();

				expect(spy).not.toHaveBeenCalled();
			});

			it('should emit the change event when the control element changes', async () => {
				controlElement.dispatchEvent(new Event('change'));

				expect(spy).toHaveBeenCalledTimes(1);
				expect(element.checked).toBe(true);
			});

			it('should not change the checked state if it is already checked', async () => {
				element.checked = true;
				elementUpdated(element);
				controlElement.dispatchEvent(new Event('change'));

				expect(element.checked).toBe(true);
			});

			describe('keyboard (not clickable)', () => {
				it('should not emit the change event with Space keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Space' })
					);

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(false);
				});

				it('should not emit the change event with Enter keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Enter' })
					);

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(false);
				});
			});
		});

		describe('clickableBox', () => {
			beforeEach(async () => {
				element.clickableBox = true;
				await elementUpdated(element);
			});

			it('should emit the change event when the checked state changes', async () => {
				baseElement.click();

				expect(spy).toHaveBeenCalledTimes(1);
				expect(element.checked).toBe(true);
			});

			describe('radio', () => {
				it('should emit the change event when the checked state changes', async () => {
					baseElement.click();

					expect(spy).toHaveBeenCalledTimes(1);
					expect(element.checked).toBe(true);
				});

				it('should not emit the change event when the radio is already checked', async () => {
					element = (await fixture(
						`<${COMPONENT_TAG} control-type="radio" checked clickable-box></${COMPONENT_TAG}>`
					)) as SelectableBox;
					element.addEventListener('change', spy);
					baseElement.click();

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});
			});

			describe('keyboard', () => {
				it('should emit the change event when the checked state changes with Space keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Space' })
					);

					expect(spy).toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});

				it('should emit the change event when the checked state changes with Enter keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Enter' })
					);

					expect(spy).toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});

				it('should not emit the change event another key is pressed', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: '65' })
					);

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(false);
				});
			});
		});

		describe('clickable', () => {
			beforeEach(async () => {
				element.clickable = true;
				await elementUpdated(element);
			});

			it('should emit the change event when the checked state changes', async () => {
				baseElement.click();

				expect(spy).toHaveBeenCalledTimes(1);
				expect(element.checked).toBe(true);
			});

			describe('radio', () => {
				it('should emit the change event when the checked state changes', async () => {
					baseElement.click();

					expect(spy).toHaveBeenCalledTimes(1);
					expect(element.checked).toBe(true);
				});

				it('should not emit the change event when the radio is already checked', async () => {
					element = (await fixture(
						`<${COMPONENT_TAG} control-type="radio" checked clickable></${COMPONENT_TAG}>`
					)) as SelectableBox;
					element.addEventListener('change', spy);
					baseElement.click();

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});
			});

			describe('keyboard', () => {
				it('should emit the change event when the checked state changes with Space keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Space' })
					);

					expect(spy).toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});

				it('should emit the change event when the checked state changes with Enter keypress', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: 'Enter' })
					);

					expect(spy).toHaveBeenCalled();
					expect(element.checked).toBe(true);
				});

				it('should not emit the change event another key is pressed', async () => {
					baseElement.dispatchEvent(
						new KeyboardEvent('keydown', { composed: true, code: '65' })
					);

					expect(spy).not.toHaveBeenCalled();
					expect(element.checked).toBe(false);
				});
			});
		});
	});

	describe('a11y', () => {
		beforeEach(async () => {
			element.ariaLabel = 'Box 1';
			await elementUpdated(element);
		});

		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});

		it('should put the correct a11y attributes on the control element', async () => {
			const control = getControlElement(element);

			expect(control?.getAttribute('tabindex')).toBe(null);
			expect(control?.getAttribute('aria-label')).toBe('Box 1');
			expect(control?.getAttribute('aria-press')).toBe(null);
		});

		describe('radio', () => {
			beforeEach(async () => {
				element = (await fixture(
					`<${COMPONENT_TAG} control-type="radio" aria-label="Box 1"></${COMPONENT_TAG}>`
				)) as SelectableBox;
			});

			it('should pass html a11y test', async () => {
				expect(await axe(element)).toHaveNoViolations();
			});

			it('should put the correct a11y attributes on the control element', async () => {
				const control = getControlElement(element);

				expect(control?.getAttribute('tabindex')).toBe('0');
				expect(control?.getAttribute('aria-label')).toBe('Box 1');
			});
		});

		describe('clickableBox', () => {
			beforeEach(async () => {
				element.clickableBox = true;
				await elementUpdated(element);
			});

			it('should pass html a11y test', async () => {
				expect(await axe(element)).toHaveNoViolations();
			});

			it('should render the inert attribute on the control element', async () => {
				const controlElement = getControlElement(element);

				expect(controlElement?.getAttribute('inert')).toBe('true');
			});

			it('should put the correct a11y attributes on the base element', async () => {
				expect(baseElement?.getAttribute('aria-label')).toBe('Box 1');
				expect(baseElement?.getAttribute('aria-pressed')).toBe('false');
				expect(baseElement?.getAttribute('role')).toBe('button');
				expect(baseElement?.getAttribute('tabindex')).toBe('0');
			});

			it('should add the aria-pressed attribute to the base element when checked is true', async () => {
				element.checked = true;
				await elementUpdated(element);

				expect(baseElement?.getAttribute('aria-pressed')).toBe('true');
			});

			describe('radio', () => {
				beforeEach(async () => {
					element = (await fixture(
						`<${COMPONENT_TAG} control-type="radio" aria-label="Box 1" clickable-box></${COMPONENT_TAG}>`
					)) as SelectableBox;
				});

				it('should pass html a11y test', async () => {
					expect(await axe(element)).toHaveNoViolations();
				});

				it('should render the inert attribute on the control element', async () => {
					const controlElement = getControlElement(element);

					expect(controlElement?.getAttribute('inert')).toBe('true');
				});
			});
		});

		describe('clickable', () => {
			beforeEach(async () => {
				element.clickable = true;
				await elementUpdated(element);
			});

			it('should render the inert attribute on the control element', async () => {
				const controlElement = getControlElement(element);

				expect(controlElement?.getAttribute('inert')).toBe('true');
			});

			it('should put the correct a11y attributes on the base element', async () => {
				expect(baseElement?.getAttribute('aria-label')).toBe('Box 1');
				expect(baseElement?.getAttribute('aria-pressed')).toBe('false');
				expect(baseElement?.getAttribute('role')).toBe('button');
				expect(baseElement?.getAttribute('tabindex')).toBe('0');
			});

			it('should add the aria-pressed attribute to the base element when checked is true', async () => {
				element = (await fixture(
					`<${COMPONENT_TAG} aria-label="Box 1" checked clickable></${COMPONENT_TAG}>`
				)) as SelectableBox;
				baseElement = getBaseElement(element);

				expect(baseElement?.getAttribute('aria-pressed')).toBe('true');
			});

			describe('radio', () => {
				beforeEach(async () => {
					element = (await fixture(
						`<${COMPONENT_TAG} control-type="radio" aria-label="Box 1" clickable></${COMPONENT_TAG}>`
					)) as SelectableBox;
				});

				it('should render the inert attribute on the control element', async () => {
					const controlElement = getControlElement(element);

					expect(controlElement?.getAttribute('inert')).toBe('true');
				});
			});
		});
	});
});
