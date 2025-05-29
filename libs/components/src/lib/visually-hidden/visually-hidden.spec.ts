import { fixture } from '@vivid-nx/shared';
import { VisuallyHidden } from './visually-hidden';
import '.';

const COMPONENT_TAG = 'vwc-visually-hidden';

describe('vwc-visually-hidden', () => {
	let element: VisuallyHidden;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as VisuallyHidden;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-visually-hidden', async () => {
			expect(element).toBeInstanceOf(VisuallyHidden);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});
});
