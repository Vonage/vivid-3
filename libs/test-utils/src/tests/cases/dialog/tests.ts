import type { TestCase } from '../../test-case';
import { runSequence } from '../../../utils/runSequence';

export const dialogTests: TestCase[] = [
	{
		path: 'dialog',
		name: 'dialog: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.button.byLabel('Open Dialog').click(),
				() => vvd.expect(vvd.dialog.byHeadline('My Dialog')).toBeOpen(),
				() => vvd.dialog.byHeadline('My Dialog').dismiss(),
				() => vvd.expect(vvd.dialog.byHeadline('My Dialog')).toBeClosed(),
				() =>
					expectState({
						open: false,
					}),
			]),
	},
];
