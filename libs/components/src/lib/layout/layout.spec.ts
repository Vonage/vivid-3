import { elementUpdated, fixture } from '@vivid-nx/shared';
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
			const control = getControlElement();
			const classExistsWithoutGutters = control.classes.hasClass(`control.gutters-${gutters}`);
			(element as any).gutters = gutters;
			await elementUpdated(element);

			expect(classExistsWithoutGutters).toEqual(false);
			expect(control.classes.hasClass(`control.gutters-${gutters}`)).toEqual(true);
		});
	});


	describe('column-basis', () => {
		it('should set correct internal column-basis style', async () => {
			const columnBasis = Size.BaseLarge;
			(element as any).columnBasis = columnBasis;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.column-basis-${columnBasis}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('column-spacing', () => {
		it('should set correct internal column-spacing style', async () => {
			const columnSpacing = Size.BaseLarge;
			(element as any).columnSpacing = columnSpacing;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.column-spacing-${columnSpacing}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});


	describe('auto-sizing', () => {
		it('should set correct internal auto-sizing style', async () => {
			const autoSizing = AUTO_SIZING.Fill;
			(element as any).autoSizing = autoSizing;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.auto-sizing-${autoSizing}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});
});
