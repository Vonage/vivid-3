import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { component } from '../../visual-tests/jsx';
import { breadcrumbItemDefinition } from './definition';
import { breadcrumbDefinition } from '../breadcrumb/definition';

const Breadcrumb = component(breadcrumbDefinition);
const BreadcrumbItem = component(breadcrumbItemDefinition);

variationTest(
	'breadcrumb-item',
	table({
		caption: 'Layout',
		xAxis: {
			href: {
				'no href': {},
				'with href': { href: '#' },
			},
		},
		yAxis: {
			default: [null],
		},
		render: (variant) => (
			<Breadcrumb>
				<BreadcrumbItem text="First" {...flattenAttrs(variant)} />
				<BreadcrumbItem text="Middle" {...flattenAttrs(variant)} />
				<BreadcrumbItem text="Last" {...flattenAttrs(variant)} />
			</Breadcrumb>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			default: [null],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state }) => {
			const el = (
				<Breadcrumb>
					<BreadcrumbItem text="Breadcrumb" href="#" />
				</Breadcrumb>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
