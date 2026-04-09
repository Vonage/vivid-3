import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { buttonDefinition } from './definition';

const Button = component(buttonDefinition);

variationTest(
	'button',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				label: { label: 'Button' },
				'label + icon': { label: 'Button', icon: 'message-sent-line' },
				'label + icon trailing': {
					label: 'Button',
					icon: 'message-sent-line',
					'icon-trailing': true,
				},
				'icon only': { icon: 'message-sent-line', 'aria-label': 'Send' },
				stacked: {
					label: 'Button',
					icon: 'message-sent-line',
					stacked: true,
				},
				'dropdown-indicator': {
					label: 'Button',
					'dropdown-indicator': true,
				},
			},
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			size: ['super-condensed', 'condensed', 'normal', 'expanded'],
		},
		render: (variant) => (
			<Button appearance="filled" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta', 'success', 'alert', 'announcement'],
		},
		yAxis: {
			disabled: { default: false, disabled: true },
			appearance: [
				'filled',
				'outlined',
				'outlined-light',
				'ghost',
				'ghost-light',
			],
		},
		render: (variant) => (
			<Button
				label="Button"
				icon="message-sent-line"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'States',
		xAxis: {
			appearance: [
				'ghost',
				'filled',
				'outlined',
				'ghost-light',
				'outlined-light',
			],
		},
		yAxis: {
			state: {
				active: { active: true },
				pressed: { pressed: true },
				pending: { pending: true },
				'dropdown-indicator': { 'dropdown-indicator': true },
				'dropdown expanded': {
					'dropdown-indicator': true,
					'aria-expanded': 'true',
				},
			},
		},
		render: (variant) => (
			<Button
				label="Button"
				connotation="accent"
				icon="message-sent-line"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['ghost', 'filled', 'outlined'],
			connotation: ['accent', 'announcement', 'cta', 'success', 'alert'],
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
			const button = (
				<Button label="Button" icon="message-sent-line" {...rest} />
			);

			if (!state) return button;
			return renderIsolated(button, { setup: state });
		},
	})
);
