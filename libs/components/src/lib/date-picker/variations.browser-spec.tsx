import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { datePickerDefinition } from './definition';

const DatePicker = component(datePickerDefinition);

variationTest(
	'date-picker',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Start date' },
				'label + value': { label: 'Start date', value: '2023-01-15' },
				'label + helper-text': {
					label: 'Start date',
					'helper-text': 'Select a date',
				},
				'label + error-text': {
					label: 'Start date',
					'error-text': 'Please select a valid date',
				},
				'no label': {},
			},
		},
		render: (variant) => <DatePicker {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			modifier: {
				default: {},
				disabled: { disabled: true },
				readonly: { readonly: true },
			},
		},
		yAxis: {
			value: {
				empty: {},
				'with value': { value: '2023-01-15' },
			},
		},
		render: (variant) => (
			<DatePicker label="Start date" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '2023-01-15' },
			},
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
			const el = <DatePicker label="Start date" {...flattenAttrs(rest)} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Date Grid',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '2023-01-15' },
			},
		},
		yAxis: {
			variant: {
				default: {},
				'with min/max': { min: '2023-01-05', max: '2023-01-25' },
			},
		},
		render: async (variant) => {
			const el = <DatePicker label="Start date" {...flattenAttrs(variant)} />;
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('#picker-button');
				},
			});
		},
	}),
	table({
		caption: 'Month Grid',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '2023-01-15' },
			},
		},
		yAxis: {
			variant: {
				default: {},
			},
		},
		render: async (variant) => {
			const el = <DatePicker label="Start date" {...flattenAttrs(variant)} />;
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('#picker-button');
					await ctrl.clickDeepSelector('.title-action.button');
				},
			});
		},
	})
);
