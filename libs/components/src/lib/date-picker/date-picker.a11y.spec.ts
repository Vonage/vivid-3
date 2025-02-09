import {
	axe,
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill,
} from '@vivid-nx/shared';
import { DatePicker } from './date-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-picker';

describe('vwc-date-picker', () => {
	let element: DatePicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DatePicker;

		setupDelegatesFocusPolyfill(element);
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.value = '2012-12-12';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		}, 10000);
	});
});
