import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const cardTests: TestCase[] = [
	{
		path: 'cards',
		name: 'cards',
		test: (vvd) =>
			testSequence([
				() => vvd.button.byLabel('Add Card').click(),
				() => vvd.expect(vvd.card.all()).toHaveCount(1),
				() => vvd.button.byLabel('Add Card').click(),
				() => vvd.expect(vvd.card.all()).toHaveCount(2),
				() => vvd.expect(vvd.card.all().nth(1)).toHaveHeadline('Card 1'),
			]),
		expectedState: {},
	},
];
