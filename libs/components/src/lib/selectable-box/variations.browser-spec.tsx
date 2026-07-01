import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { selectableBoxDefinition } from './definition';

const SelectableBox = component(selectableBoxDefinition);

variationTest(
	'selectable-box',
	table({
		caption: 'Layout',
		xAxis: {
			'control-placement': ['end-stacked', 'start-stacked', 'end', 'start'],
		},
		yAxis: {
			'control-type': ['checkbox', 'radio'],
			tight: { default: false, tight: true },
		},
		render: (variant) => (
			<SelectableBox {...flattenAttrs(variant)}>
				Selectable box content
			</SelectableBox>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			state: {
				unchecked: {},
				checked: { checked: true },
				disabled: { disabled: true },
				'checked + disabled': { checked: true, disabled: true },
			},
		},
		render: (variant) => (
			<SelectableBox
				{...{ 'control-type': 'checkbox', 'control-placement': 'end-stacked' }}
				{...flattenAttrs(variant)}
			>
				Selectable box content
			</SelectableBox>
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
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, ...rest }) => {
			const el = (
				<SelectableBox
					{...{ 'control-type': 'checkbox', 'clickable-box': true }}
					{...rest}
				>
					Selectable box content
				</SelectableBox>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
