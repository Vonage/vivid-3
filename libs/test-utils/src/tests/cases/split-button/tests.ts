import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const splitButtonTests: TestCase[] = [
	{
		path: 'split-button',
		name: 'split-button: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
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
