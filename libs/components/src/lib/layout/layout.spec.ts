import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { LayoutSize } from '../enums';
import { AUTO_SIZING, Layout } from './layout';
import '.';

const COMPONENT_TAG = 'vwc-layout';

describe('vwc-layout', () => {
	let element: Layout;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}>
									<div style="border: 1px solid">test</div>
									<div style="border: 1px solid">test</div>
								</${COMPONENT_TAG}>`)) as Layout;
	});

	describe('basic', () => {
		it('initializes as a vwc-layout', async () => {
			expect(element).toBeInstanceOf(Layout);
			expect(element.gutters).toBeUndefined();
			expect(element.columnBasis).toBeUndefined();
			expect(element.columnSpacing).toBeUndefined();
			expect(element.rowSpacing).toBeUndefined();
			expect(element.autoSizing).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('gutters', () => {
		it('should set correct internal gutters class', async () => {
			const gutters = LayoutSize.Large;

			expect(getControlElement(element).classList.toString()).toEqual(
				'control'
			);
			element.gutters = gutters;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(
				`control gutters-${gutters}`
			);
		});
	});

	describe('column-basis', () => {
		it('should set correct internal column-basis style', async () => {
			const columnBasis = LayoutSize.Large;

			expect(getControlElement(element).classList.toString()).toEqual(
				'control'
			);
			element.columnBasis = columnBasis;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(
				`control column-basis-${columnBasis}`
			);
		});
	});

	describe('column-spacing', () => {
		it('should set correct internal column-spacing style', async () => {
			const columnSpacing = LayoutSize.Large;

			expect(getControlElement(element).classList.toString()).toEqual(
				'control'
			);
			element.columnSpacing = columnSpacing;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toContain(
				`control column-spacing-${columnSpacing}`
			);
		});
	});

	describe('row-spacing', () => {
		it('should set correct internal row-spacing style', async () => {
			const rowSpacing = LayoutSize.Large;

			expect(getControlElement(element).classList.toString()).toEqual(
				'control'
			);
			element.rowSpacing = rowSpacing;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(
				`control row-spacing-${rowSpacing}`
			);
		});

		it('should set column-spacing value to row-spacing class if rowSpacing is not set', async () => {
			const columnSpacing = LayoutSize.Small;

			expect(getControlElement(element).classList.toString()).toEqual(
				'control'
			);
			element.columnSpacing = columnSpacing;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(
				`control column-spacing-${columnSpacing} row-spacing-${columnSpacing}`
			);
		});
	});

	describe('auto-sizing', () => {
		it('should set correct internal auto-sizing style', async () => {
			const autoSizing = AUTO_SIZING.Fill;

			expect(getControlElement(element).classList.toString()).toEqual(
				'control'
			);
			element.autoSizing = autoSizing;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(
				`control auto-sizing-${autoSizing}`
			);
		});
	});
});
