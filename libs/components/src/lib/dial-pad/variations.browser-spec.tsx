import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { dialPadDefinition } from './definition';

const DialPad = component(dialPadDefinition);

variationTest(
	'dial-pad',
	table({
		caption: 'Layout',
		xAxis: {
			size: ['normal', 'condensed'],
		},
		yAxis: {
			content: {
				default: {},
				'with value': { value: '1234567' },
				'with placeholder': { placeholder: 'Enter number' },
				'with helper-text': {
					value: '1158',
					'helper-text': 'Extension',
				},
				'no-call': { 'no-call': true },
				'no-input': { 'no-input': true },
				'no-call + no-input': {
					'no-call': true,
					'no-input': true,
				},
			},
		},
		render: (variant) => (
			<DialPad aria-label="Dial pad" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			'call-state': {
				default: {},
				'call-active': { 'call-active': true },
				pending: { pending: true },
			},
		},
		yAxis: {
			disabled: { default: false, disabled: true },
		},
		render: (variant) => (
			<DialPad
				aria-label="Dial pad"
				value="0114686"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			size: ['normal', 'condensed'],
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
			const el = <DialPad aria-label="Dial pad" value="123" {...rest} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
