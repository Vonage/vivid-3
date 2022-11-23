import { fixture } from '@vivid-nx/shared';
import { Tabs } from './tabs';
import '.';

const COMPONENT_TAG = 'vwc-tabs';

describe('vwc-tabs', () => {
	let element: Tabs;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Tabs;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tabs', async () => {
			expect(element).toBeInstanceOf(Tabs);
			expect(element.orientation).toEqual("horizontal");
		});
	});
});
