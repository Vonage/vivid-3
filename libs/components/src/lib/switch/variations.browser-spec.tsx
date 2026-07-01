import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { switchDefinition } from './definition';

const Switch = component(switchDefinition);

variationTest(
	'switch',
	table({
		caption: 'Layout',
		xAxis: {
			label: {
				'no label': null,
				'with label': 'Email notifications',
			},
		},
		yAxis: {
			checked: { unchecked: false, checked: true },
		},
		render: (variant) => <Switch {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta', 'success', 'announcement', 'alert'],
		},
		yAxis: {
			modifier: {
				default: {},
				disabled: { disabled: true },
				readonly: { readonly: true },
			},
		},
		render: (variant) => (
			<Switch label="Switch" checked {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			connotation: ['accent', 'alert'],
			checked: { unchecked: false, checked: true },
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: ({ state, ...rest }) => {
			const el = <Switch label="Switch" {...flattenAttrs(rest)} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
