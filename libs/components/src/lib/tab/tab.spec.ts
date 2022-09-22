import { fixture } from '@vivid-nx/shared';
import { Tab } from './tab';
import '.';

const COMPONENT_TAG = 'vwc-tab';

describe('vwc-tab', () => {
	let element: Tab;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tab;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tab', async () => {
			expect(element).toBeInstanceOf(Tab);
		});
	});
});
