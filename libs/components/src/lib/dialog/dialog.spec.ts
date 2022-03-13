import { fixture } from '@vivid-nx/shared';
import { Dialog } from './';
import '.';

const COMPONENT_TAG = 'vwc-dialog';

describe('vwc-dialog', () => {
	let element: Dialog;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Dialog;
	});

	it('should be initialized as a vwc-dialog', async () => {
		expect(element).toBeInstanceOf(Dialog);
	});
});
