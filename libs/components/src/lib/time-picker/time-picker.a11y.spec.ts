import { axe, fixture } from '@vivid-nx/shared';
import { TimePicker } from './time-picker';
import '.';

const COMPONENT_TAG = 'vwc-time-picker';

describe('a11y: vwc-time-picker', () => {
	let element: TimePicker;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TimePicker;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
