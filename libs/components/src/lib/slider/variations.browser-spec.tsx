import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { sliderDefinition } from './definition';

const Slider = component(sliderDefinition);

variationTest(
	'slider',
	table({
		caption: 'Layout',
		xAxis: {
			value: { 'value=0': 0, 'value=5': 5, 'value=10': 10 },
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
			const slider = <Slider aria-label="Slider" {...flattenAttrs(variant)} />;
			return variant.orientation === 'vertical' ? (
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
				readonly: { readonly: true },
			},
		},
		render: (variant) => (
			<div style="width: 300px;">
				<Slider
					value="5"
					aria-label="Slider"
					markers
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
			const slider = <Slider value="5" aria-label="Slider" pin {...rest} />;
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
