import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { progressDefinition } from './definition';

const Progress = component(progressDefinition);

variationTest(
	'progress',
	table({
		caption: 'Layout',
		xAxis: {
			value: {
				determinate: 50,
				indeterminate: null,
			},
			shape: ['rounded', 'sharp'],
		},
		yAxis: {
			reverse: { default: false, reverse: true },
		},
		render: (variant) => (
			<Progress
				style="display: block; width: 200px;"
				min={0}
				max={100}
				aria-label="Progress"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta', 'success', 'alert', 'pacific'],
		},
		yAxis: {
			state: {
				determinate: { value: 50 },
				indeterminate: { value: null },
				paused: { value: 50, paused: true },
				'indeterminate paused': { value: null, paused: true },
			},
		},
		render: (variant) => (
			<Progress
				style="display: block; width: 200px;"
				min={0}
				max={100}
				aria-label="Progress"
				{...flattenAttrs(variant)}
			/>
		),
	})
);
