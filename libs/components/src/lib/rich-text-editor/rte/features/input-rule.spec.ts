import { elementUpdated } from '@repo/shared';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import type { RteFragment } from '../document';
import { RteBase } from './base';
import { RteInputRuleFeature } from './input-rule';
import { RteAtomFeature } from './atom';

const { paragraph: p } = docFactories;

const emojiMap: Record<string, string> = {
	':)': '😊',
};
const tags = ['#world'];

const features = [
	new RteBase(),
	new RteInputRuleFeature('emoji', {
		pattern: /[:;]./,
		handler: (match) => {
			const emoji = emojiMap[match[0]];
			if (!emoji) return null;

			return [{ type: 'text', text: emoji }];
		},
	}),
	new RteAtomFeature('tag'),
	new RteInputRuleFeature('tag', {
		pattern: /#(\w*)/,
		matchAfterWhitespace: true,
		handler: (match) => {
			const matchText = match[0].trimEnd();

			if (!tags.includes(matchText)) {
				return null;
			}

			const replacement: RteFragment = [
				{ type: 'tag', attrs: { value: matchText.slice(1) } },
			];

			// Preserve trailing space if it was part of the match
			const hasTrailingSpace = match[0] !== matchText;
			if (hasTrailingSpace) {
				replacement.push({ type: 'text', text: ' ' });
			}

			return replacement;
		},
	}),
];

describe('RteInputRuleFeature', () => {
	describe('without matchAfterWhitespace', () => {
		it('should trigger immediately when the pattern matches', async () => {
			const { placeCursor, typeTextAtCursor, docStr } = await setup(features, [
				p('Hello '),
			]);

			placeCursor('Hello |');
			await typeTextAtCursor(':)');

			expect(docStr()).toBe(`paragraph('Hello 😊|')`);
		});
	});

	describe('with matchAfterWhitespace', () => {
		it('should trigger when space is typed after a match', async () => {
			const { placeCursor, typeTextAtCursor, docStr } = await setup(features, [
				p('Hello '),
			]);

			placeCursor('Hello |');
			await typeTextAtCursor('#world');

			expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello #world|')"`);

			await typeTextAtCursor(' ');

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello ', tag[value="world"](), ' |')"`
			);
		});

		it('should trigger when enter is pressed after a match', async () => {
			const { placeCursor, typeTextAtCursor, docStr, keydown, element } =
				await setup(features, [p('Hello ')]);

			placeCursor('Hello |');
			await typeTextAtCursor('#world');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello ', tag[value="world"]()), paragraph(|)"`
			);

			await typeTextAtCursor(' ');

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello ', tag[value="world"]()), paragraph(' |')"`
			);
		});

		it('should not trigger Enter rule with range selection', async () => {
			const { selectText, keydown, docStr, element } = await setup(features, [
				p('Hello #world'),
			]);

			selectText('Hello [#world|]');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello '), paragraph(|)"`
			);
		});
	});

	describe('undo behavior', () => {
		it('should undo replacement when pressing Backspace', async () => {
			const { placeCursor, typeTextAtCursor, docStr, keydown } = await setup(
				features,
				[p('Hello ')]
			);

			placeCursor('Hello |');
			await typeTextAtCursor(':)');
			keydown('Backspace');

			expect(docStr()).toBe(`paragraph('Hello :)|')`);
		});
	});

	describe('rejected matches', () => {
		it('should do nothing when a pattern matches but handler returns null', async () => {
			const { placeCursor, typeTextAtCursor, docStr } = await setup(features, [
				p('Hello '),
			]);

			placeCursor('Hello |');
			await typeTextAtCursor(':x');

			expect(docStr()).toBe(`paragraph('Hello :x|')`);
		});

		it('should use default Enter handling when a pattern matches but handler returns null', async () => {
			const { placeCursor, typeTextAtCursor, docStr, keydown } = await setup(
				features,
				[p('Hello ')]
			);

			placeCursor('Hello |');
			await typeTextAtCursor('#x');
			keydown('Enter');

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello #x'), paragraph(|)"`
			);
		});
	});
});
