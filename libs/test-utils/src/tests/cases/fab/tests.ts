import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const fabTests: TestCase[] = [
	{
		path: 'fab',
		name: 'fab actions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.fab.byLabel('Fab').click(),
				() =>
					expectState({
						clicked: true,
					}),
			]),
	},
];
