import { elementUpdated, fixture } from '@vivid-nx/shared';
import { Text } from './text';
import '.';

const COMPONENT_TAG = 'vwc-text';

describe('vwc-text', () => {
	let element: Text;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Text;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text', async () => {
			expect(element).toBeInstanceOf(Text);
			expect(element.connotation).toBeUndefined();
			expect(element.fontFace).toBeUndefined();
			expect(element.tight).toBeFalsy();
		});
	});

	describe('connotation', () => {
		it('should set correct internal connotation style', async () => {
			const connotation = 'info';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.connotation-${connotation}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('font face', () => {
		it('should set correct internal font face style', async () => {
			const fontFace = 'headline-2';
			(element as any).fontFace = fontFace;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(`.control.font-face-${fontFace}`);
			expect(control)
				.toBeInstanceOf(Element);
		});
	});

	describe('tight', () => {
		it('should set correct internal tight style', async () => {
			(element as any).tight = true;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control.tight');
			expect(control)
				.toBeInstanceOf(Element);
		});
	});
});
