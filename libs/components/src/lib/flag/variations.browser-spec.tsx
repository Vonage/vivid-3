import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { flagDefinition } from './definition';

const Flag = component(flagDefinition);

variationTest(
	'flag',
	table({
		caption: 'Layout',
		xAxis: {
			label: {
				'no label': null,
				label: 'United States',
			},
		},
		yAxis: {
			size: [-6, -4, -2, 0, 2, 4],
		},
		render: (variant) => <Flag code="US" {...variant} />,
	})
);
