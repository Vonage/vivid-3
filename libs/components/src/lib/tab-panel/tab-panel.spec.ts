import { fixture } from '@repo/shared';
import { TabPanel } from './tab-panel';
import '.';

const COMPONENT_TAG = 'vwc-tab-panel';

describe('vwc-tab-panel', () => {
	let element: TabPanel;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TabPanel;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tab-panel', async () => {
			expect(element).toBeInstanceOf(TabPanel);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});
});
