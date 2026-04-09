import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { comboboxDefinition } from './definition';
import { listboxOptionDefinition } from '../option/definition';

const Combobox = component(comboboxDefinition);
const Option = component(listboxOptionDefinition);

const options = (
	<>
		<Option value="1" text="Option 1" />
		<Option value="2" text="Option 2" />
		<Option value="3" text="Option 3" />
	</>
);

variationTest(
	'combobox',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Search' },
				'label + placeholder': {
					label: 'Search',
					placeholder: 'Type to search…',
				},
				'label + value': {
					label: 'Search',
					'current-value': 'Option 1',
				},
				'label + icon': { label: 'Search', icon: 'search-line' },
				'label + helper-text': {
					label: 'Search',
					'helper-text': 'Start typing to filter',
				},
				'label + error-text': {
					label: 'Search',
					'error-text': 'Please select a value',
				},
				'label + success-text': {
					label: 'Search',
					'success-text': 'Value accepted',
					'current-value': 'Option 1',
				},
				'no label': { placeholder: 'Type to search…' },
			},
		},
		render: (variant) => (
			<Combobox appearance="fieldset" {...flattenAttrs(variant)}>
				{options}
			</Combobox>
		),
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
				'error-text': { 'error-text': 'Please select a value' },
				'success-text': { 'success-text': 'Value accepted' },
			},
		},
		render: (variant) => (
			<Combobox
				label="Search"
				icon="search-line"
				current-value="Option 1"
				{...flattenAttrs(variant)}
			>
				{options}
			</Combobox>
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
				<Combobox label="Search" icon="search-line" {...rest}>
					{options}
				</Combobox>
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
			content: {
				empty: {},
				'with value': { 'current-value': 'Option 1' },
			},
		},
		render: async (variant) => {
			const el = (
				<Combobox label="Search" {...flattenAttrs(variant)}>
					{options}
				</Combobox>
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
