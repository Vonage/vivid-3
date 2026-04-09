import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { colorPickerDefinition } from './definition';

const ColorPicker = component(colorPickerDefinition);

const swatches = [
	{ value: '#D6219C' },
	{ value: '#FF5733' },
	{ value: '#33FF57' },
	{ value: '#3357FF' },
	{ value: '#F0E68C' },
	{ value: '#800080' },
];

variationTest(
	'color-picker',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'label only': { label: 'Color' },
				'label + value': { label: 'Color', value: '#D6219C' },
				'label + placeholder': {
					label: 'Color',
					placeholder: '#ffffff',
				},
				'label + helper-text': {
					label: 'Color',
					'helper-text': 'Pick a color',
				},
				'label + error-text': {
					label: 'Color',
					'error-text': 'Invalid color',
				},
				'label + success-text': {
					label: 'Color',
					'success-text': 'Color saved!',
					value: '#D6219C',
				},
			},
		},
		yAxis: {
			variant: {
				default: {},
			},
		},
		render: (variant) => <ColorPicker {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			modifier: {
				default: {},
				disabled: { disabled: true },
			},
		},
		yAxis: {
			value: {
				empty: {},
				'with value': { value: '#D6219C' },
			},
		},
		render: (variant) => (
			<ColorPicker label="Color" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '#D6219C' },
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
			const el = <ColorPicker label="Color" {...flattenAttrs(rest)} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Popup',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '#D6219C' },
			},
		},
		yAxis: {
			variant: {
				'with swatches': {},
				'no saved colors': { 'disable-saved-colors': true },
			},
		},
		render: async (variant) => {
			const el = (
				<ColorPicker
					label="Color"
					{...{ ':swatches': swatches }}
					{...flattenAttrs(variant)}
				/>
			);
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('.button');
				},
			});
		},
	})
);
