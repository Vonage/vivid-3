import { setup } from '../../__tests__/test-utils';
import { RteBase } from '../base';
import { docFactories } from '../../__tests__/doc-factories';

const { heading1: h1, heading2: h2, heading3: h3, paragraph } = docFactories;

const features = [
	new RteBase({
		heading1: true,
		heading2: true,
		heading3: true,
	}),
];

describe('RteBasicTextBlocks', () => {
	it('should serialize blocks to HTML', async () => {
		const rte = await setup(features, [
			h1('Heading 1'),
			h2('Heading 2'),
			h3('Heading 3'),
			paragraph('Paragraph'),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p>Paragraph</p>"`
		);
	});

	it('should deserialize blocks from HTML', async () => {
		const rte = await setup(features);

		rte.setHtml(
			'<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p>Paragraph</p>'
		);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			heading1('|Heading 1'),
			heading2('Heading 2'),
			heading3('Heading 3'),
			paragraph('Paragraph')
			"
		`);
	});
});
