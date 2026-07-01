import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { checkboxDefinition } from './definition';

const Checkbox = component(checkboxDefinition);

variationTest(
	'checkbox',
	table({
		caption: 'Layout',
		xAxis: {
			checkedState: {
				unchecked: {},
				checked: { checked: true },
				indeterminate: { indeterminate: true },
			},
		},
		yAxis: {
			content: {
				'no label': {},
				label: { label: 'A checkbox label' },
				'label + helper-text': {
					label: 'A checkbox label',
					'helper-text': 'Some helpful context',
				},
				'label + error-text': {
					label: 'I agree to the terms',
					'error-text': 'You must agree to proceed',
				},
				'label + success-text': {
					label: 'A checkbox label',
					'success-text': 'Looks good!',
				},
			},
		},
		render: (variant) => <Checkbox {...flattenAttrs(variant)} />,
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
				indeterminate: { indeterminate: true },
				disabled: { disabled: true },
				'disabled + checked': { disabled: true, checked: true },
				readonly: { readonly: true },
				'readonly + checked': { readonly: true, checked: true },
			},
		},
		render: (variant) => (
			<Checkbox label="A checkbox" {...flattenAttrs(variant)} />
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
			const el = <Checkbox label="A checkbox" {...rest} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
