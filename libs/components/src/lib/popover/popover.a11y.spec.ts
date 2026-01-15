import { axe, elementUpdated, fixture } from '@repo/shared';
import { Popover } from './popover';
import '.';

const COMPONENT_TAG = 'vwc-popover';

describe('a11y: vwc-popover', () => {
	let element: Popover;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Popover;
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.ariaLabel = 'Accessible Popover Name';
			await elementUpdated(element);
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
