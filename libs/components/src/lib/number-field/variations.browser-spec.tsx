import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { numberFieldDefinition } from './definition';

const NumberField = component(numberFieldDefinition);

variationTest(
	'number-field',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Quantity' },
				'label + placeholder': {
					label: 'Quantity',
					placeholder: '0',
				},
				'label + value': { label: 'Quantity', value: '42' },
				'label + helper-text': {
					label: 'Quantity',
					'helper-text': 'Enter a number',
				},
				'label + error-text': {
					label: 'Quantity',
					'error-text': 'Value out of range',
					value: '99',
				},
				'label + success-text': {
					label: 'Quantity',
					'success-text': 'Looks good!',
					value: '5',
				},
				'no label': {},
			},
		},
		render: (variant) => (
			<NumberField appearance="fieldset" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['fieldset', 'ghost'],
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			modifier: {
				default: {},
				disabled: { disabled: true },
				readonly: { readonly: true },
			},
		},
		render: (variant) => (
			<NumberField label="Quantity" value="42" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['fieldset', 'ghost'],
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
			const el = <NumberField label="Quantity" value="42" {...rest} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
