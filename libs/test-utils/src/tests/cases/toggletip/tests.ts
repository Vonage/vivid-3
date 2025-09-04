import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const toggletipTests: TestCase[] = [
	{
		path: 'toggletip',
		name: 'toggletip: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.toggletip.byHeadline('Toggletip')).toBeClosed(),
				() => vvd.button.byLabel('Click me').click(),
				() => vvd.expect(vvd.toggletip.byHeadline('Toggletip')).toBeOpen(),
				() => vvd.button.byLabel('OK').click(),
				() =>
					expectState({
						triggered: true,
					}),
			]),
	},
];
