import { fixture } from '@vivid-nx/shared';
import { MyComponent } from './my-component';
import '.';

const COMPONENT_TAG = 'vwc-my-component';

describe('vwc-my-component', () => {
	let element: MyComponent;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as MyComponent;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-my-component', async () => {
			expect(element).toBeInstanceOf(MyComponent);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});
});
