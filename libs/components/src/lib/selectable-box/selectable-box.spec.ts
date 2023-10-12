import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation, Size } from '../enums';
import { SelectableBox } from './selectable-box';
import { selectableBoxDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-selectable-box';

describe('vwc-selectable-box', () => {
	let element: SelectableBox;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SelectableBox;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-selectable-box', async () => {
			expect(selectableBoxDefinition()).toBeInstanceOf(
				FoundationElementRegistry
			);
			expect(element).toBeInstanceOf(SelectableBox);
			expect(element.connotation).toBe(undefined);
			expect(element.spacing).toBe(undefined);
			expect(element.noPadding).toBe(false);
		});
	});

	describe('connotation', () => {
		it('should set connotation class on the base element', async function () {
			const baseElement = getBaseElement(element);
			element.connotation = Connotation.CTA;
			await elementUpdated(element);
			expect(baseElement?.classList?.contains(`connotation-${Connotation.CTA}`)).toEqual(true);
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
});
