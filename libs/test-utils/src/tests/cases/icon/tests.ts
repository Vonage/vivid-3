import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const iconTests: TestCase[] = [
	{
		path: 'icon',
		name: 'icon: component wrapper',
		test: (vvd) =>
			runSequence([
				() => vvd.expect(vvd.icon.byTestId('icon')).toHaveName('user-line'),
			]),
	},
	{
		path: 'icon',
		name: 'icon: affix icon mixin support',
		test: (vvd) =>
			runSequence([
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
