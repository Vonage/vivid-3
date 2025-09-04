import { runSequence } from '../../../utils/runSequence';
import type { TestCase } from '../../test-case';

export const sliderTests: TestCase[] = [
	{
		path: 'slider',
		name: 'slider: component wrapper',
		test: (vvd, expectState) =>
			runSequence([
				() => vvd.expect(vvd.slider.byLabel('Slider')).toHaveValueAsNumber(25),
				() => vvd.slider.byLabel('Slider').slideTo(50),
				() => vvd.expect(vvd.slider.byLabel('Slider')).toHaveValueAsNumber(50),
				() =>
					expectState({
						value: 50,
					}),
			]),
	},
];
