import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const datePickerTests: TestCase[] = [
	{
		path: 'date-picker',
		name: 'date-picker: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.datePicker.byLabel('Date Picker')).toHaveValue(''),
				() => vvd.datePicker.byLabel('Date Picker').selectDate('2023-10-01'),
				() =>
					vvd
						.expect(vvd.datePicker.byLabel('Date Picker'))
						.toHaveValue('2023-10-01'),
				() =>
					expectState({
						value: '2023-10-01',
					}),
				() => vvd.datePicker.byLabel('Date Picker').clear(),
				() => vvd.expect(vvd.datePicker.byLabel('Date Picker')).toHaveValue(''),
				() =>
					expectState({
						value: '',
					}),
				() =>
					vvd
						.expect(vvd.datePicker.byLabel('With Error'))
						.toHaveVisibleError('Error message'),
			]),
	},
];
