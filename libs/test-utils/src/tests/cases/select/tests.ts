import type { TestCase } from '../../test-case';
import { runSequence } from '../../../utils/runSequence';

export const selectTests: TestCase[] = [
	{
		path: 'select',
		name: 'select: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.select.byLabel('Select').selectOptionByValue('2'),
				() => vvd.expect(vvd.select.byLabel('Select')).toHaveValue('2'),
				() => expectState({ value: '2' }),
			]),
	},
];
