import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteToolbarFeature } from './toolbar';
import { RteBoldFeature } from './bold';
import { RteHardBreakFeature } from './hard-break';
import { RteConfig } from '../config';
import type { RichTextEditor } from '../../rich-text-editor';
import { impl } from '../utils/impl';

const { paragraph: p } = docFactories;

describe('RteBase', () => {
	it('should add only paragraph node by default', async () => {
		const rte = await setup([new RteBase()]);

		expect(rte.view.state.schema.nodes.paragraph).toBeDefined();
		expect(rte.view.state.schema.nodes.heading1).not.toBeDefined();
		expect(rte.view.state.schema.nodes.heading2).not.toBeDefined();
		expect(rte.view.state.schema.nodes.heading3).not.toBeDefined();
	});

	it('should not add paragraph node when disabled', async () => {
		const rte = await setup([
			new RteBase({ paragraph: false, heading1: true }),
		]);

		expect(rte.view.state.schema.nodes.paragraph).toBeUndefined();
	});

	it('should add heading1 node when enabled', async () => {
		const rte = await setup([new RteBase({ heading1: true })]);

		expect(rte.view.state.schema.nodes.heading1).toBeDefined();
	});

	it('should add heading2 node when enabled', async () => {
		const rte = await setup([new RteBase({ heading2: true })]);

		expect(rte.view.state.schema.nodes.heading2).toBeDefined();
	});

	it('should add heading3 node when enabled', async () => {
		const rte = await setup([new RteBase({ heading3: true })]);

		expect(rte.view.state.schema.nodes.heading3).toBeDefined();
	});

	describe('keyboard handling', () => {
		describe('Enter/Shift-Enter', () => {
			it('should split paragraph when pressing Enter', async () => {
				const rte = await setup([new RteBase()], [p('Hello world')]);

				rte.placeCursor('Hello| world');
				rte.keydown('Enter');
				await elementUpdated(rte.element);

				expect(rte.docStr()).toMatchInlineSnapshot(
					`"paragraph('Hello'), paragraph('| world')"`
				);
			});

			it('should split paragraph when pressing Shift+Enter', async () => {
				const rte = await setup([new RteBase()], [p('Hello world')]);

				rte.placeCursor('Hello| world');
				rte.keydown('Enter', { shift: true });
				await elementUpdated(rte.element);

				expect(rte.docStr()).toMatchInlineSnapshot(
					`"paragraph('Hello'), paragraph('| world')"`
				);
			});

			describe('WHEN hard break feature enabled', () => {
				it('should insert hard break when pressing Shift+Enter', async () => {
					const rte = await setup(
						[new RteBase(), new RteHardBreakFeature()],
						[p('Hello world')]
					);

					rte.placeCursor('Hello| world');
					rte.keydown('Enter', { shift: true });
					await elementUpdated(rte.element);

					expect(rte.docStr()).toMatchInlineSnapshot(
						`"paragraph('Hello', hardBreak(), '| world')"`
					);
				});

				it('should keep Enter behavior', async () => {
					const rte = await setup(
						[new RteBase(), new RteHardBreakFeature()],
						[p('Hello world')]
					);

					rte.placeCursor('Hello| world');
					rte.keydown('Enter');
					await elementUpdated(rte.element);

					expect(rte.docStr()).toMatchInlineSnapshot(
						`"paragraph('Hello'), paragraph('| world')"`
					);
				});
			});
		});
	});

	describe('disabled', () => {
		it('should prevent user input and disable toolbar items and popovers', async () => {
			const rte = await setup([
				new RteBase(),
				new RteToolbarFeature(),
				new RteBoldFeature(),
			]);
			const baseFeature = rte.instance.feature(RteBase);

			baseFeature.disabled = true;

			expect(baseFeature.disabled).toBe(true);
			expect(rte.view.editable).toBe(false);
			expect(rte.toolbarButton('Bold').disabled).toBe(true);
			expect(rte.popovers.classList.contains('popovers--disabled')).toBe(true);
			expect(
				rte.view.dom.parentElement!.classList.contains('editor--disabled')
			).toBe(true);

			baseFeature.disabled = false;

			expect(baseFeature.disabled).toBe(false);
			expect(rte.view.editable).toBe(true);
			expect(rte.toolbarButton('Bold').disabled).toBe(false);
			expect(rte.popovers.classList.contains('popovers--disabled')).toBe(false);
			expect(
				rte.view.dom.parentElement!.classList.contains('editor--disabled')
			).toBe(false);
		});

		it('should prevent default on click events for links etc.', async () => {
			const rte = await setup([new RteBase(), new RteToolbarFeature()]);
			const baseFeature = rte.instance.feature(RteBase);

			baseFeature.disabled = true;

			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			rte.view.dom.dispatchEvent(clickEvent);

			expect(clickEvent.defaultPrevented).toBe(true);
		});

		it('should not prevent default on click events when enabled', async () => {
			const rte = await setup([new RteBase(), new RteToolbarFeature()]);

			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			rte.view.dom.dispatchEvent(clickEvent);

			expect(clickEvent.defaultPrevented).toBe(false);
		});
	});

	describe('scrollThreshold', () => {
		it('should update the view scrollThreshold when set', async () => {
			const rte = await setup([new RteBase()]);
			const baseFeature = rte.instance.feature(RteBase);

			baseFeature.scrollThreshold = 50;

			expect(rte.view.someProp('scrollThreshold')).toBe(50);
			expect(baseFeature.scrollThreshold).toBe(50);
		});

		it('should accept an object value', async () => {
			const rte = await setup([new RteBase()]);
			const baseFeature = rte.instance.feature(RteBase);
			const value = { top: 10, right: 20, bottom: 30, left: 40 };

			baseFeature.scrollThreshold = value;

			expect(rte.view.someProp('scrollThreshold')).toEqual(value);
		});

		it('should be applied on view creation if set before the view is created', async () => {
			const config = new RteConfig([new RteBase()]);
			const instance = config.instantiateEditor();
			instance.feature(RteBase).scrollThreshold = 50;

			const element = fixture(
				'<vwc-rich-text-editor></vwc-rich-text-editor>'
			) as RichTextEditor;
			element.instance = instance;
			await elementUpdated(element);

			expect(instance[impl].view!.someProp('scrollThreshold')).toBe(50);
		});
	});

	describe('scrollMargin', () => {
		it('should update the view scrollMargin when set', async () => {
			const rte = await setup([new RteBase()]);
			const baseFeature = rte.instance.feature(RteBase);

			baseFeature.scrollMargin = 20;

			expect(rte.view.someProp('scrollMargin')).toBe(20);
			expect(baseFeature.scrollMargin).toBe(20);
		});

		it('should accept an object value', async () => {
			const rte = await setup([new RteBase()]);
			const baseFeature = rte.instance.feature(RteBase);
			const value = { top: 5, right: 10, bottom: 15, left: 20 };

			baseFeature.scrollMargin = value;

			expect(rte.view.someProp('scrollMargin')).toEqual(value);
		});

		it('should be applied on view creation if set before the view is created', async () => {
			const config = new RteConfig([new RteBase()]);
			const instance = config.instantiateEditor();
			instance.feature(RteBase).scrollMargin = 20;

			const element = fixture(
				'<vwc-rich-text-editor></vwc-rich-text-editor>'
			) as RichTextEditor;
			element.instance = instance;
			await elementUpdated(element);

			expect(instance[impl].view!.someProp('scrollMargin')).toBe(20);
		});
	});
});
