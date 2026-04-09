import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { textAreaDefinition } from './definition';
import { contextualHelpDefinition } from '../contextual-help/definition';

const TextArea = component(textAreaDefinition);
const ContextualHelp = component(contextualHelpDefinition);

variationTest(
	'text-area',
	table({
		caption: 'Layout',
		xAxis: {
			rows: [1, 2, 3],
		},
		yAxis: {
			content: {
				'label only': { label: 'Label' },
				'label + placeholder': {
					label: 'Label',
					placeholder: 'Placeholder text',
				},
				'label + value': {
					label: 'Label',
					value: 'Some example text',
				},
				'label + helper-text': {
					label: 'Label',
					'helper-text': 'Helper text',
				},
				'label + error-text': {
					label: 'Label',
					'error-text': 'Error message',
					value: 'Some text',
				},
				'label + success-text': {
					label: 'Label',
					'success-text': 'Looks great!',
					value: 'Some text',
				},
				'label + char-count': {
					label: 'Label',
					'char-count': true,
					maxlength: 30,
					value: 'Some text',
				},
				'label + contextual-help': {
					label: 'Label',
					children: (
						<ContextualHelp slot="contextual-help">
							Contextual help text
						</ContextualHelp>
					),
				},
				'no label': {},
			},
		},
		render: (variant) => <TextArea {...flattenAttrs(variant)} />,
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
			feedback: {
				'no feedback': {},
				'with error': { 'error-text': 'Error message' },
				'with success': { 'success-text': 'Looks great!' },
			},
		},
		render: (variant) => (
			<TextArea
				label="Label"
				value="Some example text"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			modifier: {
				default: {},
				readonly: { readonly: true },
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
				<TextArea
					label="Label"
					value="Some example text"
					{...flattenAttrs(rest)}
				/>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
