import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { component } from '../../visual-tests/jsx';
import { navItemDefinition } from './definition';

const NavItem = component(navItemDefinition);

variationTest(
	'nav-item',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'text only': {},
				'text + icon': { icon: 'profile-line' },
				'icon only': {
					text: null,
					icon: 'profile-line',
					'aria-label': 'Account',
				},
			},
		},
		yAxis: {
			meta: {
				'no meta': {},
				'with meta': {
					children: <span slot="meta">Meta</span>,
				},
			},
		},
		render: (variant) => (
			<NavItem text="Account" href="#" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			current: { default: false, current: true },
			appearance: ['ghost', 'ghost-light'],
		},
		render: (variant) => (
			<NavItem
				text="Account"
				icon="profile-line"
				href="#"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['ghost', 'ghost-light'],
			current: { default: false, current: true },
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
				<NavItem text="Account" icon="profile-line" href="#" {...rest} />
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
