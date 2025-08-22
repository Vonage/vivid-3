import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const collectionsTests: TestCase[] = [
	{
		path: 'collections',
		name: 'collections: collection wrapper',
		test: (vvd) =>
			runSequence([
				() => vvd.button.byLabel('Add Card').click(),
				() => vvd.expect(vvd.card.all()).toHaveCount(1),
				() => vvd.button.byLabel('Add Card').click(),
				() => vvd.expect(vvd.card.all()).toHaveCount(2),
				() => vvd.expect(vvd.card.all().nth(1)).toHaveHeadline('Card 1'),
			]),
	},
];
