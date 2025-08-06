import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const timePickerTests: TestCase[] = [
	{
		path: 'time-picker',
		name: 'time-picker interactions',
		test: (vvd, expectState) =>
			testSequence([
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
