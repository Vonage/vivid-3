import {
	axe,
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import { DateRangePicker } from './date-range-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-range-picker';

describe('vwc-date-range-picker', () => {
	let element: DateRangePicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DateRangePicker;
		setupDelegatesFocusPolyfill(element);
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.start = '2012-12-12';
			element.end = '2012-12-13';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		}, 10000);
	});
});
