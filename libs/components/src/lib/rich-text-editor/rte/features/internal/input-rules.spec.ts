import { elementUpdated } from '@repo/shared';
import { setup } from '../../__tests__/test-utils';
import { docFactories } from '../../__tests__/doc-factories';
import { RteBase } from '../base';
import { RteInputRuleFeature } from '../input-rule';
import { RteAtomFeature } from '../atom';

const { paragraph: p } = docFactories;

const emojiFeatures = [
	new RteBase(),
	new RteInputRuleFeature('emoji', {
		pattern: /:\)/,
		handler: () => [{ type: 'text', text: '😊' }],
	}),
];

describe('RteInputRulesFeature', () => {
	describe('when input rules are configured without enterHandler', () => {
		it('should apply input rules on typing', async () => {
			const { typeTextAtCursor, docStr } = await setup(emojiFeatures);

			await typeTextAtCursor(':)');

			expect(docStr()).toMatchInlineSnapshot(`"paragraph('😊|')"`);
		});

		it('should undo input rule with Backspace', async () => {
			const { typeTextAtCursor, keydown, docStr } = await setup(emojiFeatures);

			await typeTextAtCursor(':)');
			keydown('Backspace');

			expect(docStr()).toMatchInlineSnapshot(`"paragraph(':)|')"`);
		});
	});

	describe('when input rules are configured with enterHandler', () => {
		const tagFeatures = [
			new RteBase(),
			new RteAtomFeature('tag'),
			new RteInputRuleFeature('tag', {
				pattern: /#(\w+)/,
				matchAfterWhitespace: true,
				handler: (match) => [
					{ type: 'tag', attrs: { value: match[1] } },
					{ type: 'text', text: ' ' },
				],
			}),
		];

		it('should apply input rule on space', async () => {
			const { typeTextAtCursor, docStr } = await setup(tagFeatures);

			await typeTextAtCursor('#hello ');

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph(tag[value="hello"](), ' |')"`
			);
		});

		it('should apply input rule on Enter', async () => {
			const { typeTextAtCursor, keydown, docStr, element } = await setup(
				tagFeatures
			);

			await typeTextAtCursor('#hello');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph(tag[value="hello"](), ' '), paragraph(|)"`
			);
		});

		it('should not apply Enter rule when regex does not match', async () => {
			const { typeTextAtCursor, keydown, docStr, element } = await setup(
				tagFeatures
			);

			await typeTextAtCursor('no match here');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('no match here'), paragraph(|)"`
			);
		});

		it('should not apply Enter rule with range selection', async () => {
			const { selectText, keydown, docStr, element } = await setup(
				tagFeatures,
				[p('#hello')]
			);

			selectText('[#hello]');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(`"paragraph(), paragraph(|)"`);
		});
	});

	describe('when multiple input rules are configured', () => {
		const multipleFeatures = [
			new RteBase(),
			new RteAtomFeature('tag'),
			new RteInputRuleFeature('emoji', {
				pattern: /:\)/,
				handler: () => [{ type: 'text', text: '😊' }],
			}),
			new RteInputRuleFeature('tag', {
				pattern: /#(\w+)/,
				matchAfterWhitespace: true,
				handler: (match) => [{ type: 'tag', attrs: { value: match[1] } }],
			}),
		];

		it('should apply both input rules correctly', async () => {
			const { typeTextAtCursor, docStr } = await setup(multipleFeatures);

			await typeTextAtCursor(':) #hello ');

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('😊 ', tag[value="hello"]())"`
			);
		});
	});
});
