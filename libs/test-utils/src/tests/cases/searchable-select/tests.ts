import type { TestCase } from '../../test-case';
import { runSequence } from '../../../utils/runSequence';

export const searchableSelectTests: TestCase[] = [
	{
		path: 'searchable-select',
		name: 'searchable-select: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd.searchableSelect
						.byLabel('Searchable Select')
						.selectOptionByValue('2'),
				() =>
					vvd
						.expect(vvd.searchableSelect.byLabel('Searchable Select'))
						.toHaveValue('2'),
				() => vvd.searchableSelect.byLabel('Multiple').selectOptionByValue('1'),
				() => vvd.searchableSelect.byLabel('Multiple').selectOptionByValue('2'),
				() =>
					vvd
						.expect(vvd.searchableSelect.byLabel('Multiple'))
						.toHaveValues(['1', '2']),
				() =>
					vvd
						.expect(vvd.searchableSelect.byLabel('Multiple'))
						.toHaveSelectedOptions(['Text 1', 'Text 2']),
				() => expectState({ value: '2', values: ['1', '2'] }),
			]),
	},
];
