import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { searchableSelectDefinition } from './definition';
import { listboxOptionDefinition } from '../option/definition';

const SearchableSelect = component(searchableSelectDefinition);
const Option = component(listboxOptionDefinition);

const options = (
	<>
		<Option value="AF" text="Afghanistan" />
		<Option value="AL" text="Albania" />
		<Option value="DZ" text="Algeria" />
	</>
);

variationTest(
	'searchable-select',
	table({
		caption: 'Layout',
		xAxis: {
			shape: ['rounded', 'pill'],
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				empty: {},
				placeholder: { placeholder: 'Select a country…' },
				'single value': { ':values': ['AF'] },
				'with icon': { icon: 'globe-line' },
				'with label': { label: 'Country' },
				'label + helper-text': {
					label: 'Country',
					'helper-text': 'Pick one',
				},
				clearable: { clearable: true, ':values': ['AF'] },
			},
		},
		render: (variant) => (
			<SearchableSelect {...flattenAttrs(variant)}>{options}</SearchableSelect>
		),
	}),
	table({
		caption: 'Multiple',
		xAxis: {
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			content: {
				'single tag': {
					':values': ['AF'],
				},
				'multiple tags': {
					':values': ['AF', 'AL', 'DZ'],
				},
				'max-lines 1': {
					':values': ['AF', 'AL', 'DZ'],
					'max-lines': 1,
				},
				'clearable + tags': {
					':values': ['AF', 'AL'],
					clearable: true,
				},
				'external-tags': {
					':values': ['AF', 'AL'],
					'external-tags': true,
				},
				'max-selected 2': {
					':values': ['AF'],
					'max-selected': 2,
					label: 'Country',
				},
			},
		},
		render: (variant) => (
			<SearchableSelect multiple label="Countries" {...flattenAttrs(variant)}>
				{options}
			</SearchableSelect>
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
				'error-text': { 'error-text': 'Required' },
				'success-text': { 'success-text': 'Looks good' },
			},
		},
		render: (variant) => (
			<SearchableSelect
				label="Country"
				{...flattenAttrs(variant)}
				{...{ ':values': ['AF'] }}
			>
				{options}
			</SearchableSelect>
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
				<SearchableSelect label="Country" {...rest} {...{ ':values': ['AF'] }}>
					{options}
				</SearchableSelect>
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
				'with selection': { ':values': ['AF'] },
				multiple: { multiple: true, ':values': ['AF', 'AL'] },
			},
		},
		render: async (variant) => {
			const el = (
				<SearchableSelect label="Country" {...flattenAttrs(variant)}>
					{options}
				</SearchableSelect>
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
