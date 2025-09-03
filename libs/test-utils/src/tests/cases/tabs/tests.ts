import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const tabsTests: TestCase[] = [
	{
		path: 'tabs',
		name: 'tabs: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.tab.byLabel('Tab one')).toBeActive(),
				() => vvd.expect(vvd.tab.byLabel('Tab two')).toBeInactive(),
				() => vvd.tab.byLabel('Tab two').select(),
				() => vvd.expect(vvd.tab.byLabel('Tab one')).toBeInactive(),
				() => vvd.expect(vvd.tab.byLabel('Tab two')).toBeActive(),
				() => vvd.button.byLabel('Click me').click(),
				() =>
					expectState({
						activeTab: 'two',
						triggered: true,
					}),
			]),
	},
];
