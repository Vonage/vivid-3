import { fixture } from '@vivid-nx/shared';
import {TextAnchor} from './text-anchor';
import '.';

const COMPONENT_TAG = 'vwc-text-anchor';

describe( 'vwc-text-anchor', () => {
	let element: TextAnchor;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as TextAnchor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-anchor', async () => {
			expect(element).toBeInstanceOf(TextAnchor);
		});
	});
});
