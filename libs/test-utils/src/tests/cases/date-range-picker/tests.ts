import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const dateRangePickerTests: TestCase[] = [
	{
		path: 'date-range-picker',
		name: 'date-range-picker: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd
						.expect(vvd.dateRangePicker.byLabel('Date Range Picker'))
						.toHaveRange(['', '']),
				() =>
					vvd.dateRangePicker
						.byLabel('Date Range Picker')
						.selectDateRange(['2023-10-01', '2023-10-31']),
				() =>
					vvd
						.expect(vvd.dateRangePicker.byLabel('Date Range Picker'))
						.toHaveRange(['2023-10-01', '2023-10-31']),
				() =>
					expectState({
						start: '2023-10-01',
						end: '2023-10-31',
					}),
			]),
	},
];
