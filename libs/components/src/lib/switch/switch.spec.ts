import {elementUpdated, fixture, getControlElement} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {Connotation} from '../enums';
import { Switch } from './switch';
import '.';
import { switchDefinition } from './definition';

const COMPONENT_TAG = 'vwc-switch';

describe('vwc-switch', () => {
	let element: Switch;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Switch;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-switch', async () => {
			expect(switchDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Switch);
			expect(element.name).toBeUndefined();
			expect(element.value).toEqual('on');
			expect(element.checked).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.readOnly).toBeUndefined();
			expect(element.required).toEqual(false);
			expect(element.label).toBeUndefined();
			expect(element.connotation).toBeUndefined();
		});
	});

	describe('value', () => {
		it('should set the value from attribute', async () => {
			const value = 'test';
			element.setAttribute('value', value);
			await elementUpdated(element);
			expect(element.value).toEqual(value);
		});
	});

	describe('checked', () => {
		it('should toggle the check after a click', async function() {
			const control = getControlElement(element);
			control.click();
			await elementUpdated(element);
			expect(element.checked).toEqual(true);
		});

		it('should set the checked from attribute', async () => {

			element.toggleAttribute('checked', true);
			await elementUpdated(element);
			const checkedValueWithCheckedAttribute = element.checked;
			element.toggleAttribute('checked', false);
			await elementUpdated(element);
			const checkedValueWithoutCheckedAttribute = element.checked;

			expect(checkedValueWithCheckedAttribute).toEqual(true);
			expect(checkedValueWithoutCheckedAttribute).toEqual(false);
		});

		it('should change when spacebar hit', async function() {
			element.checked = false;
			const control = getControlElement(element);
			control.dispatchEvent(new KeyboardEvent('keypress',{'key': ' '}));
			await elementUpdated(element);
			expect(element.checked).toEqual(true);
		});

		it('should change when Enter hit', async function() {
			element.checked = true;
			const control = getControlElement(element);
			control.dispatchEvent(new KeyboardEvent('keypress',{'key': 'Enter'}));
			await elementUpdated(element);
			expect(element.checked).toEqual(false);
		});

		it('should set aria-checked on the control', async function() {
			const control = getControlElement(element);
			const ariaCheckedWhenNotChecked = control.getAttribute('aria-checked');

			element.checked = true;
			await elementUpdated(element);

			expect(ariaCheckedWhenNotChecked).toEqual('false');
			expect(control.getAttribute('aria-checked')).toEqual('true');
		});
	});

	describe('disabled', () => {
		it('should set disabled class when attribute is set', async function () {
			const disabledClassWhenEnabled = getControlElement(element)
				.classList
				.contains('disabled');
			element.disabled = true;
			await elementUpdated(element);
			const disabledClassWhenDisabled = getControlElement(element)
				.classList
				.contains('disabled');
			expect(disabledClassWhenEnabled)
				.toEqual(false);
			expect(disabledClassWhenDisabled)
				.toEqual(true);
		});

		it('should set aria-disabled on the control', async function() {
			const control = getControlElement(element);
			const ariaDisabledWhenNotDisabled = control.getAttribute('aria-disabled');

			element.disabled = true;
			await elementUpdated(element);

			expect(ariaDisabledWhenNotDisabled).toEqual('false');
			expect(control.getAttribute('aria-disabled')).toEqual('true');
		});

		it('should remove tabindex when disabled', async function() {
			const control = getControlElement(element);
			const tabindexWhenEnabled = control.getAttribute('tabindex');
			element.disabled = true;
			await elementUpdated(element);
			const tabindexWhenDisabled = control.getAttribute('tabindex');
			expect(tabindexWhenEnabled).toEqual('0');
			expect(tabindexWhenDisabled).toEqual(null);
		});
	});

	describe('readOnly', function () {
		it('should add class readonly to control', async function () {
			const readonlyClassWhenFalse = getControlElement(element)
				.classList
				.contains('readonly');
			element.readOnly = true;
			await elementUpdated(element);
			const readonlyClassWhenTrue = getControlElement(element)
				.classList
				.contains('readonly');
			expect(readonlyClassWhenFalse)
				.toEqual(false);
			expect(readonlyClassWhenTrue)
				.toEqual(true);
		});

		it('should set aria-readonly on the control', async function() {
			element.readOnly = false;
			await elementUpdated(element);
			const control = getControlElement(element);
			const ariaReadonlyWhenNotReadonly = control.getAttribute('aria-readonly');

			element.readOnly = true;
			await elementUpdated(element);

			expect(ariaReadonlyWhenNotReadonly).toEqual('false');
			expect(control.getAttribute('aria-readonly')).toEqual('true');
		});
	});

	describe('checked', function () {
		it('should add class checked to control', async function () {
			const checkedClassWhenFalse = getControlElement(element)
				.classList
				.contains('checked');
			element.checked = true;
			await elementUpdated(element);
			const checkedClassWhenTrue = getControlElement(element)
				.classList
				.contains('checked');
			expect(checkedClassWhenFalse)
				.toEqual(false);
			expect(checkedClassWhenTrue)
				.toEqual(true);
		});

		it('should set aria-checked on the control', async function () {
			element.checked = false;
			await elementUpdated(element);
			const control = getControlElement(element);
			const ariaCheckedWhenNotChecked = control.getAttribute('aria-checked');

			element.checked = true;
			await elementUpdated(element);

			expect(ariaCheckedWhenNotChecked).toEqual('false');
			expect(control.getAttribute('aria-checked')).toEqual('true');
		});
	});

	describe('label', function () {
		it('should show the label', async function () {
			const labelText = 'test';
			element.setAttribute('label', labelText);
			await elementUpdated(element);
			expect(element.label).toEqual(labelText);
			expect(element.shadowRoot?.querySelector('.label')?.textContent?.trim()).toEqual(labelText);
		});

		it('should hide the label if no label is supplied', function () {
			expect(element.shadowRoot?.querySelector('.label')).toBeNull();
		});
	});

	describe('connotation', function () {
		it('should reflect its value to host', async function () {

			element.setAttribute('connotation', 'alert');
			await elementUpdated(element);
			const connotationPropertyAfterAttributeChange = element.connotation;

			element.connotation = Connotation.CTA;
			await elementUpdated(element);
			const connotationAttributeAfterPropertyChange = element.getAttribute('connotation');

			expect(connotationPropertyAfterAttributeChange)
				.toEqual(Connotation.Alert);
			expect(connotationAttributeAfterPropertyChange)
				.toEqual(Connotation.CTA);
		});

		it('should not set connotation on the control div if unchecked', async function () {
			const control = getControlElement(element);

			const connotation = Connotation.CTA;
			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = control?.classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsAfterChange).toEqual(false);
		});

		it('should set connotation on the control div if checked', async function () {
			const control = getControlElement(element);

			const connotation = Connotation.CTA;
			const connotationClassExistsBeforeChange = control?.classList.contains(`connotation-${connotation}`);
			element.checked = true;
			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = control?.classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsBeforeChange)
				.toEqual(false);
			expect(connotationClassExistsAfterChange)
				.toEqual(true);
		});
	});

	describe('appearance', function () {
		it('should apply filled appearance style when checked and not disabled, nor read-only', async function () {
			const control = getControlElement(element);

			const appearanceFilledClassExistsBeforeChecked = control?.classList.contains('appearance-filled');

			element.checked = true;
			await elementUpdated(element);

			const appearanceFilledClassExistsAfterChecked = control?.classList.contains('appearance-filled');

			element.disabled = true;
			await elementUpdated(element);

			const appearanceFilledClassExistsAfterDisabled = control?.classList.contains('appearance-filled');

			element.disabled = false;
			element.readOnly = true;
			await elementUpdated(element);

			const appearanceFilledClassExistsAfterReadonly = control?.classList.contains('appearance-filled');

			expect(appearanceFilledClassExistsBeforeChecked).toEqual(false);
			expect(appearanceFilledClassExistsAfterChecked).toEqual(true);
			expect(appearanceFilledClassExistsAfterDisabled).toEqual(false);
			expect(appearanceFilledClassExistsAfterReadonly).toEqual(false);
		});
	});
});
