import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { menuItemDefinition } from './definition';
import { badgeDefinition } from '../badge/definition';
import { kbdShortcutDefinition } from '../kbd-shortcut/definition';
import { kbdKeyDefinition } from '../kbd-key/definition';

const MenuItem = component(menuItemDefinition);
const Badge = component(badgeDefinition);
const KbdShortcut = component(kbdShortcutDefinition);
const KbdKey = component(kbdKeyDefinition);

const metaSlot = (
	<Badge
		slot="meta"
		appearance="subtle"
		connotation="cta"
		shape="pill"
		icon="check-solid"
	/>
);
const trailingMetaSlot = (
	<Badge
		slot="trailing-meta"
		appearance="subtle"
		connotation="cta"
		text="New"
	/>
);
const kbdShortcutSlot = (
	<KbdShortcut slot="kbd-shortcut">
		<KbdKey name="Control" appearance="dropshadow" size="condensed" />
		<KbdKey name="C" appearance="dropshadow" size="condensed" />
	</KbdShortcut>
);
const allSlots = (
	<>
		{metaSlot}
		{trailingMetaSlot}
		{kbdShortcutSlot}
	</>
);

variationTest(
	'menu-item',
	table({
		caption: 'Layout',
		xAxis: {
			'control-type': {
				menuitem: {},
				checkbox: { 'control-type': 'checkbox' },
				radio: { 'control-type': 'radio' },
			},
			'check-appearance': {
				'normal (default)': {},
				'tick-only': { 'check-appearance': 'tick-only' },
			},
		},
		yAxis: {
			content: {
				'text + icon': { text: 'Menu item', icon: 'file-pdf-line' },
				'text + secondary': {
					text: 'Menu item',
					icon: 'file-pdf-line',
					'text-secondary': 'Secondary',
				},
				meta: {
					text: 'Menu item',
					icon: 'file-pdf-line',
					children: metaSlot,
				},
				'trailing-meta': {
					text: 'Menu item',
					icon: 'file-pdf-line',
					children: trailingMetaSlot,
				},
				'kbd-shortcut': {
					text: 'Menu item',
					icon: 'file-pdf-line',
					children: kbdShortcutSlot,
				},
				'all slots': {
					text: 'Menu item',
					icon: 'file-pdf-line',
					'text-secondary': 'Secondary',
					children: allSlots,
				},
			},
			'check-trailing': {
				'leading (default)': {},
				trailing: { 'check-trailing': true },
			},
		},
		render: (variant) => <MenuItem {...flattenAttrs(variant)} />,
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
			'control-type': {
				'checkbox unchecked': { 'control-type': 'checkbox' },
				'checkbox checked': { 'control-type': 'checkbox', checked: true },
				'radio unchecked': { 'control-type': 'radio' },
				'radio checked': { 'control-type': 'radio', checked: true },
			},
		},
		render: (variant) => (
			<MenuItem
				text="Menu item"
				icon="file-pdf-line"
				{...{ 'text-secondary': 'Secondary' }}
				{...flattenAttrs(variant)}
			>
				{metaSlot}
				{trailingMetaSlot}
				{kbdShortcutSlot}
			</MenuItem>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			'control-type': {
				menuitem: {},
				'checkbox unchecked': { 'control-type': 'checkbox' },
				'checkbox checked': { 'control-type': 'checkbox', checked: true },
			},
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
				<MenuItem
					text="Menu item"
					icon="file-pdf-line"
					{...{ 'text-secondary': 'Secondary' }}
					{...flattenAttrs(rest)}
				>
					{metaSlot}
					{trailingMetaSlot}
					{kbdShortcutSlot}
				</MenuItem>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
