import { axe, fixture } from '@repo/shared';
import { VisuallyHidden } from './visually-hidden';
import '.';

const COMPONENT_TAG = 'vwc-visually-hidden';

describe('a11y: vwc-visually-hidden', () => {
	let element: VisuallyHidden;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>Hidden text</${COMPONENT_TAG}>`
		)) as VisuallyHidden;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
