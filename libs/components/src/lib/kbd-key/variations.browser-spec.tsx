import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { kbdKeyDefinition } from './definition';

const KbdKey = component(kbdKeyDefinition);

variationTest(
	'kbd-key',
	table({
		caption: 'Layout',
		xAxis: {
			size: ['super-condensed', 'condensed', 'normal', 'expanded'],
		},
		yAxis: {
			content: {
				'letter (A)': { name: 'A' },
				'symbol (Enter)': { name: 'Enter' },
				'text label (Escape)': { name: 'Escape' },
				'custom text': { name: 'Custom', children: 'F1' },
			},
		},
		render: (variant) => (
			<KbdKey appearance="outlined" {...flattenAttrs(variant)} />
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['outlined', 'subtle', 'dropshadow'],
		},
		yAxis: {
			key: {
				'letter (A)': { name: 'A' },
				'Mod (standard)': { name: 'Mod', keyboard: 'standard' },
				'Mod (apple)': { name: 'Mod', keyboard: 'apple' },
				'custom text': { name: 'Custom', children: 'F1' },
			},
		},
		render: (variant) => <KbdKey size="normal" {...flattenAttrs(variant)} />,
	})
);
