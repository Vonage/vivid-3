import {
	axe,
	elementUpdated,
	fixture,
	setupDelegatesFocusPolyfill,
} from '@repo/shared';
import { DatePicker } from './date-picker';
import '.';

const COMPONENT_TAG = 'vwc-date-picker';

describe('a11y: vwc-date-picker', () => {
	let element: DatePicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DatePicker;

		setupDelegatesFocusPolyfill(element);
	});

	it('should pass html a11y test', async () => {
		element.label = 'Label';
		element.value = '2012-12-12';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	}, 10000);
});
