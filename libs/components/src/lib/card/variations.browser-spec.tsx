import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { cardDefinition } from './definition';

const Card = component(cardDefinition);

variationTest(
	'card',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				'headline only': { headline: 'Card Headline' },
				'headline + subtitle': {
					headline: 'Card Headline',
					subtitle: 'Subtitle text',
				},
				'headline + subtitle + text': {
					headline: 'Card Headline',
					subtitle: 'Subtitle text',
					text: 'Card body text content.',
				},
				'headline + icon': {
					headline: 'Card Headline',
					icon: 'chat-line',
				},
				'headline + icon + subtitle': {
					headline: 'Card Headline',
					subtitle: 'Subtitle text',
					icon: 'chat-line',
				},
			},
		},
		yAxis: {
			slots: {
				'no slots': {},
				'with body': {
					children: <div slot="body">Body slot content</div>,
				},
				'with footer': {
					children: <div slot="footer">Footer slot content</div>,
				},
				'with body + footer': {
					children: (
						<>
							<div slot="body">Body slot content</div>
							<div slot="footer">Footer slot content</div>
						</>
					),
				},
			},
		},
		render: (variant) => (
			<Card style="inline-size: 280px;" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['elevated', 'outlined', 'ghost'],
		},
		yAxis: {
			elevation: {
				default: {},
				'elevation 2': { elevation: '2' },
				'elevation 8': { elevation: '8' },
				'elevation 16': { elevation: '16' },
			},
		},
		render: (variant) => (
			<Card
				headline="Card Headline"
				subtitle="Subtitle text"
				icon="chat-line"
				style="inline-size: 280px;"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['elevated', 'outlined', 'ghost'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, ...rest }) => {
			const card = (
				<Card
					headline="Card Headline"
					subtitle="Subtitle text"
					clickable-card
					style="inline-size: 280px;"
					{...rest}
				/>
			);

			if (!state) return card;
			return renderIsolated(card, { setup: state });
		},
	})
);
