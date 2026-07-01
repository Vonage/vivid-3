import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { bannerDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Banner = component(bannerDefinition);
const Button = component(buttonDefinition);

variationTest(
	'banner',
	table({
		caption: 'Layout',
		xAxis: {
			extras: {
				default: {},
				'action items': {
					children: (
						<Button slot="action-items" appearance="outlined" label="Action" />
					),
				},
				removable: { removable: true },
				'action items + removable': {
					removable: true,
					children: (
						<Button slot="action-items" appearance="outlined" label="Action" />
					),
				},
			},
		},
		yAxis: {
			icon: {
				'default icon': {},
				'custom icon': { icon: 'home-line' },
			},
		},
		render: (variant) => (
			<Banner text="Banner message" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: [
				'information',
				'announcement',
				'success',
				'warning',
				'alert',
			],
		},
		yAxis: {
			default: [null],
		},
		render: (variant) => (
			<Banner text="Banner message" removable {...flattenAttrs(variant)} />
		),
	})
);
