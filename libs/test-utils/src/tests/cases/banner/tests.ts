import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const bannerTests: TestCase[] = [
	{
		path: 'banner',
		name: 'remove banner',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.banner.byText('Banner text').dismiss(),
				() =>
					expectState({
						removing: true,
					}),
			]),
	},
];
