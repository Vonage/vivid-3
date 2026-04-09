import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { rangeSliderDefinition } from './definition';

const RangeSlider = component(rangeSliderDefinition);

variationTest(
	'range-slider',
	table({
		caption: 'Layout',
		xAxis: {
			range: {
				'start=0 end=4': { start: '0', end: '4' },
				'start=3 end=7': { start: '3', end: '7' },
				'start=6 end=10': { start: '6', end: '10' },
			},
		},
		yAxis: {
			orientation: ['horizontal', 'vertical'],
			markers: {
				'no markers': {},
				'markers (10)': { markers: true },
				'markers (20)': { markers: true, min: -5, max: 15 },
			},
		},
		render: (variant) => {
			const { orientation, ...rest } = flattenAttrs(variant);
			const slider = (
				<RangeSlider
					aria-start-label="Start"
					aria-end-label="End"
					{...rest}
					orientation={orientation}
				/>
			);
			return orientation === 'vertical' ? (
				<div style="height: 200px;">{slider}</div>
			) : (
				<div style="width: 300px;">{slider}</div>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			modifier: {
				default: {},
				disabled: { disabled: true },
			},
		},
		render: (variant) => (
			<div style="width: 300px;">
				<RangeSlider
					start="3"
					end="7"
					markers
					aria-start-label="Start"
					aria-end-label="End"
					{...flattenAttrs(variant)}
				/>
			</div>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
				'hover + vertical': {
					state: (ctrl: SampleControls) => ctrl.hover(),
					orientation: 'vertical',
				},
			},
		},
		render: async (variant) => {
			const { state, ...rest } = flattenAttrs(variant);
			const slider = (
				<RangeSlider
					start="5"
					end="8"
					pin
					aria-start-label="Start"
					aria-end-label="End"
					{...rest}
				/>
			);
			const el =
				rest.orientation === 'vertical' ? (
					<div style="height: 200px;">{slider}</div>
				) : (
					<div style="width: 300px;">{slider}</div>
				);
			if (!state) return el;
			return renderIsolated(el, { setup: state, center: true });
		},
	})
);
