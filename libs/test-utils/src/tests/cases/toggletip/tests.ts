import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const toggletipTests: TestCase[] = [
	{
		path: 'toggletip',
		name: 'toggletip state',
		test: (vvd, expectState) =>
			testSequence([
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
