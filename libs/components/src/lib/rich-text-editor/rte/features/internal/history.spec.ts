import { RteBase } from '../base';
import { RteToolbarFeature } from '../toolbar';
import { setup } from '../../__tests__/test-utils';
import { RteBoldFeature } from '../bold';

const features = [new RteBase(), new RteBoldFeature(), new RteToolbarFeature()];

describe('RteHistoryFeature', () => {
	it('should undo changes with Mod-z and redo them with Ctrl-y or Cmd+Shift+z', async () => {
		const rte = await setup(features);

		await rte.typeTextAtCursor('hello');
		rte.selectAll();
		rte.keydown('b', { ctrl: true }); // Make bold

		expect(rte.docStr()).toMatchInlineSnapshot(`"[paragraph(<bold>'hello')|]"`);

		rte.keydown('z', { ctrl: true });
		expect(rte.docStr()).toMatchInlineSnapshot(`"[paragraph('hello')|]"`);

		rte.keydown('z', { ctrl: true });
		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(|)"`);

		rte.keydown('y', { ctrl: true });
		expect(rte.docStr()).toMatchInlineSnapshot(`"[paragraph('hello')|]"`);

		rte.keydown('Z', { cmd: true, shift: true });
		expect(rte.docStr()).toMatchInlineSnapshot(`"[paragraph(<bold>'hello')|]"`);
	});

	it('should add undo and redo buttons to the toolbar that are disabled when the action is not possible', async () => {
		const rte = await setup(features);

		expect(rte.toolbarButton('Undo').disabled).toBe(true);
		expect(rte.toolbarButton('Redo').disabled).toBe(true);

		await rte.typeTextAtCursor('hello');

		expect(rte.toolbarButton('Undo').disabled).toBe(false);
		expect(rte.toolbarButton('Redo').disabled).toBe(true);

		rte.toolbarButton('Undo').click();

		expect(rte.toolbarButton('Undo').disabled).toBe(true);
		expect(rte.toolbarButton('Redo').disabled).toBe(false);
		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(|)"`);

		rte.toolbarButton('Redo').click();
		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('hello|')"`);
		expect(rte.toolbarButton('Undo').disabled).toBe(false);
		expect(rte.toolbarButton('Redo').disabled).toBe(true);
	});
});
