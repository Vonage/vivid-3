import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { radioGroupDefinition } from './definition';
import { radioDefinition } from '../radio/definition';

const RadioGroup = component(radioGroupDefinition);
const Radio = component(radioDefinition);

const radios = (
	<>
		<Radio label="Option 1" value="1" />
		<Radio label="Option 2" value="2" />
		<Radio label="Option 3" value="3" />
	</>
);

variationTest(
	'radio-group',
	table({
		caption: 'Layout',
		xAxis: {
			orientation: ['horizontal', 'vertical'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Pick an option' },
				'label + helper-text': {
					label: 'Pick an option',
					'helper-text': 'Choose the option that applies',
				},
				'label + error-text': {
					label: 'Pick an option',
					'error-text': 'Please select an option',
				},
				'no label': {},
			},
		},
		render: (variant) => (
			<RadioGroup value="2" {...flattenAttrs(variant)}>
				{radios}
			</RadioGroup>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			value: [null, '2'],
		},
		yAxis: {
			state: {
				default: {},
				disabled: { disabled: true },
				readonly: { readonly: true },
			},
		},
		render: (variant) => (
			<RadioGroup
				label="Pick an option"
				helper-text="Choose the option that applies"
				{...flattenAttrs(variant)}
			>
				{radios}
			</RadioGroup>
		),
	})
);
