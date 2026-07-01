import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { renderIsolated } from '@repo/browser-tests/render-isolated';
import { toggletipDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Toggletip = component(toggletipDefinition);
const Button = component(buttonDefinition);

const anchor = (
	<Button
		slot="anchor"
		shape="pill"
		appearance="filled"
		icon="help-line"
		aria-label="Help"
	/>
);

variationTest(
	'toggletip',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'headline only': { headline: 'Headline' },
				'body only': { body: <p>Toggletip body content</p> },
				'headline + body': {
					headline: 'Headline',
					body: <p>Toggletip body content</p>,
				},
				'headline + body + actions': {
					headline: 'Headline',
					body: <p>Toggletip body content</p>,
					actions: (
						<Button slot="action-items" label="Action" appearance="ghost" />
					),
				},
			},
		},
		yAxis: {
			placement: ['bottom', 'right'],
		},
		render: async (variant) => {
			const { placement, headline, body, actions } = flattenAttrs(variant);
			return renderIsolated(
				<Toggletip open placement={placement} headline={headline}>
					{anchor}
					{body}
					{actions}
				</Toggletip>,
				{ center: true }
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			alternate: { default: false, alternate: true },
		},
		yAxis: {
			placement: ['bottom', 'right'],
		},
		render: async ({ alternate, placement }) =>
			renderIsolated(
				<Toggletip
					open
					headline="Headline"
					placement={placement}
					alternate={alternate}
				>
					{anchor}
					<p>Toggletip body content</p>
					<Button slot="action-items" label="Action" appearance="ghost" />
				</Toggletip>,
				{ center: true }
			),
	})
);
