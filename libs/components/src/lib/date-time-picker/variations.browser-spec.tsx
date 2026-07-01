import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { dateTimePickerDefinition } from './definition';

const DateTimePicker = component(dateTimePickerDefinition);

variationTest(
	'date-time-picker',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Appointment' },
				'label + value': {
					label: 'Appointment',
					value: '2023-01-15T14:30:00',
				},
				'label + helper-text': {
					label: 'Appointment',
					'helper-text': 'Select date and time',
				},
				'label + error-text': {
					label: 'Appointment',
					'error-text': 'Please select a valid date and time',
				},
				'no label': {},
			},
		},
		render: (variant) => <DateTimePicker {...flattenAttrs(variant)} />,
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
				'with value': { value: '2023-01-15T14:30:00' },
			},
		},
		render: (variant) => (
			<DateTimePicker label="Appointment" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '2023-01-15T14:30:00' },
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
			const el = <DateTimePicker label="Appointment" {...flattenAttrs(rest)} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Date and Time Grid',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '2023-01-15T14:30:00' },
			},
		},
		yAxis: {
			variant: {
				'24h': { clock: '24h' },
				'12h': { clock: '12h' },
				'with min/max': {
					clock: '24h',
					'min-date': '2023-01-05',
					'max-date': '2023-01-25',
				},
			},
		},
		render: async (variant) => {
			const el = (
				<DateTimePicker label="Appointment" {...flattenAttrs(variant)} />
			);
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
				'with value': { value: '2023-01-15T14:30:00' },
			},
		},
		yAxis: {
			variant: {
				default: {},
			},
		},
		render: async (variant) => {
			const el = (
				<DateTimePicker label="Appointment" {...flattenAttrs(variant)} />
			);
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
