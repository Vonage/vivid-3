import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const fabTests: TestCase[] = [
	{
		path: 'fab',
		name: 'fab: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.fab.byLabel('Fab').click(),
				() =>
					expectState({
						clicked: true,
					}),
			]),
	},
];
