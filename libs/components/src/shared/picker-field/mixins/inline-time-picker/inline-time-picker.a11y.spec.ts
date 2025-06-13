import { axe, elementUpdated, fixture } from '@repo/shared';
import { InlineTimePicker } from './inline-time-picker';
import './index';

const COMPONENT_TAG = 'vwc-inline-time-picker';

describe('a11y: vwc-inline-time-picker', () => {
	const getPickerItem = (
		type: 'hours' | 'minutes' | 'seconds' | 'meridies',
		value: string
	) => element.shadowRoot!.querySelector(`#${type}-${value}`) as HTMLElement;

	let element: InlineTimePicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as InlineTimePicker;
	});

	it('should pass html a11y test', async () => {
		element.clock = '12h';
		element.secondsStep = 1;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	}, 10000);

	it('should set aria-activedescendant to the id of the selection item on each picker', async () => {
		element.clock = '12h';
		element.secondsStep = 1;
		element.value = '12:34:56';
		await elementUpdated(element);

		expect(
			element.shadowRoot
				?.querySelector('#hours')
				?.getAttribute('aria-activedescendant')
		).toBe('hours-12');
		expect(
			element.shadowRoot
				?.querySelector('#minutes')
				?.getAttribute('aria-activedescendant')
		).toBe('minutes-34');
		expect(
			element.shadowRoot
				?.querySelector('#seconds')
				?.getAttribute('aria-activedescendant')
		).toBe('seconds-56');
	});

	it('should set aria-selected=true on selected items', async () => {
		element.secondsStep = 1;
		element.value = '12:34:56';
		await elementUpdated(element);

		expect(getPickerItem('hours', '12').getAttribute('aria-selected')).toBe(
			'true'
		);
		expect(getPickerItem('minutes', '34').getAttribute('aria-selected')).toBe(
			'true'
		);
		expect(getPickerItem('seconds', '56').getAttribute('aria-selected')).toBe(
			'true'
		);
	});
});
