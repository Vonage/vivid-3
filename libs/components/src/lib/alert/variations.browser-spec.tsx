import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { alertDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Alert = component(alertDefinition);
const Button = component(buttonDefinition);

variationTest(
	'alert',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'text only': { text: 'Alert text' },
				'headline only': { headline: 'Headline' },
				'headline + text': { headline: 'Headline', text: 'Alert text' },
				'custom icon': {
					headline: 'Headline',
					text: 'Alert text',
					icon: 'home-line',
				},
			},
		},
		yAxis: {
			extras: {
				default: {},
				'with action items': {
					children: (
						<Button slot="action-items" appearance="outlined" label="Action" />
					),
				},
			},
			removable: {
				default: {},
				removable: true,
			},
		},
		render: (variant) => (
			<Alert
				open
				strategy="static"
				connotation="accent"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			content: {
				'headline + text': {},
			},
		},
		yAxis: {
			connotation: [
				'accent',
				'information',
				'success',
				'warning',
				'announcement',
				'alert',
			],
		},
		render: (variant) => (
			<Alert
				open
				strategy="static"
				headline="Headline"
				text="Alert text"
				removable
				{...flattenAttrs(variant)}
			>
				<Button slot="action-items" appearance="outlined" label="Action" />
			</Alert>
		),
	})
);
