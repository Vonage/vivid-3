import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const dateTimePickerTests: TestCase[] = [
	{
		path: 'date-time-picker',
		name: 'date-time-picker: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd
						.expect(vvd.dateTimePicker.byLabel('Date Time Picker'))
						.toHaveValue(''),
				() =>
					vvd.dateTimePicker
						.byLabel('Date Time Picker')
						.selectDateTime('2023-03-10T13:13:00'),
				() =>
					vvd
						.expect(vvd.dateTimePicker.byLabel('Date Time Picker'))
						.toHaveValue('2023-03-10T13:13:00'),
				() =>
					expectState({
						value: '2023-03-10T13:13:00',
					}),
			]),
	},
];
