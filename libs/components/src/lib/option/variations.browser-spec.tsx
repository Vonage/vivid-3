import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { listboxOptionDefinition } from './definition';

const Option = component(listboxOptionDefinition);

variationTest(
	'option',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'text only': { text: 'Option text' },
				'text + icon': { text: 'Option text', icon: 'chat-line' },
				'text + trailing icon': {
					text: 'Option text',
					icon: 'chat-line',
					'icon-trailing': true,
				},
				'text + secondary': {
					text: 'Option text',
					'text-secondary': 'Secondary text',
				},
				'text + secondary + icon': {
					text: 'Option text',
					'text-secondary': 'Secondary text',
					icon: 'chat-line',
				},
				'trailing-meta': {
					text: 'Option text',
					children: <span slot="trailing-meta">Meta</span>,
				},
			},
		},
		yAxis: {
			selected: { unselected: false, selected: true },
			checked: {
				unchecked: {},
				checked: { checked: true },
			},
		},
		render: (variant) => <Option {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Matched Text',
		xAxis: {
			content: {
				'partial match': { text: 'Option text', 'matched-text': 'Opt' },
				'full match': {
					text: 'Option text',
					'matched-text': 'Option text',
				},
			},
		},
		yAxis: {
			selected: { unselected: false, selected: true },
		},
		render: (variant) => <Option {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: {
				accent: {},
				cta: { connotation: 'cta' },
			},
		},
		yAxis: {
			disabled: { default: false, disabled: true },
			selected: { unselected: false, selected: true },
		},
		render: (variant) => (
			<Option text="Option text" icon="chat-line" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			connotation: {
				accent: {},
				cta: { connotation: 'cta' },
			},
			selected: { unselected: false, selected: true },
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
				<Option text="Option text" icon="chat-line" {...flattenAttrs(rest)} />
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
