import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { fabDefinition } from './definition';

const Fab = component(fabDefinition);

variationTest(
	'fab',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'label + icon': { label: 'Action', icon: 'plus-line' },
				'label + icon trailing': {
					label: 'Action',
					icon: 'plus-line',
					'icon-trailing': true,
				},
				'icon only': { icon: 'plus-line', 'aria-label': 'Add' },
				'label only': { label: 'Action' },
			},
		},
		yAxis: {
			size: ['condensed', 'normal', 'expanded'],
		},
		render: (variant) => <Fab {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta', 'announcement'],
		},
		yAxis: {
			disabled: { default: false, disabled: true },
		},
		render: (variant) => (
			<Fab label="Action" icon="plus-line" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			connotation: ['accent', 'cta', 'announcement'],
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
			const fab = <Fab label="Action" icon="plus-line" {...rest} />;
			if (!state) return fab;
			return renderIsolated(fab, { setup: state });
		},
	})
);
