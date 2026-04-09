import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { noteDefinition } from './definition';

const Note = component(noteDefinition);

variationTest(
	'note',
	table({
		caption: 'Layout',
		xAxis: {
			icon: {
				'no icon': null,
				'with icon': 'info-line',
			},
		},
		yAxis: {
			content: {
				'headline only': { headline: 'Note Headline' },
				'headline + body': {
					headline: 'Note Headline',
					children: <p>Body text content</p>,
				},
				'body only': { children: <p>Body text content</p> },
			},
		},
		render: (variant) => <Note {...flattenAttrs(variant)} />,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: [
				'accent',
				'information',
				'success',
				'warning',
				'announcement',
				'alert',
			],
		},
		yAxis: {
			children: {
				'headline + body + icon': <p>Body text content</p>,
			},
		},
		render: (variant) => (
			<Note headline="Note Headline" icon="info-line" {...variant} />
		),
	})
);
