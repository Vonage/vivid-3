import { fixture } from '@repo/shared';
import { ContextualHelp } from './contextual-help';
import '.';

const COMPONENT_TAG = 'vwc-contextual-help';

describe('vwc-contextual-help', () => {
	let element: ContextualHelp;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ContextualHelp;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-contextual-help', async () => {
			expect(element).toBeInstanceOf(ContextualHelp);
			expect(element.placement).toBe('right');
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});
});
