import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const iconTests: TestCase[] = [
	{
		path: 'icon',
		name: 'icon state',
		test: (vvd) =>
			testSequence([
				() => vvd.expect(vvd.icon.byTestId('icon')).toHaveName('user-line'),
				() =>
					vvd
						.expect(vvd.button.byLabel('With Icon Attribute'))
						.toHaveIcon('user-line'),
				() =>
					vvd
						.expect(vvd.button.byLabel('With Icon Slot'))
						.toHaveIcon('user-line'),
			]),
	},
];
