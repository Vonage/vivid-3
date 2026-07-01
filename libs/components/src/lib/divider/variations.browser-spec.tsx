import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { dividerDefinition } from './definition';

const Divider = component(dividerDefinition);

variationTest(
	'divider',
	table({
		caption: 'Layout',
		xAxis: {
			orientation: ['horizontal', 'vertical'],
		},
		yAxis: {
			appearance: ['ghost', 'subtle'],
		},
		render: (variant) => (
			<div
				style={
					variant.orientation === 'vertical'
						? 'display: flex; block-size: 40px;'
						: 'inline-size: 200px;'
				}
			>
				<Divider {...variant} />
			</div>
		),
	})
);
