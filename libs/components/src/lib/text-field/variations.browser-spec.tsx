import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { textFieldDefinition } from './definition';

const TextField = component(textFieldDefinition);

variationTest(
	'text-field',
	table({
		caption: 'Layout',
		xAxis: {
			scale: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				'label only': { label: 'First name' },
				'label + placeholder': {
					label: 'Email',
					placeholder: 'name@example.com',
				},
				'label + value': { label: 'Username', value: 'JoeB_89' },
				'label + icon': { label: 'Search', icon: 'search-line' },
				'label + helper-text': {
					label: 'Username',
					'helper-text': 'Must be unique',
				},
				'label + error-text': {
					label: 'Username',
					'error-text': 'Already taken',
					value: 'Joe',
				},
				'label + success-text': {
					label: 'Username',
					'success-text': 'Available!',
					value: 'JoeB_89',
				},
				'label + char-count': {
					label: 'Username',
					'char-count': true,
					maxlength: 15,
					value: 'JoeB_89',
				},
				'no label': {},
			},
		},
		render: (variant) => (
			<TextField appearance="fieldset" {...flattenAttrs(variant)} />
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
			<TextField
				label="Username"
				value="JoeB_89"
				icon="search-line"
				{...flattenAttrs(variant)}
			/>
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
			const el = <TextField label="Username" value="JoeB_89" {...rest} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
