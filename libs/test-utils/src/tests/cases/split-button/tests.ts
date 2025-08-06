import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const splitButtonTests: TestCase[] = [
	{
		path: 'split-button',
		name: 'split-button actions',
		test: (vvd, expectState) =>
			testSequence([
				() => vvd.splitButton.byLabel('Button').clickAction(),
				() =>
					expectState({
						actionClicked: true,
						indicatorClicked: false,
					}),
				() => vvd.splitButton.byLabel('Button').clickIndicator(),
				() =>
					expectState({
						actionClicked: true,
						indicatorClicked: true,
					}),
			]),
	},
];
