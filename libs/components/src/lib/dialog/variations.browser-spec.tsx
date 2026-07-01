import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { renderIsolated } from '@repo/browser-tests/render-isolated';
import { dialogDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const Dialog = component(dialogDefinition);
const Button = component(buttonDefinition);

const wrapperStyle =
	'position: relative; min-block-size: 250px; inline-size: 320px;';

variationTest(
	'dialog',
	table({
		caption: 'Layout',
		xAxis: {
			'icon-placement': {
				'no icon': {},
				'icon side': { icon: 'info-line', 'icon-placement': 'side' },
				'icon top': { icon: 'info-line', 'icon-placement': 'top' },
			},
		},
		yAxis: {
			content: {
				'headline only': { headline: 'Headline' },
				'headline + subtitle': {
					headline: 'Headline',
					subtitle: 'Subtitle text',
				},
				'headline + body': {
					headline: 'Headline',
					children: <div slot="body">Body content goes here.</div>,
				},
				'headline + action-items': {
					headline: 'Headline',
					children: (
						<>
							<div slot="body">Body content goes here.</div>
							<Button
								slot="action-items"
								appearance="outlined"
								label="Cancel"
							/>
							<Button slot="action-items" appearance="filled" label="Confirm" />
						</>
					),
				},
				'headline + footer': {
					headline: 'Headline',
					children: (
						<>
							<div slot="body">Body content goes here.</div>
							<div slot="footer">Footer content</div>
						</>
					),
				},
			},
		},
		render: (variant) => {
			const { children, ...attrs } = flattenAttrs(variant);
			return renderIsolated(
				<div style={wrapperStyle}>
					<Dialog open {...attrs}>
						{children}
					</Dialog>
				</div>,
				{}
			);
		},
	}),
	table({
		caption: 'Modal',
		xAxis: {
			_: [null],
		},
		yAxis: {
			_: [null],
		},
		render: () =>
			renderIsolated(
				<div style={wrapperStyle}>
					<Dialog
						modal
						open
						icon="info-line"
						headline="Headline"
						subtitle="Subtitle text"
					>
						<div slot="body">Body content goes here.</div>
						<Button slot="action-items" appearance="filled" label="Confirm" />
					</Dialog>
				</div>,
				{}
			),
	})
);
