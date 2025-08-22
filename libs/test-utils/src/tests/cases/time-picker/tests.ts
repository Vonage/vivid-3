import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const timePickerTests: TestCase[] = [
	{
		path: 'time-picker',
		name: 'time-picker: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.timePicker.byLabel('Time Picker')).toHaveValue(''),
				() => vvd.timePicker.byLabel('Time Picker').selectTime('13:13:00'),
				() =>
					vvd
						.expect(vvd.timePicker.byLabel('Time Picker'))
						.toHaveValue('13:13:00'),
				() =>
					expectState({
						value: '13:13:00',
					}),
				() => vvd.timePicker.byLabel('Time Picker').clear(),
				() => vvd.expect(vvd.timePicker.byLabel('Time Picker')).toHaveValue(''),
				() =>
					expectState({
						value: '',
					}),
			]),
	},
];
