import { fixture } from '@vivid-nx/shared';
import { Dialog } from './dialog';
import '.';

const COMPONENT_TAG = 'vwc-dialog';

describe('vwc-dialog', () => {
	let element: Dialog;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Dialog;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-dialog', async () => {
			expect(element).toBeInstanceOf(Dialog);
			expect(element.open).toEqual(false);
			expect(element.returnValue).toEqual(undefined);
			expect(element.stacked).toEqual(false);
			expect(element.icon).toEqual(undefined);
			expect(element.content).toEqual(undefined);
		});
	});
});
