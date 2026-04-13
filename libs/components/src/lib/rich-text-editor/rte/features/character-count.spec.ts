import { elementUpdated } from '@repo/shared';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import {
	type RteCharacterCountConfig,
	RteCharacterCountFeature,
} from './character-count';
import { RteHardBreakFeature } from './hard-break';

const { paragraph: p } = docFactories;

const features = (config?: RteCharacterCountConfig) => [
	new RteBase(),
	new RteHardBreakFeature(),
	new RteCharacterCountFeature(config),
];

describe('RteCharacterCountFeature', () => {
	describe('character counting', () => {
		it('should return 0 for an empty document', async () => {
			const rte = await setup(features());

			const count = rte.instance.feature(RteCharacterCountFeature);
			expect(count.characters).toBe(0);
		});

		it('should count characters in a single paragraph', async () => {
			const rte = await setup(features(), [p('Hello')]);

			const count = rte.instance.feature(RteCharacterCountFeature);
			expect(count.characters).toBe(5);
		});

		it('should count characters across multiple paragraphs', async () => {
			const rte = await setup(features(), [p('Hello'), p('World')]);

			const count = rte.instance.feature(RteCharacterCountFeature);
			expect(count.characters).toBe(10);
		});

		it('should update count after typing', async () => {
			const rte = await setup(features());

			const count = rte.instance.feature(RteCharacterCountFeature);
			expect(count.characters).toBe(0);

			await rte.typeTextAtCursor('Hello');

			expect(count.characters).toBe(5);
		});
	});

	describe('limit', () => {
		it('should return undefined when no limit is set', async () => {
			const rte = await setup(features());

			const count = rte.instance.feature(RteCharacterCountFeature);
			expect(count.limit).toBeUndefined();
		});

		it('should return the configured limit', async () => {
			const rte = await setup(features({ limit: 100 }));

			const count = rte.instance.feature(RteCharacterCountFeature);
			expect(count.limit).toBe(100);
		});
	});

	describe('limit enforcement', () => {
		it('should not limit when no limit is configured', async () => {
			const rte = await setup(features());

			await rte.typeTextAtCursor('Hello world');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello world|')"`);
		});

		it('should allow typing within the limit', async () => {
			const rte = await setup(features({ limit: 10 }));

			await rte.typeTextAtCursor('Hello');

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello|')"`);
		});

		it('should block typing that would exceed the limit', async () => {
			const rte = await setup(features({ limit: 5 }), [p('Hello')]);

			rte.placeCursor('Hello|');
			await rte.typeTextAtCursor('X');

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello|')"`);
		});

		it('should allow deleting text when at the limit', async () => {
			const rte = await setup(features({ limit: 5 }), [p('Hello')]);

			rte.selectText('Hell[o]');
			rte.keydown('Backspace');

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hell|')"`);
		});

		it('should allow replacing selected text within the limit', async () => {
			const rte = await setup(features({ limit: 5 }), [p('Hello')]);

			rte.selectText('[Hello]');
			await rte.typeTextAtCursor('Bye');

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Bye|')"`);
		});

		it('should truncate pasted content to fit within the limit', async () => {
			const rte = await setup(features({ limit: 8 }), [p('Hello ')]);

			rte.placeCursor('Hello |');
			rte.pasteHtml('<p>world</p>');

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello wo|')"`);
		});

		it('should allow adding new paragraphs while limit is reached', async () => {
			const rte = await setup(features({ limit: 5 }), [p('Hello')]);

			rte.placeCursor('He|llo');
			rte.keydown('Enter');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('He'), paragraph('|llo')"`
			);
		});

		it('should not allow adding new hard breaks while limit is reached', async () => {
			const rte = await setup(features({ limit: 5 }), [p('Hello')]);

			rte.placeCursor('He|llo');
			rte.keydown('Enter', { shift: true });

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('He|llo')"`);
		});
	});
});
