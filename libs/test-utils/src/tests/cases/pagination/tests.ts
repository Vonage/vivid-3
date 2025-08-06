import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const paginationTests: TestCase[] = [
	{
		path: 'pagination',
		name: 'pagination actions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.expect(vvd.pagination.byTestId('pagination')).toHaveTotal(10),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedIndex(5),
				() => vvd.pagination.byTestId('pagination').clickNext(),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedIndex(6),
				() => expectState({ selectedIndex: 6 }),
				() => vvd.pagination.byTestId('pagination').clickPrev(),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedIndex(5),
				() => expectState({ selectedIndex: 5 }),
				() => vvd.pagination.byTestId('pagination').clickPageIndex(0),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedIndex(0),
				() => expectState({ selectedIndex: 0 }),
			]),
	},
];
