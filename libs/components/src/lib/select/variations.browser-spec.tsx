import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { selectDefinition } from './definition';
import { listboxOptionDefinition } from '../option/definition';

const Select = component(selectDefinition);
const Option = component(listboxOptionDefinition);

const options = (
	<>
		<Option value="1" text="Option 1" selected />
		<Option value="2" text="Option 2" />
		<Option value="3" text="Option 3" />
	</>
);

const optionsNoSelection = (
	<>
		<Option value="1" text="Option 1" />
		<Option value="2" text="Option 2" />
		<Option value="3" text="Option 3" />
	</>
);

variationTest(
	'select',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Choose' },
				'label + placeholder': {
					label: 'Choose',
					placeholder: 'Select an option…',
					children: optionsNoSelection,
				},
				'label + value': { label: 'Choose' },
				'label + icon': { label: 'Choose', icon: 'globe-line' },
				'label + icon trailing': {
					label: 'Choose',
					icon: 'globe-line',
					'icon-trailing': true,
				},
				'label + helper-text': {
					label: 'Choose',
					'helper-text': 'Pick one option',
				},
				'label + error-text': {
					label: 'Choose',
					'error-text': 'Selection required',
				},
				'label + success-text': {
					label: 'Choose',
					'success-text': 'Good choice!',
				},
				clearable: { label: 'Choose', clearable: true },
				'no label': {},
			},
		},
		render: (variant) => {
			const { children, ...attrs } = flattenAttrs(variant);
			return (
				<Select appearance="fieldset" {...attrs}>
					{children ?? options}
				</Select>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['fieldset', 'ghost'],
		},
		yAxis: {
			state: {
				default: {},
				disabled: { disabled: true },
				'error-text': { 'error-text': 'Selection required' },
				'success-text': { 'success-text': 'Good choice!' },
			},
		},
		render: (variant) => (
			<Select label="Choose" icon="globe-line" {...flattenAttrs(variant)}>
				{options}
			</Select>
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
			const el = (
				<Select label="Choose" icon="globe-line" {...rest}>
					{options}
				</Select>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Dropdown',
		xAxis: {
			appearance: ['fieldset', 'ghost'],
		},
		yAxis: {
			selection: {
				'no selection': false,
				'with selection': true,
			},
		},
		render: async ({ appearance, selection }) => {
			const el = (
				<Select label="Choose" appearance={appearance}>
					{selection ? options : optionsNoSelection}
				</Select>
			);
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('#control');
				},
			});
		},
	})
);
