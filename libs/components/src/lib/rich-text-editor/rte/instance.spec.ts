import { RteConfig } from './config';
import { RteBase } from './features/base';
import { docFactories } from './__tests__/doc-factories';
import { setup } from './__tests__/test-utils';
import { impl } from './utils/impl';
import { RteBoldFeatureImpl } from './features/bold';

const { doc, paragraph: p, text } = docFactories;
const features = [new RteBase()];

describe('RteInstance', () => {
	describe('initialization', () => {
		it('should throw an error when initial document is invalid', async () => {
			const config = new RteConfig([new RteBase()]);
			expect(() =>
				config.instantiateEditor({
					initialDocument: doc(text('Top level text')),
				})
			).toThrowErrorMatchingInlineSnapshot(
				`[Error: Document could not be parsed]`
			);
			expect(() =>
				config.instantiateEditor({
					initialDocument: doc(p(p('Nested line'))),
				})
			).toThrowErrorMatchingInlineSnapshot(
				`[RangeError: Invalid content for node paragraph: <paragraph("Nested line")>]`
			);
		});
	});

	describe('getDocument', () => {
		it('should return the current document', async () => {
			const rte = await setup(features, [p('Hello world')]);
			expect(rte.instance.getDocument()).toEqual(doc(p('Hello world')));
		});
	});

	describe('reset', () => {
		it('should reset the editor', async () => {
			const rte = await setup(features, [p('Hello world')]);
			await rte.typeTextAtCursor('something');
			rte.instance.reset();
			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(|)"`);
			rte.undo();
			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(|)"`);
		});

		it('should use an initial document when passed', async () => {
			const rte = await setup(features, [p('Hello world')]);
			await rte.typeTextAtCursor('something');
			rte.instance.reset(doc(p('New document')));
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('|New document')"`
			);
		});
	});

	describe('replaceSelection', () => {
		it('should replace the selection when text is selected', async () => {
			const rte = await setup(features, [p('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')]);
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello wonderful| world')"`
			);
		});

		it('should work with an all selection', async () => {
			const rte = await setup(features, [p('Hello world')]);
			rte.selectAll();
			rte.instance.replaceSelection([text('New world')], {
				cursorPlacement: 'start',
			});
			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('|New world')"`);
		});

		it('should place cursor at start of inserted content when cursorPlacement=start', async () => {
			const rte = await setup(features, [p('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')], {
				cursorPlacement: 'start',
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello |wonderful world')"`
			);
		});

		it('should select the inserted content when selectContent=true', async () => {
			const rte = await setup(features, [p('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')], {
				selectContent: true,
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello [wonderful|] world')"`
			);
		});

		it('should keep an all selection selectContent=true', async () => {
			const rte = await setup(features, [p('Hello world')]);
			rte.selectAll();
			rte.instance.replaceSelection([text('New world')], {
				selectContent: true,
			});
			expect(rte.docStr()).toMatchInlineSnapshot(`"[paragraph('New world')|]"`);
		});

		it('should be undoable', async () => {
			const rte = await setup(features, [p('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			rte.instance.replaceSelection([text('wonderful')]);
			rte.undo();

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello [beautiful|] world')"`
			);
		});

		it('should throw an error when content is invalid', async () => {
			const rte = await setup(features, [p('Hello beautiful world')]);
			rte.selectText('[beautiful]');
			expect(() =>
				rte.instance.replaceSelection([p(p('nested line'))])
			).toThrowErrorMatchingInlineSnapshot(
				`[RangeError: Invalid content for node paragraph: <paragraph("nested line")>]`
			);
		});
	});

	describe('replaceDocument', () => {
		it('should replace the document', async () => {
			const rte = await setup(features, [p('Hello world')]);
			rte.instance.replaceDocument(doc(p('New document')));
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('|New document')"`
			);
		});

		it('should place cursor at end of document when cursorPlacement=end', async () => {
			const rte = await setup(features, [p('Hello world')]);
			rte.instance.replaceDocument(doc(p('New document')), {
				cursorPlacement: 'end',
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('New document|')"`
			);
		});

		it('should select all when selectContent=true', async () => {
			const rte = await setup(features, [p('Hello world')]);
			rte.instance.replaceDocument(doc(p('New document')), {
				selectContent: true,
			});
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"[paragraph('New document')|]"`
			);
		});

		it('should be undoable', async () => {
			const rte = await setup(features, [p('Hello world')]);
			rte.instance.replaceDocument(doc(p('New document')));
			rte.undo();
			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('|Hello world')"`);
		});

		it('should throw an error when document is invalid', async () => {
			const rte = await setup(features, [p('Hello world')]);
			expect(() =>
				rte.instance.replaceDocument(doc(p(p('Nested line'))))
			).toThrowErrorMatchingInlineSnapshot(
				`[RangeError: Invalid content for node paragraph: <paragraph("Nested line")>]`
			);
		});
	});

	describe('onChange', () => {
		it('should call onChange callback when document changes', async () => {
			const onChange = vitest.fn();
			const rte = await setup(features, [], () => ({
				onChange,
			}));
			expect(onChange).not.toHaveBeenCalled();
			await rte.typeTextAtCursor('H');
			expect(onChange).toHaveBeenCalledTimes(1);
			await rte.typeTextAtCursor('e');
			expect(onChange).toHaveBeenCalledTimes(2);
		});
	});

	describe('hostState', () => {
		it('should throw an error when host state has not been set', () => {
			const config = new RteConfig(features);
			const instance = config.instantiateEditor()[impl];
			expect(() => instance.hostState()).toThrowError(
				'No host state available'
			);
		});

		it('should return host state when it has been set', () => {
			const config = new RteConfig(features);
			const instance = config.instantiateEditor()[impl];
			const hostState = {} as any;

			instance.updateHostState(hostState);

			expect(instance.hostState()).toBe(hostState);
		});
	});

	describe('getFeature', () => {
		it('should throw an error when feature is not present', () => {
			const config = new RteConfig(features);
			const instance = config.instantiateEditor()[impl];

			expect(() => instance.getFeature(RteBoldFeatureImpl)).toThrowError(
				'Feature not found: RteBoldFeatureImpl'
			);
		});
	});

	describe('destroyView', () => {
		it('should do nothing if there is no view', () => {
			const config = new RteConfig(features);
			const instance = config.instantiateEditor()[impl];

			expect(() => instance.destroyViewIfNeeded()).not.toThrow();
		});
	});
});
