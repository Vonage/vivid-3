import { fixture } from '@vivid-nx/shared';
import { Text } from './text';
import '.';

const COMPONENT_TAG = 'vwc-text';

describe('vwc-text', () => {
	let element: Text;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Text;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text', async () => {
			expect(element).toBeInstanceOf(Text);
		});
	});
});
