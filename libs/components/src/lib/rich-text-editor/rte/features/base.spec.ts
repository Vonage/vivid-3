import { elementUpdated } from '@repo/shared/test-utils/fixture';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteToolbarFeature } from './toolbar';
import { RteBoldFeature } from './bold';
import { RteHardBreakFeature } from './hard-break';

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

			baseFeature.disabled = false;

			expect(baseFeature.disabled).toBe(false);
			expect(rte.view.editable).toBe(true);
			expect(rte.toolbarButton('Bold').disabled).toBe(false);
			expect(rte.popovers.classList.contains('popovers--disabled')).toBe(false);
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
});
