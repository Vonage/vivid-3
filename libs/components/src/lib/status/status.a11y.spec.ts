import { axe, elementUpdated, fixture } from '@repo/shared';
import { Status } from './status';
import '.';

const COMPONENT_TAG = 'vwc-status';

describe('a11y: vwc-status', () => {
	let element: Status;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} status="Positive">Description</${COMPONENT_TAG}>`
		)) as Status;
	});

	it('should pass html a11y test', async () => {
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
