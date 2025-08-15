import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const bannerTests: TestCase[] = [
	{
		path: 'banner',
		name: 'banner: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.banner.byText('Banner text').dismiss(),
				() =>
					expectState({
						removing: true,
					}),
			]),
	},
];
