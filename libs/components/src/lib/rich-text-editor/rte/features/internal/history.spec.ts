import { RTECore } from '../core';
import { RTEToolbarFeature } from '../toolbar';
import { RTEFreeformStructure } from '../freeform';
import { setup } from '../../__tests__/test-utils';
import { RTEBoldFeature } from '../bold';

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEBoldFeature(),
	new RTEToolbarFeature(),
];

describe('RTEHistoryFeature', () => {
	it('should undo changes with Mod-z and redo them with Ctrl-y or Cmd+Shift+z', async () => {
		const { typeTextAtCursor, keydown, docStr, selectAll } = await setup(
			features
		);

		await typeTextAtCursor('hello');
		selectAll();
		keydown('b', { ctrl: true }); // Make bold

		expect(docStr()).toBe(`doc(<bold>"hello")`);

		keydown('z', { ctrl: true });
		expect(docStr()).toBe(`doc("hello")`);

		keydown('z', { ctrl: true });
		expect(docStr()).toBe(`doc()`);

		keydown('y', { ctrl: true });
		expect(docStr()).toBe(`doc("hello")`);

		keydown('Z', { cmd: true, shift: true });
		expect(docStr()).toBe(`doc(<bold>"hello")`);
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
		expect(docStr()).toBe(`doc()`);

		toolbarButton('Redo').click();
		expect(docStr()).toBe(`doc("hello")`);
		expect(toolbarButton('Undo').disabled).toBe(false);
		expect(toolbarButton('Redo').disabled).toBe(true);
	});
});
