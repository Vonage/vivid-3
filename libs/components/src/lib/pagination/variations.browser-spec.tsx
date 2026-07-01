import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { paginationDefinition } from './definition';

const Pagination = component(paginationDefinition);

variationTest(
	'pagination',
	table({
		caption: 'Layout',
		xAxis: {
			size: ['super-condensed', 'condensed', 'normal'],
		},
		yAxis: {
			pages: {
				'first page (prev disabled)': { total: 5, 'selected-index': 0 },
				'middle page': { total: 5, 'selected-index': 2 },
				'last page (next disabled)': { total: 5, 'selected-index': 4 },
				'many pages, start': { total: 20, 'selected-index': 0 },
				'many pages, middle': { total: 20, 'selected-index': 9 },
				'many pages, end': { total: 20, 'selected-index': 19 },
				'no pages': { total: 0 },
			},
		},
		render: (variant) => <Pagination {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			'nav-icons': { 'text labels': false, 'icon buttons': true },
		},
		yAxis: {
			shape: ['rounded', 'pill'],
		},
		render: (variant) => (
			<Pagination total={20} selected-index={9} {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			'nav-icons': { 'text labels': false, 'icon buttons': true },
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
				<Pagination total={5} selected-index={2} {...flattenAttrs(rest)} />
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
