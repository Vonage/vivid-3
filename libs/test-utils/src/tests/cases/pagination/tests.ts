import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const paginationTests: TestCase[] = [
	{
		path: 'pagination',
		name: 'pagination: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.pagination.byTestId('pagination')).toHaveTotal(10),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedPage(6),
				() => vvd.pagination.byTestId('pagination').clickNext(),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedPage(7),
				() => expectState({ selectedIndex: 6 }),
				() => vvd.pagination.byTestId('pagination').clickPrev(),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedPage(6),
				() => expectState({ selectedIndex: 5 }),
				() => vvd.pagination.byTestId('pagination').clickPageIndex(0),
				() =>
					vvd
						.expect(vvd.pagination.byTestId('pagination'))
						.toHaveSelectedPage(1),
				() => expectState({ selectedIndex: 0 }),
			]),
	},
];
