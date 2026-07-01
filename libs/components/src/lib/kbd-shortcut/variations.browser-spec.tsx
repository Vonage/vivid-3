import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { kbdShortcutDefinition } from './definition';
import { kbdKeyDefinition } from '../kbd-key/definition';

const KbdShortcut = component(kbdShortcutDefinition);
const KbdKey = component(kbdKeyDefinition);

variationTest(
	'kbd-shortcut',
	table({
		caption: 'Layout',
		xAxis: {
			size: ['super-condensed', 'condensed', 'normal', 'expanded'],
		},
		yAxis: {
			shortcut: {
				'single key': {
					keys: (size: string) => <KbdKey name="A" size={size} />,
				},
				'two keys': {
					keys: (size: string) => (
						<>
							<KbdKey name="Mod" keyboard="standard" size={size} />
							<KbdKey name="C" size={size} />
						</>
					),
				},
				'three keys': {
					keys: (size: string) => (
						<>
							<KbdKey name="Control" keyboard="standard" size={size} />
							<KbdKey name="Shift" keyboard="standard" size={size} />
							<KbdKey name="S" size={size} />
						</>
					),
				},
				'four keys': {
					keys: (size: string) => (
						<>
							<KbdKey name="Control" keyboard="standard" size={size} />
							<KbdKey name="Shift" keyboard="standard" size={size} />
							<KbdKey name="Alt" keyboard="standard" size={size} />
							<KbdKey name="S" size={size} />
						</>
					),
				},
			},
		},
		render: ({ size, shortcut }) => {
			const { keys } = shortcut as { keys: (size: string) => unknown };
			return <KbdShortcut>{keys(size as string)}</KbdShortcut>;
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['outlined', 'subtle', 'dropshadow'],
		},
		yAxis: {
			keyboard: {
				standard: 'standard',
				apple: 'apple',
			},
		},
		render: ({ appearance, keyboard }) => (
			<KbdShortcut>
				<KbdKey name="Mod" appearance={appearance} keyboard={keyboard} />
				<KbdKey name="Shift" appearance={appearance} keyboard={keyboard} />
				<KbdKey name="S" appearance={appearance} />
			</KbdShortcut>
		),
	})
);
