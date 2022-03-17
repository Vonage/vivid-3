import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Size } from '../enums';
import { AUTO_SIZING, Layout } from './layout';
import '.';

const COMPONENT_TAG = 'vwc-layout';

describe('vwc-layout', () => {
	let element: Layout;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}>
									<div style="border: 1px solid">test</div>
									<div style="border: 1px solid">test</div>
								</${COMPONENT_TAG}>`) as Layout;
	});

	describe('basic', () => {
		it('initializes as a vwc-layout', async () => {
			expect(element).toBeInstanceOf(Layout);
			expect(element.gutters).toBeUndefined();
			expect(element.columnBasis).toBeUndefined();
			expect(element.columnSpacing).toBeUndefined();
			expect(element.autoSizing).toBeUndefined();
		});
	});

	describe('gutters', () => {
		it('should set correct internal gutters class', async () => {
			const gutters = Size.BaseLarge;

			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.gutters = gutters;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control gutters-${gutters}`);
		});
	});


	describe('column-basis', () => {
		it('should set correct internal column-basis style', async () => {
			const columnBasis = Size.BaseLarge;

			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.columnBasis = columnBasis;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control column-basis-${columnBasis}`);
		});
	});

	describe('column-spacing', () => {
		it('should set correct internal column-spacing style', async () => {
			const columnSpacing = Size.BaseLarge;

			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.columnSpacing = columnSpacing;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control column-spacing-${columnSpacing}`);
		});
	});


	describe('auto-sizing', () => {
		it('should set correct internal auto-sizing style', async () => {
			const autoSizing = AUTO_SIZING.Fill;

			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.autoSizing = autoSizing;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual(`control auto-sizing-${autoSizing}`);
		});
	});
});
