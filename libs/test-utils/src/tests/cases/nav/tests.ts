import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const navTests: TestCase[] = [
	{
		path: 'nav',
		name: 'navigation',
		test: (vvd, expectState) =>
			testSequence([
				() =>
					vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeCurrent(),
				() =>
					vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeClosed(),
				() => vvd.expect(vvd.navItem.byLabel('Item 1')).toBeCurrent(),
				() => vvd.expect(vvd.navItem.byLabel('Item 2')).notToBeCurrent(),
				() => vvd.navDisclosure.byLabel('Disclosure 1').toggle(),
				() => vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeOpen(),
				() => vvd.navItem.byLabel('Item 1').click(),
				() =>
					expectState({
						open: true,
						triggered: true,
					}),
			]),
	},
];
