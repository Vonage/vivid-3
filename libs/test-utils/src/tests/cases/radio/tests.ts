import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const radioTests: TestCase[] = [
	{
		path: 'radio',
		name: 'checking',
		test: (vvd, expectState) =>
			testSequence([
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
