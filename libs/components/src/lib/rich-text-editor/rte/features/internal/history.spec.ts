import { RteCore } from '../core';
import { RteToolbarFeature } from '../toolbar';
import { RteFreeformStructure } from '../freeform';
import { setup } from '../../__tests__/test-utils';
import { RteBoldFeature } from '../bold';

const features = [
	new RteCore(),
	new RteFreeformStructure(),
	new RteBoldFeature(),
	new RteToolbarFeature(),
];

describe('RteHistoryFeature', () => {
	it('should undo changes with Mod-z and redo them with Ctrl-y or Cmd+Shift+z', async () => {
		const { typeTextAtCursor, keydown, docStr, selectAll } = await setup(
			features
		);

		await typeTextAtCursor('hello');
		selectAll();
		keydown('b', { ctrl: true }); // Make bold

		expect(docStr()).toMatchInlineSnapshot(`"[textLine(<bold>'hello')|]"`);

		keydown('z', { ctrl: true });
		expect(docStr()).toMatchInlineSnapshot(`"[textLine('hello')|]"`);

		keydown('z', { ctrl: true });
		expect(docStr()).toMatchInlineSnapshot(`"textLine(|)"`);

		keydown('y', { ctrl: true });
		expect(docStr()).toMatchInlineSnapshot(`"[textLine('hello')|]"`);

		keydown('Z', { cmd: true, shift: true });
		expect(docStr()).toMatchInlineSnapshot(`"[textLine(<bold>'hello')|]"`);
	});

	it('should add undo and redo buttons to the toolbar that are disabled when the action is not possible', async () => {
		const { toolbarButton, typeTextAtCursor, docStr } = await setup(features);

		expect(toolbarButton('Undo').disabled).toBe(true);
		expect(toolbarButton('Redo').disabled).toBe(true);

		await typeTextAtCursor('hello');

		expect(toolbarButton('Undo').disabled).toBe(false);
		expect(toolbarButton('Redo').disabled).toBe(true);

		toolbarButton('Undo').click();

		expect(toolbarButton('Undo').disabled).toBe(true);
		expect(toolbarButton('Redo').disabled).toBe(false);
		expect(docStr()).toMatchInlineSnapshot(`"textLine(|)"`);

		toolbarButton('Redo').click();
		expect(docStr()).toMatchInlineSnapshot(`"textLine('hello|')"`);
		expect(toolbarButton('Undo').disabled).toBe(false);
		expect(toolbarButton('Redo').disabled).toBe(true);
	});
});
