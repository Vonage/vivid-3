import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { emptyStateDefinition } from './definition';
import { buttonDefinition } from '../button/definition';

const EmptyState = component(emptyStateDefinition);
const Button = component(buttonDefinition);

variationTest(
	'empty-state',
	table({
		caption: 'Layout',
		xAxis: {
			graphic: {
				'no graphic': { icon: null },
				icon: { icon: 'search-line' },
				'graphic slot': { icon: null, hasGraphicSlot: true },
			},
		},
		yAxis: {
			content: {
				'headline only': {
					headline: 'No results found',
					hasBody: false,
					hasActions: false,
				},
				'headline + body': {
					headline: 'No results found',
					hasBody: true,
					hasActions: false,
				},
				'headline + body + actions': {
					headline: 'No results found',
					hasBody: true,
					hasActions: true,
				},
				'body only': {
					headline: null,
					hasBody: true,
					hasActions: false,
				},
			},
		},
		render: (variant) => {
			const { icon, hasGraphicSlot } = variant.graphic;
			const { headline, hasBody, hasActions } = variant.content;
			return (
				<EmptyState icon={icon} headline={headline}>
					{hasGraphicSlot && (
						<div
							slot="graphic"
							style="width:64px;height:64px;background:var(--vvd-color-neutral-200);border-radius:8px;"
						/>
					)}
					{hasBody && 'You have no results yet.'}
					{hasActions && (
						<Button
							slot="action-items"
							label="Take action"
							appearance="filled"
						/>
					)}
				</EmptyState>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: [
				'accent',
				'cta',
				'success',
				'alert',
				'warning',
				'information',
			],
		},
		yAxis: {
			children: {
				'icon + headline + body': 'You have no results yet.',
			},
		},
		render: (variant) => (
			<EmptyState icon="search-line" headline="No results found" {...variant} />
		),
	})
);
