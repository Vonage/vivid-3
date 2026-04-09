import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { progressRingDefinition } from './definition';

const ProgressRing = component(progressRingDefinition);

variationTest(
	'progress-ring',
	table({
		caption: 'Layout',
		xAxis: {
			size: [-6, -3, 0, 3, 5],
		},
		yAxis: {
			value: {
				determinate: 50,
				indeterminate: null,
			},
		},
		render: (variant) => (
			<ProgressRing
				min={0}
				max={100}
				aria-label="Progress ring"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta', 'success', 'alert'],
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
			<ProgressRing
				min={0}
				max={100}
				aria-label="Progress ring"
				{...flattenAttrs(variant)}
			/>
		),
	})
);
