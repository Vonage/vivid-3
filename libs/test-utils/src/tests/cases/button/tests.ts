import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const buttonTests: TestCase[] = [
	{
		path: 'button',
		name: 'button actions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.button.byLabel('Button').click(),
				() =>
					expectState({
						clicked: true,
					}),
			]),
	},
];
