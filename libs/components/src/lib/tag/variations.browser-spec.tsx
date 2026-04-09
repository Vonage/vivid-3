import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { tagDefinition } from './definition';
import { tagGroupDefinition } from '../tag-group/definition';

const Tag = component(tagDefinition);
const TagGroup = component(tagGroupDefinition);

const renderTag = (attrs: Record<string, unknown>) => (
	<TagGroup>
		<Tag {...flattenAttrs(attrs)} />
	</TagGroup>
);

variationTest(
	'tag',
	table({
		caption: 'Layout',
		xAxis: {
			shape: ['rounded', 'pill'],
			content: {
				label: { label: 'Tag' },
				'label + icon': { label: 'Tag', icon: 'user-line' },
				'icon only': { icon: 'user-line' },
			},
		},
		yAxis: {
			kind: {
				default: {},
				selected: { selectable: true, selected: true },
				removable: { removable: true },
			},
		},
		render: renderTag,
	}),
	table({
		caption: 'Visual',
		xAxis: {
			layout: {
				removable: { label: 'Tag', icon: 'user-line', removable: true },
				selected: {
					label: 'Tag',
					icon: 'user-line',
					selectable: true,
					selected: true,
				},
			},
			connotation: [
				'accent',
				'cta',
				'information',
				'announcement',
				'success',
				'warning',
				'alert',
			],
		},
		yAxis: {
			disabled: { default: false, disabled: true },
			appearance: ['subtle', 'subtle-light', 'duotone'],
		},
		render: renderTag,
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			layout: {
				removable: { label: 'Tag', icon: 'user-line', removable: true },
				selected: {
					label: 'Tag',
					icon: 'user-line',
					selectable: true,
					selected: true,
				},
			},
			appearance: ['duotone', 'subtle', 'subtle-light'],
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: ({ state, ...rest }) => {
			const tag = renderTag(rest);

			if (!state) return tag;
			return renderIsolated(tag, { setup: state });
		},
	})
);
