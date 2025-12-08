import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteHardBreakFeature } from './hard-break';

const { paragraph: p, hardBreak: br } = docFactories;

const features = [new RteBase(), new RteHardBreakFeature()];

describe('RteHardBreakFeature', () => {
	it('should serialize hard break to <br>', async () => {
		const rte = await setup(features, [p('Hello', br(), 'world')]);

		expect(rte.getHtml()).toBe('<p>Hello<br>world</p>');
	});

	it('should deserialize <br> to hard break', async () => {
		const rte = await setup(features);

		rte.setHtml('<p>Hello<br>world</p>');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('|Hello', hardBreak(), 'world')"`
		);
	});

	it('should insert hard break when pressing Shift+Enter', async () => {
		const rte = await setup(features, [p('Hello world')]);
		rte.placeCursor('Hello| world');

		rte.keydown('Enter', { shift: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello', hardBreak(), '| world')"`
		);
	});
});
