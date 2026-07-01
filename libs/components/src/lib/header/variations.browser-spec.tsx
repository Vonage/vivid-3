import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { headerDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Header = component(headerDefinition);
const Button = component(buttonDefinition);

variationTest(
	'header',
	table({
		caption: 'Layout',
		xAxis: {
			alternate: {
				default: false,
				alternate: true,
			},
			content: {
				'text only': { children: <span>App Title</span> },
				'with action items': {
					children: (
						<>
							<span>App Title</span>
							<Button
								slot="action-items"
								icon="user-line"
								aria-label="Profile"
								appearance="filled"
							/>
						</>
					),
				},
			},
		},
		yAxis: {
			background: {
				default: {},
				'custom color': {
					style: '--header-bg-color: var(--vvd-color-neutral-200);',
				},
			},
			'elevation-shadow': {
				default: false,
				'elevation-shadow': true,
			},
		},
		render: (variant) => <Header {...flattenAttrs(variant)} />,
	})
);
