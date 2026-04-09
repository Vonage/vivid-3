import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { avatarDefinition } from './definition';

const Avatar = component(avatarDefinition);

variationTest(
	'avatar',
	table({
		caption: 'Layout',
		xAxis: {
			content: {
				icon: 'icon',
				initials: 'initials',
			},
			shape: ['rounded', 'pill'],
		},
		yAxis: {
			size: ['condensed', 'normal', 'expanded'],
		},
		render: (variant) => {
			const { content, ...attrs } = variant;
			if (content === 'icon') {
				return <Avatar icon="user-line" {...attrs} />;
			}
			return <Avatar initials="JD" {...attrs} />;
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			appearance: ['filled', 'outlined', 'duotone', 'subtle'],
		},
		render: (variant) => <Avatar icon="user-line" {...variant} />,
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['filled', 'outlined', 'duotone', 'subtle'],
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
			const avatar = <Avatar icon="user-line" {...rest} />;

			if (!state) return avatar;
			return renderIsolated(avatar, { setup: state });
		},
	})
);
