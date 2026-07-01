import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { navDefinition } from './definition';
import { navDisclosureDefinition } from '../nav-disclosure/definition';
import { navItemDefinition } from '../nav-item/definition';

const Nav = component(navDefinition);
const NavDisclosure = component(navDisclosureDefinition);
const NavItem = component(navItemDefinition);

variationTest(
	'nav',
	table({
		caption: 'Layout',
		xAxis: {
			_: [null],
		},
		yAxis: {
			content: {
				'items only': {},
				'items + icons': { icon: true },
				'with disclosure (closed)': { disclosure: true },
				'with disclosure (open)': { disclosure: true, open: true },
				'nested disclosures': { nested: true },
			},
		},
		render: ({ content }) => {
			const { icon, disclosure, open, nested } = (content ?? {}) as {
				icon?: boolean;
				disclosure?: boolean;
				open?: boolean;
				nested?: boolean;
			};

			if (nested) {
				return (
					<Nav style="inline-size: 240px;">
						<NavDisclosure label="Settings" icon="gear-line" open>
							<NavItem text="General" href="#" icon="settings-line" />
							<NavDisclosure label="Advanced" open>
								<NavItem text="Security" href="#" />
								<NavItem text="Privacy" href="#" />
							</NavDisclosure>
						</NavDisclosure>
						<NavItem text="Account" href="#" icon="profile-line" />
					</Nav>
				);
			}

			return (
				<Nav style="inline-size: 240px;">
					{disclosure ? (
						<NavDisclosure
							label="Settings"
							icon={icon ? 'gear-line' : undefined}
							open={open}
						>
							<NavItem
								text="General"
								href="#"
								icon={icon ? 'settings-line' : undefined}
							/>
							<NavItem
								text="Notifications"
								href="#"
								icon={icon ? 'notification-line' : undefined}
							/>
						</NavDisclosure>
					) : null}
					<NavItem
						text="Account"
						href="#"
						icon={icon ? 'profile-line' : undefined}
					/>
					<NavItem
						text="Inbox"
						href="#"
						icon={icon ? 'inbox-line' : undefined}
					/>
					<NavItem
						text="Messages"
						href="#"
						icon={icon ? 'chat-line' : undefined}
					/>
				</Nav>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			appearance: {
				ghost: { appearance: 'ghost' },
				'ghost-light': { appearance: 'ghost-light' },
			},
			current: {
				default: {},
				'current item': { current: true },
				'current disclosure': { disclosureCurrent: true },
			},
		},
		render: (variant) => {
			const { connotation, appearance, current, disclosureCurrent } =
				flattenAttrs(variant);
			return (
				<Nav style="inline-size: 240px;">
					<NavDisclosure
						label="Settings"
						icon="gear-line"
						open
						appearance={appearance}
						connotation={connotation}
						current={disclosureCurrent || undefined}
					>
						<NavItem
							text="General"
							href="#"
							icon="settings-line"
							appearance={appearance}
							connotation={connotation}
							current={current || undefined}
						/>
						<NavItem
							text="Notifications"
							href="#"
							icon="notification-line"
							appearance={appearance}
							connotation={connotation}
						/>
					</NavDisclosure>
					<NavItem
						text="Account"
						href="#"
						icon="profile-line"
						appearance={appearance}
						connotation={connotation}
					/>
				</Nav>
			);
		},
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
				<Nav style="inline-size: 240px;">
					<NavDisclosure label="Settings" icon="gear-line" open {...rest}>
						<NavItem text="General" href="#" icon="settings-line" {...rest} />
					</NavDisclosure>
					<NavItem text="Account" href="#" icon="profile-line" {...rest} />
				</Nav>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
