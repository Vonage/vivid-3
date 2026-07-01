import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { navDisclosureDefinition } from './definition';
import { navItemDefinition } from '../nav-item/definition';

const NavDisclosure = component(navDisclosureDefinition);
const NavItem = component(navItemDefinition);

const childItems = (
	<>
		<NavItem text="General" href="#" icon="settings-line" />
		<NavItem text="Notifications" href="#" icon="notification-line" />
	</>
);

variationTest(
	'nav-disclosure',
	table({
		caption: 'Layout',
		xAxis: {
			open: { closed: false, open: true },
		},
		yAxis: {
			content: {
				'label only': { label: 'Settings' },
				'label + icon': { label: 'Settings', icon: 'gear-line' },
				'label + meta': {
					label: 'Settings',
					icon: 'gear-line',
					children: (
						<>
							<span slot="meta" style="font-size: 12px; color: grey;">
								3
							</span>
							{childItems}
						</>
					),
				},
			},
		},
		render: (variant) => {
			const { children, ...attrs } = flattenAttrs(variant);
			return (
				<div style="inline-size: 240px;">
					<NavDisclosure {...attrs}>{children ?? childItems}</NavDisclosure>
				</div>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			appearance: ['ghost', 'ghost-light'],
			current: { default: false, current: true },
		},
		render: (variant) => (
			<div style="inline-size: 240px;">
				<NavDisclosure
					label="Settings"
					icon="gear-line"
					open
					{...flattenAttrs(variant)}
				>
					{childItems}
				</NavDisclosure>
			</div>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['ghost', 'ghost-light'],
			connotation: ['accent', 'cta'],
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
				<div style="inline-size: 240px;">
					<NavDisclosure label="Settings" icon="gear-line" open {...rest}>
						{childItems}
					</NavDisclosure>
				</div>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
