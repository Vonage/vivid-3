import type { TestCase } from '../../test-case';
import { testSequence } from '../../utils/testSequence';

export const selectTests: TestCase[] = [
	{
		path: 'select',
		name: 'selectOptionByValue',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.select.byLabel('Select').selectOptionByValue('2'),
				() => vvd.expect(vvd.select.byLabel('Select')).toHaveValue('2'),
				() => expectState({ value: '2' }),
			]),
	},
];
