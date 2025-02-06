import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Badge } from './badge';
import '.';

const COMPONENT_TAG = 'vwc-badge';

describe('a11y: vwc-badge', () => {
	let element: Badge;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Badge;
	});

	it('should pass html a11y test', async () => {
		element.text = 'Test badge';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});

	describe('icon-only', () => {
		it('should pass html a11y test', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
