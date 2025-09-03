import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const tooltipTests: TestCase[] = [
	{
		path: 'tooltip',
		name: 'tooltip: component wrapper',
		test: (vvd) =>
			runSequence([
				() => vvd.expect(vvd.tooltip.byText('Tooltip text')).toBeClosed(),
				() => vvd.button.byLabel('Hover me').hover(),
				() => vvd.expect(vvd.tooltip.byText('Tooltip text')).toBeOpen(),
			]),
	},
];
