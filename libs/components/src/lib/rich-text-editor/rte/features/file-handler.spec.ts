import { elementUpdated } from '@repo/shared';
import { vitest } from 'vitest';
import { setup } from '../__tests__/test-utils';
import { mockFile } from '../../../file-picker/__mocks__/data-transfer';
import { docFactories } from '../__tests__/doc-factories';
import type { RTEFragment } from '../document';
import { promiseWithResolvers } from '../__tests__/promise';
import { RTECore } from './core';
import { RTETextBlockStructure } from './text-block';
import { RTEToolbarFeature } from './toolbar';
import {
	RTEFileHandlerFeature,
	type RTEFileHandlerFeatureConfig,
} from './file-handler';

vi.mock('prosemirror-transform', () => ({
	dropPoint: vitest.fn(),
}));
const mockProseMirrorDropPointReturn = async (value: number | null) => {
	(
		await vitest.importMock<typeof import('prosemirror-transform')>(
			'prosemirror-transform'
		)
	).dropPoint.mockReturnValue(value);
};

const { paragraph: p, text } = docFactories;

const featuresWithConfig = (config: RTEFileHandlerFeatureConfig) => [
	new RTECore(),
	new RTETextBlockStructure(),
	new RTEToolbarFeature(),
	new RTEFileHandlerFeature(config),
];

describe('RTEFileHandlerFeature', () => {
	it('should ignore files when handler returns null', async () => {
		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => null,
			}),
			[p(text('Hello World'))]
		);

		rte.selectText('Hello [World]');
		rte.pasteFiles([mockFile('world.txt')]);

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [World|]')"`);
	});

	it('should insert returned content at caret on paste', async () => {
		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => [text('PASTED')],
			}),
			[p(text('Hello World'))]
		);

		rte.placeCursor('Hello |World');
		rte.pasteFiles([mockFile('world.txt')]);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello PASTED|World')"`
		);
	});

	it('should replace selection with returned content on paste', async () => {
		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => [text('PASTED')],
			}),
			[p(text('Hello World'))]
		);

		rte.selectText('Hello [World]');
		rte.pasteFiles([mockFile('world.txt')]);

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello PASTED|')"`);
	});

	it('should insert asynchronously returned content at cursor position on paste', async () => {
		const { promise, resolve } = promiseWithResolvers<RTEFragment>();

		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => promise,
			}),
			[p(text('Hello World'))]
		);

		rte.placeCursor('Hello |World');
		rte.pasteFiles([mockFile('world.txt')]);
		rte.placeCursor('Hello|');
		await rte.typeTextAtCursor(' very');
		resolve([text('beautiful ')]);
		await elementUpdated(rte.element);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello very| beautiful World')"`
		);
	});

	it('should replace selection with asynchronously returned content on paste', async () => {
		const { promise, resolve } = promiseWithResolvers<RTEFragment>();

		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => promise,
			}),
			[p(text('Hello World'))]
		);

		rte.selectText('Hello [World]');
		rte.pasteFiles([mockFile('world.txt')]);
		rte.placeCursor('Hello|');
		await rte.typeTextAtCursor(' very');
		resolve([text('beautiful new World')]);
		await elementUpdated(rte.element);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello very| beautiful new World')"`
		);
	});

	it('should ignore asynchronously returned content when the insert point has been deleted', async () => {
		const { promise, resolve } = promiseWithResolvers<RTEFragment>();

		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => promise,
			}),
			[p(text('Hello World'))]
		);

		rte.placeCursor('Hello |World');
		rte.pasteFiles([mockFile('world.txt')]);
		rte.selectText('[Hello World]');
		rte.keydown('Delete');
		resolve([text('result')]);
		await elementUpdated(rte.element);

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(|)"`);
	});

	it('should insert content at cursor position on drop', async () => {
		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => [text('PASTED')],
			}),
			[p(text('Hello World'))]
		);

		rte.dropFiles(rte.getPos('Hello |'), [mockFile('hello.txt')]);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('|Hello PASTEDWorld')"`
		);
	});

	it('should follow drop cursor logic to determine drop position', async () => {
		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => [text('PASTED')],
			}),
			[p(text('Hello World'))]
		);
		Object.defineProperty(rte.view, 'dragging', {
			get: () => ({ slice: {} } as any),
			set: () => undefined,
		});
		await mockProseMirrorDropPointReturn(7);
		rte.dropFiles(rte.getPos('He|llo'), [mockFile('hello.txt')]);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('|Hello PASTEDWorld')"`
		);

		await mockProseMirrorDropPointReturn(null);
		rte.dropFiles(rte.getPos('He|llo'), [mockFile('hello.txt')]);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('|HePASTEDllo PASTEDWorld')"`
		);
	});

	it('should log errors from rejected promises', async () => {
		const error = new Error('Failed to handle files');
		const rte = await setup(
			featuresWithConfig({
				handleFiles: async () => {
					throw error;
				},
			}),
			[p(text('Hello World'))]
		);
		vitest.spyOn(console, 'error').mockImplementation(() => undefined);

		rte.dropFiles(rte.getPos('Hello |'), [mockFile('hello.txt')]);
		await elementUpdated(rte.element);

		// eslint-disable-next-line no-console
		expect(console.error).toHaveBeenCalledWith(
			'Error in handleFiles handler:',
			error
		);
	});

	it('should do nothing when there are no files', async () => {
		const rte = await setup(
			featuresWithConfig({
				handleFiles: () => [text('PASTED')],
			}),
			[p(text('Hello World'))]
		);

		rte.pasteFiles([]);

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('|Hello World')"`);

		rte.dropFiles(rte.getPos('Hello |'), []);

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('|Hello World')"`);
	});
});
