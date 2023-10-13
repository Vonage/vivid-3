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
			expect(element.selected).toBe(false);
		});
	});

	describe('connotation', () => {
		it('should set connotation class on the base element', async function () {
			element.connotation = Connotation.CTA;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains(`connotation-${Connotation.CTA}`)).toEqual(true);
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
			expect(baseElement?.classList?.contains(`spacing-${Size.Condensed}`)).toEqual(true);
		});
	});

	describe('no-padding', () => {
		it('should set no-padding class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.noPadding = true;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains('no-padding')).toEqual(true);
		});
	});

	describe('selected', () => {
		it('should set selected class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.selected = true;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains('selected')).toEqual(true);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
