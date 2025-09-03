import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const rangeSliderTests: TestCase[] = [
	{
		path: 'range-slider',
		name: 'range-slider: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() =>
					vvd
						.expect(vvd.rangeSlider.byLabel('Range Slider'))
						.toHaveRange([25, 75]),
				() => vvd.rangeSlider.byLabel('Range Slider').slideStartTo(50),
				() =>
					vvd
						.expect(vvd.rangeSlider.byLabel('Range Slider'))
						.toHaveRange([50, 75]),
				() =>
					expectState({
						start: 50,
						end: 75,
					}),
				() => vvd.rangeSlider.byLabel('Range Slider').slideEndTo(100),
				() =>
					vvd
						.expect(vvd.rangeSlider.byLabel('Range Slider'))
						.toHaveRange([50, 100]),
				() =>
					expectState({
						start: 50,
						end: 100,
					}),
			]),
	},
];
