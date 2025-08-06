import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const selectableBoxTests: TestCase[] = [
	{
		path: 'selectable-box',
		name: 'selectable box interactions',
		test: (vvd, expectState) =>
			testSequence([
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
