import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const switchTests: TestCase[] = [
	{
		path: 'switch',
		name: 'toggling',
		test: (vvd, expectState) =>
			testSequence([
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
