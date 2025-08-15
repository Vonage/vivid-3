import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const alertTests: TestCase[] = [
	{
		path: 'alert',
		name: 'alert: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
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
