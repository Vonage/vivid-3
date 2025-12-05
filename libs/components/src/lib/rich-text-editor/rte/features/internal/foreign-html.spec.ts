import { RTECore } from '../core';
import { RTEToolbarFeature } from '../toolbar';
import { RTEFreeformStructure } from '../freeform';
import { setup } from '../../__tests__/test-utils';
import { RTEBoldFeature } from '../bold';
import { docFactories } from '../../__tests__/doc-factories';
import { RTEHtmlParser } from '../../html-parser';
import { RTELinkFeature } from '../link';
import { RTEHtmlSerializer } from '../../html-serializer';

const { text_line: line, text, bold } = docFactories;

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEBoldFeature(),
	new RTEToolbarFeature(),
	new RTELinkFeature(),
];

describe('RTEForeignHtmlFeature', () => {
	it('should use the provided html parser when html is pasted or dropped', async () => {
		const rte = await setup(features, [line('paste: drop:')], (config) => ({
			foreignHtmlParser: new RTEHtmlParser(config, {
				modifyParseRules: (rules) => {
					rules.marks.bold = [{ tag: 'span[data-bold]' }];
				},
			}),
		}));

		rte.placeCursor('paste:|');
		rte.pasteHtml(`<span data-bold>pasted</span>`);
		rte.dropHtml(rte.getPos('drop:|'), `<span data-bold>dropped</span>`);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			text_line('paste:', <bold>'pasted', ' drop:', <bold>'[dropped|]')
			"
		`);
	});

	it('should sanitize foreign html', async () => {
		const rte = await setup(features);

		rte.pasteHtml(`<a href="javascript:alert('xss')">Evil</a>`);

		expect(rte.docStr()).toMatchInlineSnapshot(`"text_line('Evil|')"`);
	});

	it('should use the provided html serializer when content is copied or dragged', async () => {
		const rte = await setup(
			features,
			[line(text.marks(bold())('hello'))],
			(config) => ({
				foreignHtmlSerializer: new RTEHtmlSerializer(config, {
					serializers: {
						nodes: {},
						marks: {
							bold: () => ['span', { 'data-bold': '' }, 0],
						},
					},
				}),
			})
		);
		rte.selectText('[hello]');

		const clipboardData = rte.copy();

		expect(clipboardData.getData('text/html')).toMatchInlineSnapshot(
			`"<div data-pm-slice="1 1 []"><span data-bold="">hello</span></div>"`
		);

		const draggedData = rte.startDrag(rte.getPos('h|ello'));

		expect(draggedData.getData('text/html')).toMatchInlineSnapshot(
			`"<div data-pm-slice="1 1 []"><span data-bold="">hello</span></div>"`
		);
	});
});
