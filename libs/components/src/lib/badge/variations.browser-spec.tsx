import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { badgeDefinition } from './definition';

const Badge = component(badgeDefinition);

variationTest(
	'badge',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'text only': { text: 'Badge' },
				'text + icon': { text: 'Badge', icon: 'user-line' },
				'icon only': { icon: 'user-line' },
				'text + icon trailing': {
					text: 'Badge',
					icon: 'user-line',
					'icon-trailing': true,
				},
			},
		},
		yAxis: {
			shape: ['rounded', 'pill'],
			size: ['normal', 'expanded'],
		},
		render: (variant) => <Badge {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: [
				'accent',
				'cta',
				'information',
				'announcement',
				'success',
				'warning',
				'alert',
			],
		},
		yAxis: {
			appearance: ['filled', 'subtle', 'subtle-light', 'duotone'],
		},
		render: (variant) => <Badge text="Text" icon="user-line" {...variant} />,
	})
);
