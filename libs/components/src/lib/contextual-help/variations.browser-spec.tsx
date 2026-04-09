import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { contextualHelpDefinition } from './definition';
import { iconDefinition } from '../icon/definition';

const ContextualHelp = component(contextualHelpDefinition);
const Icon = component(iconDefinition);

variationTest(
	'contextual-help',
	table({
		caption: 'Layout',
		xAxis: {
			icon: {
				'default icon': {},
				'custom icon': {
					customIcon: <Icon slot="icon" name="info-solid" />,
				},
			},
		},
		yAxis: {
			_: { default: {} },
		},
		render: (variant) => (
			<ContextualHelp>
				{variant.icon?.customIcon}
				Help text content
			</ContextualHelp>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			_: { default: {} },
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
				open: (ctrl: SampleControls) => ctrl.click(),
			},
		},
		render: async ({ state }) => {
			const el = (
				<ContextualHelp placement="bottom">Help text content</ContextualHelp>
			);

			if (!state) return el;
			return renderIsolated(el, { setup: state, center: true });
		},
	})
);
