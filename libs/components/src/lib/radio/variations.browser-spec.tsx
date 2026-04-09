import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { radioDefinition } from './definition';

const Radio = component(radioDefinition);

variationTest(
	'radio',
	table({
		caption: 'Layout',
		xAxis: {
			checkedState: {
				unchecked: {},
				checked: { checked: true },
			},
		},
		yAxis: {
			label: {
				'no label': {},
				'with label': { label: 'A radio option' },
			},
		},
		render: (variant) => <Radio {...flattenAttrs(variant)} />,
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
				'disabled + checked': { disabled: true, checked: true },
				readonly: { readonly: true },
				'readonly + checked': { readonly: true, checked: true },
			},
		},
		render: (variant) => (
			<Radio label="A radio option" {...flattenAttrs(variant)} />
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
			},
		},
		render: async ({ state, ...rest }) => {
			const el = <Radio label="A radio option" {...rest} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
