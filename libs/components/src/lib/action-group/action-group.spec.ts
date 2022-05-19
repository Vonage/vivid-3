import { fixture } from '@vivid-nx/shared';
import { ActionGroup } from './action-group';
import '.';

const COMPONENT_TAG = 'vwc-action-group';

describe('vwc-action-group', () => {
	let element: ActionGroup;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ActionGroup;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-action-group', async () => {
			expect(element).toBeInstanceOf(ActionGroup);
		});
	});
});
