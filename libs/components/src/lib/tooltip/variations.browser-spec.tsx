import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { renderIsolated } from '@repo/browser-tests/render-isolated';
import { tooltipDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Tooltip = component(tooltipDefinition);
const Button = component(buttonDefinition);

variationTest(
	'tooltip',
	table({
		caption: 'Placement',
		xAxis: {
			placement: ['top', 'bottom', 'left', 'right'],
		},
		yAxis: {
			text: {
				short: 'Tip',
				long: 'Some long text that will wrap onto another line',
			},
		},
		render: async (variant) =>
			renderIsolated(
				<Tooltip {...variant}>
					<Button slot="anchor" appearance="outlined" label="Anchor" />
				</Tooltip>,
				{
					setup: (ctrl) => ctrl.hover(),
					center: true,
				}
			),
	})
);
