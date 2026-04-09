import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { statusDefinition } from './definition';

const Status = component(statusDefinition);

variationTest(
	'status',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'title only': { status: 'Status' },
				'title + description': {
					status: 'Status',
					children: <span>Description text</span>,
				},
				'description only': {
					children: <span>Description text</span>,
				},
				'custom icon': {
					status: 'Custom',
					icon: 'home-line',
					children: <span>Description text</span>,
				},
			},
		},
		yAxis: {
			connotation: ['success', 'information', 'warning', 'alert'],
		},
		render: (variant) => <Status {...flattenAttrs(variant)} />,
	})
);
