import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import {
	basicTextBlockFactories,
	basicTextBlocks,
} from '../__tests__/text-blocks';
import { RTECore } from './core';
import { RTETextBlockStructure } from './text-block';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';
import { RTEListFeature } from './list';
import { RTEAlignmentFeature } from './alignment';

const {
	list_item: li,
	bullet_list: ul,
	numbered_list: ol,
	text_line: line,
} = docFactories;

const { p: p } = basicTextBlockFactories;

const freeformFeatures = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEToolbarFeature(),
	new RTEListFeature(),
];

const textBlockFeatures = [
	new RTECore(),
	new RTETextBlockStructure({ blocks: basicTextBlocks }),
	new RTEToolbarFeature(),
	new RTEListFeature(),
];

describe('RTEListFeature', () => {
	it('should add bullet_list, numbered_list, and list_item nodes to the schema', async () => {
		const rte = await setup(textBlockFeatures, [
			ul(li('Item 1'), ul(li('Nested Item 2'))),
			ol(li('Item 1'), ol(li('Nested Item 2'))),
		]);
		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			bullet_list(list_item('|Item 1'), bullet_list(list_item('Nested Item 2'))),
			numbered_list(list_item('Item 1'), numbered_list(list_item('Nested Item 2')))
			"
		`
		);
	});

	it('should deserialize lists from HTML', async () => {
		const rte = await setup(textBlockFeatures);
		rte.setHtml(
			`
				<ul>
					<li>Item 1</li>
					<ul>
						<li>Item 2</li>
					</ul>
				</ul>
				<ol>
					<li>Item 1</li>
					<ol>
						<li>Item 2</li>
					</ol>
				</ol>
			`.trim()
		);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			bullet_list(list_item('|Item 1'), bullet_list(list_item('Item 2'))),
			numbered_list(list_item('Item 1'), numbered_list(list_item('Item 2')))
			"
		`);
	});

	it('should serialize lists to HTML', async () => {
		const rte = await setup(textBlockFeatures, [
			ul(li('Item 1'), ul(li('Nested Item 2'))),
			ol(li('Item 1'), ol(li('Nested Item 2'))),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<ul><li>Item 1</li><ul><li>Nested Item 2</li></ul></ul><ol><li>Item 1</li><ol><li>Nested Item 2</li></ol></ol>"`
		);
	});

	describe('toolbar button', () => {
		describe('with cursor selection', () => {
			it('should toggle converting block into list', async () => {
				const rte = await setup(textBlockFeatures, [
					p('Before'),
					p('Item'),
					p('After'),
				]);
				rte.placeCursor('It|em');

				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(false);

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					paragraph('Before'),
					bullet_list(list_item('It|em')),
					paragraph('After')
					"
				`
				);
				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(true);

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`"paragraph('Before'), paragraph('It|em'), paragraph('After')"`
				);
			});

			it('should join with preceding list', async () => {
				const rte = await setup(textBlockFeatures, [
					ul(li('Before')),
					p('Item'),
					p('After'),
				]);
				rte.placeCursor('It|em');

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					bullet_list(list_item('Before'), list_item('It|em')),
					paragraph('After')
					"
				`
				);
			});

			it('should join with following list', async () => {
				const rte = await setup(textBlockFeatures, [
					p('Before'),
					p('Item'),
					ul(li('After')),
				]);
				rte.placeCursor('It|em');

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					paragraph('Before'),
					bullet_list(list_item('It|em'), list_item('After'))
					"
				`
				);
			});

			it('should join with surrounding lists', async () => {
				const rte = await setup(textBlockFeatures, [
					ul(li('Before')),
					p('Item'),
					ul(li('After')),
				]);
				rte.placeCursor('It|em');

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					bullet_list(list_item('Before'), list_item('It|em'), list_item('After'))
					"
				`
				);
			});
		});

		describe('with range selection', () => {
			it('should toggle wrapping selected textblocks in list', async () => {
				const rte = await setup(textBlockFeatures, [
					p('Before'),
					p('Item 1'),
					p('Item 2'),
					p('After'),
				]);
				rte.selectText('It[em 1', 'It]em 2');

				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(false);

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					paragraph('Before'),
					bullet_list(list_item('It[em 1'), list_item('It|]em 2')),
					paragraph('After')
					"
				`
				);
				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(true);
			});

			it('should lift a range of li out of list', async () => {
				const rte = await setup(textBlockFeatures, [
					p('Before'),
					ul(li('Item 1'), li('Item 2'), li('Item 3'), li('Item 4')),
					p('After'),
				]);
				rte.selectText('It[em 2', 'It]em 3');

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					paragraph('Before'),
					bullet_list(list_item('Item 1')),
					paragraph('It[em 2'),
					paragraph('It|]em 3'),
					bullet_list(list_item('Item 4')),
					paragraph('After')
					"
				`
				);
			});

			it('should lift a range of li with different nesting levels', async () => {
				const rte = await setup(textBlockFeatures, [
					ul(ul(li('Item 1'), li('Item 2')), li('Item 3')),
				]);
				rte.selectText('It[em 2', 'It]em 3');

				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(true);

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					bullet_list(bullet_list(list_item('Item 1')), list_item('It[em 2')),
					paragraph('It|]em 3')
					"
				`
				);
			});

			it('should sink a range of mixed content', async () => {
				const rte = await setup(textBlockFeatures, [
					ul(ul(li('Item 1'), li('Item 2')), li('Item 3')),
					p('Item 4'),
				]);
				rte.selectText('It[em 2', 'It]em 4');

				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(false);

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`
					"
					bullet_list(
						bullet_list(
							list_item('Item 1'),
							bullet_list(list_item('It[em 2')),
							list_item('Item 3')
						),
						list_item('It|]em 4')
					)
					"
				`
				);
			});
		});

		describe('with all selection', () => {
			it('should toggle wrapping selected textblocks in list', async () => {
				const rte = await setup(textBlockFeatures, [p('Item 1'), p('Item 2')]);
				rte.selectAll();

				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(false);

				await rte.click(rte.toolbarButton('Bullet list'));

				expect(rte.docStr()).toMatchInlineSnapshot(
					`"[bullet_list(list_item('Item 1'), list_item('Item 2'))|]"`
				);
				expect(rte.isActive(rte.toolbarButton('Bullet list'))).toBe(true);
			});
		});
	});

	describe('Backspace at start of li', () => {
		it('should join with a preceding list when there is one', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Before')),
				ul(li('Item')),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('Before'), list_item('|Item'))"`
			);
		});

		it('should replace a list with single li with default node', async () => {
			const rte = await setup(textBlockFeatures, [ul(li('Item'))]);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('|Item')"`);
		});

		it('should replace first li with default node', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Item'), li('Another')),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('|Item'), bullet_list(list_item('Another'))"`
			);
		});

		it('should replace last li with default node', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Another'), li('Item')),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('Another')), paragraph('|Item')"`
			);
		});

		it('should split list with li in the middle', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Before'), li('Item'), li('Another')),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(list_item('Before')),
				paragraph('|Item'),
				bullet_list(list_item('Another'))
				"
			`
			);
		});

		it('should lift a nested li', async () => {
			const rte = await setup(textBlockFeatures, [ul(ul(li('Item')))]);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('|Item'))"`
			);
		});
	});

	describe('Enter', () => {
		it('should replace li with default node when on empty single li', async () => {
			const rte = await setup(textBlockFeatures, [
				p('Before'),
				ul(li('Item')),
				p('After'),
			]);
			rte.selectText('[Item]');
			rte.keydown('Backspace'); // Delete text
			rte.keydown('Enter');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Before'), paragraph(|), paragraph('After')"`
			);
		});

		it('should replace li with default node when on empty last li', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Before'), li('Item')),
				p('After'),
			]);
			rte.selectText('[Item]');
			rte.keydown('Backspace'); // Delete text
			rte.keydown('Enter');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(list_item('Before')),
				paragraph(|),
				paragraph('After')
				"
			`
			);
		});

		it('should insert new li when at end of non-empty li', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Before'), li('Item')),
			]);
			rte.placeCursor('Item|');
			rte.keydown('Enter');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(list_item('Before'), list_item('Item'), list_item(|))
				"
			`
			);
		});

		it('should split li when in the middle of it', async () => {
			const rte = await setup(textBlockFeatures, [ul(li('Item'))]);
			rte.placeCursor('It|em');
			rte.keydown('Enter');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('It'), list_item('|em'))"`
			);
		});

		it('should lift a nested li', async () => {
			const rte = await setup(textBlockFeatures, [ul(ul(li('Item')))]);
			rte.selectText('[Item]');
			rte.keydown('Backspace'); // Delete text
			rte.keydown('Enter');
			expect(rte.docStr()).toMatchInlineSnapshot(`"bullet_list(list_item(|))"`);
		});
	});

	describe('Tab', () => {
		it('should increase the nesting level when at start of li', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Before'), li('Item'), li('After')),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					list_item('Before'),
					bullet_list(list_item('|Item')),
					list_item('After')
				)
				"
			`
			);
		});

		it('should merge with an adjacent list before', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(ul(li('Before')), li('Item'), li('After')),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					bullet_list(list_item('Before'), list_item('|Item')),
					list_item('After')
				)
				"
			`
			);
		});

		it('should merge with an adjacent list after', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Before'), li('Item'), ul(li('After'))),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					list_item('Before'),
					bullet_list(list_item('|Item'), list_item('After'))
				)
				"
			`
			);
		});

		it('should merge with adjacent lists before and after', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(ul(li('Before')), li('Item'), ul(li('After'))),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					bullet_list(list_item('Before'), list_item('|Item'), list_item('After'))
				)
				"
			`
			);
		});

		it('should do nothing when in middle of li', async () => {
			const rte = await setup(textBlockFeatures, [ul(li('Item'))]);
			rte.placeCursor('It|em');
			rte.keydown('Tab');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('It|em'))"`
			);
		});
	});

	describe('Shift + Tab', () => {
		it('should do nothing when in outer list', async () => {
			const rte = await setup(textBlockFeatures, [ul(li('Item'))]);
			rte.placeCursor('|Item');
			rte.keydown('Tab', { shift: true });
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('|Item'))"`
			);
		});

		it('should lift a nested li that is first item', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(ul(li('Item'), li('After'))),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab', { shift: true });
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(list_item('|Item'), bullet_list(list_item('After')))
				"
			`
			);
		});

		it('should lift a nested li that is last item', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(ul(li('Before'), li('Item'))),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab', { shift: true });
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(bullet_list(list_item('Before')), list_item('|Item'))
				"
			`
			);
		});

		it('should lift a nested li that is middle item', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(ul(li('Before'), li('Item'), li('After'))),
			]);
			rte.placeCursor('|Item');
			rte.keydown('Tab', { shift: true });
			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					bullet_list(list_item('Before')),
					list_item('|Item'),
					bullet_list(list_item('After'))
				)
				"
			`
			);
		});

		it('should lift a nested sole li', async () => {
			const rte = await setup(textBlockFeatures, [ul(ul(li('Item')))]);
			rte.placeCursor('|Item');
			rte.keydown('Tab', { shift: true });
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('|Item'))"`
			);
		});

		it('should do nothing when in middle of item', async () => {
			const rte = await setup(textBlockFeatures, [ul(ul(li('Item')))]);
			rte.placeCursor('It|em');
			rte.keydown('Tab', { shift: true });
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(bullet_list(list_item('It|em')))"`
			);
		});
	});

	describe('with freeform structure', () => {
		it('should use text_line as default node', async () => {
			const rte = await setup(freeformFeatures, [line('Item')]);
			await rte.click(rte.toolbarButton('Bullet list'));
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item('|Item'))"`
			);
			await rte.click(rte.toolbarButton('Bullet list'));
			expect(rte.docStr()).toMatchInlineSnapshot(`"text_line('|Item')"`);
		});
	});

	describe('textblock attrs', () => {
		it('should maintain textblock attrs when converting block to list item', async () => {
			const rte = await setup(
				[...textBlockFeatures, new RTEAlignmentFeature()],
				[p.attrs({ textAlign: 'right' })('Item')]
			);
			await rte.click(rte.toolbarButton('Bullet list'));
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bullet_list(list_item[textAlign="right"]('|Item'))"`
			);
		});

		it('should maintain textblock attrs when lifting item out of list', async () => {
			const rte = await setup(
				[...textBlockFeatures, new RTEAlignmentFeature()],
				[ul(li.attrs({ textAlign: 'right' })('Item'))]
			);
			rte.placeCursor('|Item');
			rte.keydown('Backspace');
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph[textAlign="right"]('|Item')"`
			);
		});
	});

	it('should toggle bullet list when pressing Mod + Shift + 8', async () => {
		const rte = await setup(textBlockFeatures, [p('Item')]);
		rte.placeCursor('It|em');

		rte.keydown('8', { shift: true, ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
					"bullet_list(list_item('It|em'))"
				`
		);
	});

	it('should toggle numbered list when pressing Mod + Shift + 7', async () => {
		const rte = await setup(textBlockFeatures, [p('Item')]);
		rte.placeCursor('It|em');

		rte.keydown('7', { shift: true, ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
					"numbered_list(list_item('It|em'))"
				`
		);
	});

	describe('interactions between different list types', () => {
		it('should operate normally on a nested list of a different type when the selection is entirely within it', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Item 1'), ol(li('Item 2'), li('Item 3')), li('Item 4')),
			]);
			rte.selectText('It[em 2', 'It]em 3');

			await rte.click(rte.toolbarButton('Numbered list'));

			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					list_item('Item 1'),
					list_item('It[em 2'),
					list_item('It|]em 3'),
					list_item('Item 4')
				)
				"
			`
			);
		});

		it('should convert all lists in the selection to the target type when a selection within a list contains items of different types', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Item 1'), ol(li('Item 2')), ul(li('Item 3')), li('Item 4')),
			]);
			rte.selectText('It[em 2', 'It]em 3');

			await rte.click(rte.toolbarButton('Numbered list'));

			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				numbered_list(
					list_item('Item 1'),
					numbered_list(list_item('It[em 2'), list_item('It|]em 3')),
					list_item('Item 4')
				)
				"
			`
			);
		});

		it('should sink all textblocks in selection when it spans multiple lists', async () => {
			const rte = await setup(textBlockFeatures, [
				ul(li('Item 1'), li('Item 2')),
				p('Middle'),
				ol(li('Item 3'), li('Item 4')),
			]);
			rte.selectText('It[em 2', 'It]em 3');

			await rte.click(rte.toolbarButton('Bullet list'));

			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				bullet_list(
					list_item('Item 1'),
					bullet_list(list_item('It[em 2')),
					list_item('Middle')
				),
				numbered_list(bullet_list(list_item('It|]em 3')), list_item('Item 4'))
				"
			`
			);
		});
	});
});
