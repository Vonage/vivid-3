import { elementUpdated } from '@repo/shared';
import { TextSelection } from 'prosemirror-state';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import {
	type KeyboardShortcutHandler,
	RteKeyboardShortcutsFeature,
} from './keyboard-shortcuts';

const { paragraph: p } = docFactories;

const escapeDeselectShortcuts: Record<string, KeyboardShortcutHandler> = {
	Escape: (state, dispatch) => {
		if (state.selection.empty) return false;
		dispatch?.(
			state.tr.setSelection(TextSelection.create(state.doc, state.selection.to))
		);
		return true;
	},
	Tab: () => true,
};

describe('RteKeyboardShortcutsFeature', () => {
	it('should prevent default when handler returns true (no-arg)', async () => {
		const { placeCursor, keydown, docStr, element } = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('prevent-enter', {
					shortcuts: { Enter: () => true },
				}),
			],
			[p('Hello world')]
		);

		placeCursor('Hello| world');
		keydown('Enter');
		await elementUpdated(element);

		expect(docStr()).toBe(`paragraph('Hello| world')`);
	});

	it('should prevent default when handler returns true (Command)', async () => {
		const { placeCursor, keydown, docStr, element } = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('prevent-enter-cmd', {
					shortcuts: {
						Enter: (_state, _dispatch) => true,
					},
				}),
			],
			[p('Hello world')]
		);

		placeCursor('Hello| world');
		keydown('Enter');
		await elementUpdated(element);

		expect(docStr()).toBe(`paragraph('Hello| world')`);
	});

	it('should allow default when handler returns false', async () => {
		const { placeCursor, keydown, docStr, element } = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('allow-enter', {
					shortcuts: { Enter: () => false },
				}),
			],
			[p('Hello world')]
		);

		placeCursor('Hello| world');
		keydown('Enter');
		await elementUpdated(element);

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello'), paragraph('| world')"`
		);
	});

	it('should support multiple key bindings', async () => {
		const shiftEnter = 'Shift-Enter';
		const { placeCursor, keydown, docStr, element } = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('multi', {
					shortcuts: {
						Enter: () => true,
						[shiftEnter]: () => true,
					},
				}),
			],
			[p('Line one')]
		);

		placeCursor('Line |one');
		keydown('Enter');
		await elementUpdated(element);
		expect(docStr()).toBe(`paragraph('Line |one')`);

		placeCursor('Line |one');
		keydown('Enter', { shift: true });
		await elementUpdated(element);
		expect(docStr()).toBe(`paragraph('Line |one')`);
	});

	describe('Escape collapses selection and Tab prevent default', () => {
		const features = [
			new RteBase(),
			new RteKeyboardShortcutsFeature('escape-deselect', {
				shortcuts: escapeDeselectShortcuts,
			}),
		];

		it('should collapse selection to cursor on Escape', async () => {
			const { selectText, keydown, docStr, element } = await setup(features, [
				p('Hello world'),
			]);

			selectText('He[llo] world');
			expect(docStr()).toBe(`paragraph('He[llo|] world')`);

			keydown('Escape');
			await elementUpdated(element);

			expect(docStr()).toBe(`paragraph('Hello| world')`);
		});

		it('should not change cursor when selection is already empty and Escape is pressed', async () => {
			const { placeCursor, keydown, docStr, element } = await setup(features, [
				p('Hello world'),
			]);

			placeCursor('Hello| world');
			keydown('Escape');
			await elementUpdated(element);

			expect(docStr()).toBe(`paragraph('Hello| world')`);
		});

		it('should prevent default Tab behavior', async () => {
			const { placeCursor, keydown, docStr, element } = await setup(features, [
				p('Hello world'),
			]);

			placeCursor('Hello| world');
			keydown('Tab');
			await elementUpdated(element);

			expect(docStr()).toBe(`paragraph('Hello| world')`);
		});
	});
});
