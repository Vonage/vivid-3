import { testSequence } from '../../utils/testSequence';
import type { TestCase } from '../../test-case';

export const tooltipTests: TestCase[] = [
	{
		path: 'tooltip',
		name: 'tooltip',
		test: (vvd) =>
			testSequence([
				() => vvd.expect(vvd.tooltip.byText('Tooltip text')).toBeClosed(),
				() => vvd.button.byLabel('Hover me').hover(),
				() => vvd.expect(vvd.tooltip.byText('Tooltip text')).toBeOpen(),
			]),
	},
];
