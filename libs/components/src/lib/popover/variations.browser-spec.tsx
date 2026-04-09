import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { renderIsolated } from '@repo/browser-tests/render-isolated';
import { popoverDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Popover = component(popoverDefinition);
const Button = component(buttonDefinition);

variationTest(
	'popover',
	table({
		caption: 'Layout',
		xAxis: {
			layout: {
				default: {},
				condensed: { layout: 'condensed' },
			},
			manual: {
				default: {},
				'dismiss button': true,
			},
		},
		yAxis: {
			footer: {
				'no footer': {},
				footer: { footer: <div slot="footer">Footer content</div> },
			},
			arrow: {
				default: {},
				arrow: true,
			},
		},
		render: (variant) => {
			const { footer, ...props } = flattenAttrs(variant);
			return renderIsolated(
				<Popover open aria-label="Popover" {...props}>
					<Button slot="anchor" label="Anchor" appearance="filled" />
					<div>Popover content.</div>
					{footer}
				</Popover>,
				{ center: true }
			);
		},
	})
);
