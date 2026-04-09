import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { sideDrawerDefinition } from './definition';

const SideDrawer = component(sideDrawerDefinition);

const drawerContent = <p style="padding: 12px; margin: 0;">Drawer content</p>;
const appContent = (
	<p slot="app-content" style="padding: 12px; margin: 0;">
		App content area. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</p>
);

// transform: translateZ(0) creates a containing block for position:fixed children,
// preventing the drawer panel from escaping to the viewport edges.
// overflow: hidden ensures closed drawers (translated off-screen) are not visible.
const wrapperStyle =
	'inline-size: 400px; block-size: 200px; overflow: hidden; transform: translateZ(0);';

variationTest(
	'side-drawer',
	table({
		caption: 'Layout',
		xAxis: {
			trailing: { 'leading (default)': false, trailing: true },
		},
		yAxis: {
			state: {
				open: { open: true },
				closed: {},
				modal: { open: true, modal: true },
			},
		},
		render: (variant) => (
			<div style={wrapperStyle}>
				<SideDrawer {...flattenAttrs(variant)}>
					{drawerContent}
					{appContent}
				</SideDrawer>
			</div>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			alternate: { default: false, alternate: true },
		},
		yAxis: {
			trailing: { 'leading (default)': false, trailing: true },
		},
		render: (variant) => (
			<div style={wrapperStyle}>
				<SideDrawer open {...flattenAttrs(variant)}>
					{drawerContent}
					{appContent}
				</SideDrawer>
			</div>
		),
	})
);
