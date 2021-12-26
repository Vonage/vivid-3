import { fixture, fixtureCleanup } from '@open-wc/testing';
import { Badge } from './badge.base';
import './badge.js';
// import type { vividIcon } from '../icon/icon';

// const COMPONENT_TAG = 'vwc-badge';

// const correlatePropsWithAttrs = () => {

// };
describe('vwc-badge', () => {
	describe('basic', () => {
		let element: Badge;

		beforeEach(async () => {
			element = await fixture<Badge>('<vwc-badge></vwc-badge>');
		});

		afterEach(() => {
			fixtureCleanup();
		});

		it('initializes as an vwc-badge', () => {
			expect(element).toBeInstanceOf(Badge);
			expect(element.text).toEqual('');
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			// expect(element.unelevated).toBeFalse();
			// expect(element.outlined).toBeFalse();
			// expect(element.dense).toBeFalse();
			// expect(element.disabled).toBeFalse();
			// expect(element.trailingIcon).toBeFalse();
			// expect(element.fullwidth).toBeFalse();
			// expect(element.icon).toEqual('');
			// expect(element.label).toEqual('');
		});
	});
});
