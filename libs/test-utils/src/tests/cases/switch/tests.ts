import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const switchTests: TestCase[] = [
	{
		path: 'switch',
		name: 'switch: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.switch.byLabel('Switch')).toBeUnchecked(),
				() => vvd.switch.byLabel('Switch').check(),
				() => vvd.expect(vvd.switch.byLabel('Switch')).toBeChecked(),
				() =>
					expectState({
						checked: true,
					}),
				() => vvd.switch.byLabel('Switch').uncheck(),
				() => vvd.expect(vvd.switch.byLabel('Switch')).toBeUnchecked(),
			]),
	},
];
