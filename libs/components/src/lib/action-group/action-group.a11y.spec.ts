import { axe, fixture } from '@repo/shared';
import { ActionGroup } from './action-group';
import '.';

const COMPONENT_TAG = 'vwc-action-group';

describe('a11y: vwc-action-group', () => {
	let element: ActionGroup;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ActionGroup;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
