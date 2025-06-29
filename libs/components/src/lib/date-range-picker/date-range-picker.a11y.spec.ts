import {
	axe,
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill,
} from '@repo/shared';
import { DateRangePicker } from './date-range-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-range-picker';

describe('a11y: vwc-date-range-picker', () => {
	let element: DateRangePicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DateRangePicker;

		setupDelegatesFocusPolyfill(element);
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		element.start = '2012-12-12';
		element.end = '2012-12-13';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	}, 10000);
});
