import type { TestCase } from '../../test-case';
import { testSequence } from '../../utils/testSequence';

export const dialogTests: TestCase[] = [
	{
		path: 'dialog',
		name: 'dialog open close',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.button.byLabel('Open Dialog').click(),
				() => vvd.expect(vvd.dialog.byHeadline('My Dialog')).toBeOpen(),
				() => vvd.dialog.byHeadline('My Dialog').clickDismissButton(),
				() => vvd.expect(vvd.dialog.byHeadline('My Dialog')).toBeClosed(),
				() =>
					expectState({
						open: false,
					}),
			]),
	},
];
