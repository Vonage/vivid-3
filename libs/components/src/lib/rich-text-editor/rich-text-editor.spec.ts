import { fixture } from '@vivid-nx/shared';
import { RichTextEditor } from './rich-text-editor';
import '.';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('vwc-rich-text-editor', () => {
	let element: RichTextEditor;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RichTextEditor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-rich-text-editor', async () => {
			expect(element).toBeInstanceOf(RichTextEditor);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});
});
