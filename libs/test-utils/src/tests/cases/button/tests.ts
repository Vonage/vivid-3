import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const buttonTests: TestCase[] = [
	{
		path: 'button',
		name: 'button: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.button.byLabel('Button').click(),
				() =>
					expectState({
						clicked: true,
					}),
			]),
	},
];
