import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { splitButtonDefinition } from './definition';

const SplitButton = component(splitButtonDefinition);

variationTest(
	'split-button',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				label: { label: 'Action' },
				'label + icon': { label: 'Action', icon: 'compose-line' },
				'icon only': { icon: 'compose-line', 'aria-label': 'Compose' },
			},
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			size: ['super-condensed', 'condensed', 'normal', 'expanded'],
		},
		render: (variant) => (
			<SplitButton appearance="filled" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta', 'success', 'alert', 'announcement'],
		},
		yAxis: {
			disabled: { default: false, disabled: true },
			appearance: ['filled', 'outlined', 'outlined-light', 'ghost'],
		},
		render: (variant) => (
			<SplitButton
				label="Action"
				icon="compose-line"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['ghost', 'filled', 'outlined', 'outlined-light'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				'focused: action': (ctrl: SampleControls) => ctrl.tabIn(),
				'focused: indicator': (ctrl: SampleControls) => ctrl.tabIn(2),
			},
		},
		render: async ({ state, ...rest }) => {
			const el = (
				<SplitButton
					label="Action"
					icon="compose-line"
					connotation="accent"
					{...rest}
				/>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
