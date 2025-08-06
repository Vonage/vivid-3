import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const selectableBoxTests: TestCase[] = [
	{
		path: 'selectable-box',
		name: 'selectable-box: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd
						.expect(vvd.selectableBox.byTestId('selectable-box'))
						.toBeUnchecked(),
				() => vvd.selectableBox.byTestId('selectable-box').check(),
				() =>
					vvd
						.expect(vvd.selectableBox.byTestId('selectable-box'))
						.toBeChecked(),
				() =>
					expectState({
						checked: true,
					}),
			]),
	},
];
