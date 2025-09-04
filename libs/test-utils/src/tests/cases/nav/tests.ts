import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const navTests: TestCase[] = [
	{
		path: 'nav',
		name: 'nav: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeCurrent(),
				() =>
					vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeClosed(),
				() => vvd.expect(vvd.navItem.byLabel('Item 1')).toBeCurrent(),
				() => vvd.expect(vvd.navItem.byLabel('Item 2')).notToBeCurrent(),
				() => vvd.navDisclosure.byLabel('Disclosure 1').expand(),
				() => vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeOpen(),
				() => vvd.navItem.byLabel('Item 1').click(),
				() =>
					expectState({
						open: true,
						triggered: true,
					}),
				() => vvd.navDisclosure.byLabel('Disclosure 1').collapse(),
				() =>
					vvd.expect(vvd.navDisclosure.byLabel('Disclosure 1')).toBeClosed(),
			]),
	},
];
