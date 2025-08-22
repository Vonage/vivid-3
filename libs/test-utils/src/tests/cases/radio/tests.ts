import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const radioTests: TestCase[] = [
	{
		path: 'radio',
		name: 'radio: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.radio.byLabel('Apple')).toBeChecked(),
				() => vvd.expect(vvd.radio.byLabel('Banana')).toBeUnchecked(),
				() => vvd.radio.byLabel('Banana').check(),
				() => vvd.expect(vvd.radio.byLabel('Apple')).toBeUnchecked(),
				() => vvd.expect(vvd.radio.byLabel('Banana')).toBeChecked(),
				() =>
					expectState({
						selected: 'banana',
					}),
			]),
	},
];
