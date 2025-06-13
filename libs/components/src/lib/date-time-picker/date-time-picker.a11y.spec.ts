import {
	axe,
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill,
} from '@repo/shared';
import { DateTimePicker } from './date-time-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-time-picker';

describe('a11y: vwc-date-time-picker', () => {
	let element: DateTimePicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DateTimePicker;

		setupDelegatesFocusPolyfill(element);
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		element.value = '2012-12-12T12:12:12';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
