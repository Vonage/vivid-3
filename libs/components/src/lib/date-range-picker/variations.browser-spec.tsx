import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { dateRangePickerDefinition } from './definition';

const DateRangePicker = component(dateRangePickerDefinition);

variationTest(
	'date-range-picker',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Event duration' },
				'label + range': {
					label: 'Event duration',
					start: '2023-01-10',
					end: '2023-01-20',
				},
				'label + helper-text': {
					label: 'Event duration',
					'helper-text': 'Select a date range',
				},
				'label + error-text': {
					label: 'Event duration',
					'error-text': 'Please select a valid date range',
				},
				'no label': {},
			},
		},
		render: (variant) => <DateRangePicker {...flattenAttrs(variant)} />,
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
				'with range': { start: '2023-01-10', end: '2023-01-20' },
			},
		},
		render: (variant) => (
			<DateRangePicker label="Event duration" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			value: {
				empty: {},
				'with range': { start: '2023-01-10', end: '2023-01-20' },
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
			const el = (
				<DateRangePicker label="Event duration" {...flattenAttrs(rest)} />
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Date Grid',
		xAxis: {
			value: {
				empty: {},
				'with range': { start: '2023-01-10', end: '2023-01-20' },
			},
		},
		yAxis: {
			variant: {
				default: {},
				'with min/max': { min: '2023-01-05', max: '2023-02-25' },
			},
		},
		render: async (variant) => {
			const el = (
				<DateRangePicker label="Event duration" {...flattenAttrs(variant)} />
			);
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('#picker-button');
				},
			});
		},
	})
);
