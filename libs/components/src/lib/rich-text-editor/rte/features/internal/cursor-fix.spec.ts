import { RteBase } from '../base';
import { RteAtomFeature } from '../atom';
import { setup } from '../../__tests__/test-utils';

const features = [new RteBase(), new RteAtomFeature('mention')];

const findZeroWidthWidgets = (dom: HTMLElement) =>
	Array.from(dom.querySelectorAll('span.ProseMirror-widget')).filter((widget) =>
		widget.innerHTML.includes('\u200b')
	);

describe('RteCursorFixFeature', () => {
	describe('atom cursor fix', () => {
		it('should add zero-width space decoration when cursor is after an atom at end of line', async () => {
			const rte = await setup(features, [
				{
					type: 'paragraph',
					content: [
						{ type: 'text', text: 'Hello ' },
						{ type: 'mention', attrs: { value: '@user' } },
						{ type: 'text', text: 'end' },
					],
				},
			]);

			expect(findZeroWidthWidgets(rte.view.dom)).toEqual([]);

			// Move cursor to end of line
			rte.selectText('[end]');
			rte.keydown('Delete');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello ', mention[value="@user"]())"`
			);
			const atomNode = rte.view.dom.querySelector('[part="node--mention"]')!;
			expect(findZeroWidthWidgets(rte.view.dom)).toEqual([
				atomNode.nextSibling!,
			]);
		});
	});

	it('should not add decoration when selection is not collapsed', async () => {
		const rte = await setup(features, [
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Hello ' },
					{ type: 'mention', attrs: { value: '@user' } },
				],
			},
		]);

		rte.selectAll();

		expect(findZeroWidthWidgets(rte.view.dom)).toEqual([]);
	});
});
