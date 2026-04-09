import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { menuDefinition } from './definition';
import { menuItemDefinition } from '../menu-item/definition';
import { buttonDefinition } from '../button/definition';

const Menu = component(menuDefinition);
const MenuItem = component(menuItemDefinition);
const Button = component(buttonDefinition);

const basicItems = (
	<>
		<MenuItem text="Menu item 1" icon="file-pdf-line" />
		<MenuItem text="Menu item 2" icon="file-image-line" />
		<MenuItem text="Menu item 3" icon="file-code-line" />
	</>
);

variationTest(
	'menu',
	table({
		caption: 'Layout',
		xAxis: {
			_: [null],
		},
		yAxis: {
			content: {
				'basic items': {},
				'with header': {
					header: true,
				},
				'with action-items': {
					actionItems: true,
				},
				'header + action-items': {
					header: true,
					actionItems: true,
				},
				'with anchor': {
					anchor: true,
				},
			},
		},
		render: ({ content }) => {
			const { header, actionItems, anchor } = (content ?? {}) as {
				header?: boolean;
				actionItems?: boolean;
				anchor?: boolean;
			};
			return (
				<div style="position: relative; min-block-size: 250px; inline-size: 300px;">
					<Menu open aria-label="Menu example" placement="bottom-start">
						{anchor ? (
							<Button slot="anchor" label="Toggle Menu" appearance="outlined" />
						) : null}
						{header ? (
							<span
								slot="header"
								style="padding: 8px; display: block; font-weight: bold;"
							>
								Header
							</span>
						) : null}
						{basicItems}
						{actionItems ? (
							<>
								<Button
									slot="action-items"
									appearance="outlined"
									label="Cancel"
								/>
								<Button slot="action-items" appearance="filled" label="Apply" />
							</>
						) : null}
					</Menu>
				</div>
			);
		},
	}),
	table({
		caption: 'Menu Item Variants',
		xAxis: {
			'control-type': {
				menuitem: {},
				checkbox: { 'control-type': 'checkbox' },
				radio: { 'control-type': 'radio' },
			},
		},
		yAxis: {
			state: {
				unchecked: {},
				checked: { checked: true },
				disabled: { disabled: true },
			},
		},
		render: (variant) => (
			<div style="position: relative; min-block-size: 180px; inline-size: 250px;">
				<Menu open aria-label="Menu example" placement="bottom-start">
					<MenuItem
						text="Menu item 1"
						icon="file-pdf-line"
						{...flattenAttrs(variant)}
					/>
					<MenuItem
						text="Menu item 2"
						icon="file-image-line"
						{...flattenAttrs(variant)}
					/>
					<MenuItem text="Menu item 3" icon="file-code-line" />
				</Menu>
			</div>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			_: [null],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state }) => {
			const el = (
				<div style="position: relative; min-block-size: 200px; inline-size: 250px;">
					<Menu open aria-label="Menu example" placement="bottom-start">
						<MenuItem text="Menu item 1" icon="file-pdf-line" />
						<MenuItem text="Menu item 2" icon="file-png-line" />
						<MenuItem text="Menu item 3" icon="file-csv-line" />
					</Menu>
				</div>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
