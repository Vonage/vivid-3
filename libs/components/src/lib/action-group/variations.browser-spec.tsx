import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { actionGroupDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const ActionGroup = component(actionGroupDefinition);
const Button = component(buttonDefinition);

variationTest(
	'action-group',
	table({
		caption: 'Layout',
		xAxis: {
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			tight: { default: false, tight: true },
			appearance: ['fieldset', 'ghost'],
		},
		render: (variant) => (
			<ActionGroup {...variant}>
				<Button label="Edit" shape={variant.shape} />
				<Button label="Copy" shape={variant.shape} />
				<Button label="Paste" shape={variant.shape} />
			</ActionGroup>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['fieldset', 'ghost'],
		},
		yAxis: {
			content: {
				'text buttons': {
					children: (
						<>
							<Button label="Edit" />
							<Button label="Copy" />
							<Button label="Paste" />
						</>
					),
				},
				'icon buttons': {
					children: (
						<>
							<Button icon="compose-line" aria-label="Edit" />
							<Button icon="copy-line" aria-label="Copy" />
							<Button icon="delete-line" aria-label="Delete" />
						</>
					),
				},
				'filled buttons': {
					children: (
						<>
							<Button label="Edit" appearance="filled" />
							<Button label="Copy" appearance="filled" />
							<Button label="Paste" appearance="filled" />
						</>
					),
				},
			},
		},
		render: (variant) => <ActionGroup {...flattenAttrs(variant)} />,
	})
);
