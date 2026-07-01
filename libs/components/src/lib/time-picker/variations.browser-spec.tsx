import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { timePickerDefinition } from './definition';

const TimePicker = component(timePickerDefinition);

variationTest(
	'time-picker',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Start time' },
				'label + value': { label: 'Start time', value: '14:30:00' },
				'label + helper-text': {
					label: 'Start time',
					'helper-text': 'Select a time',
				},
				'label + error-text': {
					label: 'Start time',
					'error-text': 'Please select a valid time',
				},
				'no label': {},
			},
		},
		render: (variant) => <TimePicker {...flattenAttrs(variant)} />,
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
				'with value': { value: '14:30:00' },
			},
		},
		render: (variant) => (
			<TimePicker label="Start time" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '14:30:00' },
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
			const el = <TimePicker label="Start time" {...flattenAttrs(rest)} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Time Grid',
		xAxis: {
			clock: {
				'24h': { clock: '24h' },
				'12h': { clock: '12h' },
			},
		},
		yAxis: {
			variant: {
				default: {},
				'with value': { value: '14:30:00' },
				'with seconds': { 'seconds-step': 5 },
			},
		},
		render: async (variant) => {
			const el = <TimePicker label="Start time" {...flattenAttrs(variant)} />;
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('#picker-button');
				},
			});
		},
	})
);
