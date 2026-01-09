import { axe, fixture } from '@repo/shared';
import { RichTextView } from './rich-text-view';
import '.';

const COMPONENT_TAG = 'vwc-rich-text-view';

describe('a11y: vwc-rich-text-view', () => {
	let element: RichTextView;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RichTextView;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
