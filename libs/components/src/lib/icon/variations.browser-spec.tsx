import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { iconDefinition } from './definition';

const Icon = component(iconDefinition);

variationTest(
	'icon',
	table({
		caption: 'Layout',
		xAxis: {
			style: {
				'small font-size': 'font-size: 14px',
				'large font-size': 'font-size: 20px',
			},
		},
		yAxis: {
			size: [
				'-6',
				'-5',
				'-4',
				'-3',
				'-2',
				'-1',
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				null,
			],
		},
		render: (variant) => <Icon name="heart-line" {...variant} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: [
				'accent',
				'cta',
				'success',
				'alert',
				'warning',
				'information',
				'announcement',
			],
		},
		yAxis: {
			name: {
				'line icon': 'heart-line',
				'solid icon': 'heart-solid',
			},
		},
		render: (variant) => <Icon {...variant} />,
	})
);
