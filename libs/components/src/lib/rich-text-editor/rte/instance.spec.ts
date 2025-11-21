import { RTEConfig } from './config';
import { RTECore } from './features/core';
import { RTEFreeformStructure } from './features/freeform';
import { docFactories } from './__tests__/doc-factories';
import { setup } from './__tests__/test-utils';

const { doc, text_line: line, text } = docFactories;
const features = [new RTECore(), new RTEFreeformStructure()];

describe('RTEInstance', () => {
	describe('initialization', () => {
		it('should throw an error when initial document is invalid', async () => {
			const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
			expect(() =>
				config.instantiateEditor({
					initialDocument: doc(text('Top level text')),
				})
			).toThrowErrorMatchingInlineSnapshot(
				`[Error: Document could not be parsed]`
			);
			expect(() =>
				config.instantiateEditor({
					initialDocument: doc(line(line('Nested line'))),
				})
			).toThrowErrorMatchingInlineSnapshot(
				`[RangeError: Invalid content for node text_line: <text_line("Nested line")>]`
			);
		});
	});

	describe('getDocument', () => {
		it('should return the current document', async () => {
			const rte = await setup(features, [line('Hello world')]);
			expect(rte.instance.getDocument()).toEqual(doc(line('Hello world')));
		});
	});

	describe('reset', () => {
		it('should reset the editor', async () => {
			const rte = await setup(features, [line('Hello world')]);
			await rte.typeTextAtCursor('something');
			rte.instance.reset();
			expect(rte.docStr()).toMatchInlineSnapshot(`"text_line(|)"`);
			rte.undo();
			expect(rte.docStr()).toMatchInlineSnapshot(`"text_line(|)"`);
		});

		it('should use an initial document when passed', async () => {
			const rte = await setup(features, [line('Hello world')]);
			await rte.typeTextAtCursor('something');
			rte.instance.reset(doc(line('New document')));
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('|New document')"`
			);
		});
	});

	describe('replaceSelection', () => {
		it('should replace the selection when text is selected', async () => {
			const rte = await setup(features, [line('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')]);
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('Hello wonderful| world')"`
			);
		});

		it('should work with an all selection', async () => {
			const rte = await setup(features, [line('Hello world')]);
			rte.selectAll();
			rte.instance.replaceSelection([text('New world')], {
				cursorPlacement: 'start',
			});
			expect(rte.docStr()).toMatchInlineSnapshot(`"text_line('|New world')"`);
		});

		it('should place cursor at start of inserted content when cursorPlacement=start', async () => {
			const rte = await setup(features, [line('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')], {
				cursorPlacement: 'start',
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('Hello |wonderful world')"`
			);
		});

		it('should select the inserted content when selectContent=true', async () => {
			const rte = await setup(features, [line('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')], {
				selectContent: true,
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('Hello [wonderful|] world')"`
			);
		});

		it('should keep an all selection selectContent=true', async () => {
			const rte = await setup(features, [line('Hello world')]);
			rte.selectAll();
			rte.instance.replaceSelection([text('New world')], {
				selectContent: true,
			});
			expect(rte.docStr()).toMatchInlineSnapshot(`"[text_line('New world')|]"`);
		});

		it('should be undoable', async () => {
			const rte = await setup(features, [line('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')]);
			rte.undo();

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('Hello [beautiful|] world')"`
			);
		});

		it('should throw an error when content is invalid', async () => {
			const rte = await setup(features, [line('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			expect(() =>
				rte.instance.replaceSelection([line(line('nested line'))])
			).toThrowErrorMatchingInlineSnapshot(
				`[RangeError: Invalid content for node text_line: <text_line("nested line")>]`
			);
		});
	});

	describe('replaceDocument', () => {
		it('should replace the document', async () => {
			const rte = await setup(features, [line('Hello world')]);
			rte.instance.replaceDocument(doc(line('New document')));
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('|New document')"`
			);
		});

		it('should place cursor at end of document when cursorPlacement=end', async () => {
			const rte = await setup(features, [line('Hello world')]);
			rte.instance.replaceDocument(doc(line('New document')), {
				cursorPlacement: 'end',
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"text_line('New document|')"`
			);
		});

		it('should select all when selectContent=true', async () => {
			const rte = await setup(features, [line('Hello world')]);
			rte.instance.replaceDocument(doc(line('New document')), {
				selectContent: true,
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"[text_line('New document')|]"`
			);
		});

		it('should be undoable', async () => {
			const rte = await setup(features, [line('Hello world')]);
			rte.instance.replaceDocument(doc(line('New document')));
			rte.undo();
			expect(rte.docStr()).toMatchInlineSnapshot(`"text_line('|Hello world')"`);
		});

		it('should throw an error when document is invalid', async () => {
			const rte = await setup(features, [line('Hello world')]);
			expect(() =>
				rte.instance.replaceDocument(doc(line(line('Nested line'))))
			).toThrowErrorMatchingInlineSnapshot(
				`[RangeError: Invalid content for node text_line: <text_line("Nested line")>]`
			);
		});
	});

	describe('onChange', () => {
		it('should call onChange callback when document changes', async () => {
			const onChange = vitest.fn();
			const rte = await setup(features, [], {
				onChange,
			});
			expect(onChange).not.toHaveBeenCalled();
			await rte.typeTextAtCursor('H');
			expect(onChange).toHaveBeenCalledTimes(1);
			await rte.typeTextAtCursor('e');
			expect(onChange).toHaveBeenCalledTimes(2);
		});
	});

	describe('hostState', () => {
		it('should throw an error when host state has not been set', () => {
			const config = new RTEConfig(features);
			const instance = config.instantiateEditor();
			expect(() => instance.hostState()).toThrowError(
				'No host state available'
			);
		});

		it('should return host state when it has been set', () => {
			const config = new RTEConfig(features);
			const instance = config.instantiateEditor();
			const hostState = {} as any;

			instance.updateHostState(hostState);

			expect(instance.hostState()).toBe(hostState);
		});
	});
});
