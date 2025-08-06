import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const alertTests: TestCase[] = [
	{
		path: 'alert',
		name: 'toggle alert',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.expect(vvd.alert.byHeadline('Alert')).toBeClosed(),
				() => vvd.button.byLabel('Toggle alert').click(),
				() => vvd.expect(vvd.alert.byHeadline('Alert')).toBeOpen(),
				() =>
					expectState({
						open: true,
					}),
				() => vvd.button.byLabel('Toggle alert').click(),
				() => vvd.expect(vvd.alert.byHeadline('Alert')).toBeClosed(),
			]),
	},
];
