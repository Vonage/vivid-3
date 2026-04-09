import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { component } from '../../visual-tests/jsx';
import { treeItemDefinition } from './definition';

const TreeItem = component(treeItemDefinition);

variationTest(
	'tree-item',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'text only': {},
				'text + icon': { icon: 'chat-line' },
			},
		},
		yAxis: {
			children: {
				'no children': {},
				collapsed: {
					children: <TreeItem slot="item" text="Child Item"></TreeItem>,
				},
				expanded: {
					expanded: true,
					children: <TreeItem slot="item" text="Child Item"></TreeItem>,
				},
			},
		},
		render: (variant) => (
			<TreeItem text="Tree Item" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			content: {
				'text only': {},
				'text + icon': { icon: 'chat-line' },
			},
		},
		yAxis: {
			disabled: { default: false, disabled: true },
			selected: { default: false, selected: true },
		},
		render: (variant) => (
			<TreeItem text="Tree Item" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			selected: { default: false, selected: true },
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
			const el = <TreeItem text="Tree Item" icon="chat-line" {...rest} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
