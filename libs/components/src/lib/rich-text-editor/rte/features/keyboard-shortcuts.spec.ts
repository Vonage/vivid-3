import { elementUpdated } from '@repo/shared';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import type { RteInstance } from '../instance';
import { RteBase } from './base';
import {
	type KeyboardShortcutHandler,
	RteKeyboardShortcutsFeature,
} from './keyboard-shortcuts';

const { paragraph: p } = docFactories;

const escapeDeselectShortcuts: Record<string, KeyboardShortcutHandler> = {
	Tab: () => true,
};

describe('RteKeyboardShortcutsFeature', () => {
	it('should prevent default when handler returns true (no-arg)', async () => {
		const rte = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('prevent-enter', {
					shortcuts: { Enter: () => true },
				}),
			],
			[p('Hello world')]
		);

		rte.placeCursor('Hello| world');
		rte.keydown('Enter');
		await elementUpdated(rte.element);

		expect(rte.docStr()).toBe(`paragraph('Hello| world')`);
	});

	it('should prevent default when handler returns true (rteInstance)', async () => {
		const rte = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('prevent-enter-cmd', {
					shortcuts: {
						Enter: (rteInstance: RteInstance) => true,
					},
				}),
			],
			[p('Hello world')]
		);

		rte.placeCursor('Hello| world');
		rte.keydown('Enter');
		await elementUpdated(rte.element);

		expect(rte.docStr()).toBe(`paragraph('Hello| world')`);
	});

	it('should allow default when handler returns false', async () => {
		const rte = await setup(
			[
				new RteBase(),
				new RteKeyboardShortcutsFeature('allow-enter', {
					shortcuts: { Enter: () => false },
				}),
			],
			[p('Hello world')]
		);

		rte.placeCursor('Hello| world');
		rte.keydown('Enter');
		await elementUpdated(rte.element);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello'), paragraph('| world')"`
		);
	});

	it('should support multiple key bindings', async () => {
		const shiftEnter = 'Shift-Enter';
		const rte = await setup(
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

		rte.placeCursor('Line |one');
		rte.keydown('Enter');
		await elementUpdated(rte.element);
		expect(rte.docStr()).toBe(`paragraph('Line |one')`);

		rte.placeCursor('Line |one');
		rte.keydown('Enter', { shift: true });
		await elementUpdated(rte.element);
		expect(rte.docStr()).toBe(`paragraph('Line |one')`);
	});

	describe('Tab prevent default', () => {
		const features = [
			new RteBase(),
			new RteKeyboardShortcutsFeature('escape-deselect', {
				shortcuts: escapeDeselectShortcuts,
			}),
		];

		it('should prevent default Tab behavior', async () => {
			const rte = await setup(features, [p('Hello world')]);

			rte.placeCursor('Hello| world');
			rte.keydown('Tab');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toBe(`paragraph('Hello| world')`);
		});
	});
});
