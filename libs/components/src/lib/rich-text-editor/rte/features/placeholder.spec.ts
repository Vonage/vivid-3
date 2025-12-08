import { setup } from '../__tests__/test-utils';
import { RteCore } from './core';
import { RteFreeformStructure } from './freeform';
import { RteTextBlockStructure } from './text-block';
import { RteFontSizeFeature } from './font-size';
import { RtePlaceholderFeature } from './placeholder';

const features = [
	new RteCore(),
	new RtePlaceholderFeature({ text: 'placeholder text' }),
];

describe('RtePlaceholder', () => {
	it('should add placeholder widget when the document is empty', async () => {
		const rte = await setup([...features, new RteFreeformStructure()]);

		expect(rte.placeholder()!.dataset.placeholder).toBe('placeholder text');

		await rte.typeTextAtCursor('Hello');

		expect(rte.placeholder()).toBeNull();
	});

	it('should apply font size to the placeholder', async () => {
		const rte = await setup([
			...features,
			new RteFreeformStructure(),
			new RteFontSizeFeature({
				options: [
					{ size: '100px', label: 'Large' },
					{ size: '10px', label: 'Small' },
				],
				defaultSize: '10px',
			}),
		]);

		rte.keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(
			rte.placeholder()!.style.getPropertyValue('--placeholder-font-size')
		).toBe('100px');
	});

	describe('with text block structure', () => {
		it('should add placeholder inside the block element', async () => {
			const rte = await setup([
				...features,
				new RteTextBlockStructure({
					blocks: [
						{ id: 'heading', label: 'Heading', semanticRole: 'heading-1' },
					],
				}),
			]);

			expect(rte.placeholder()!.parentElement!.tagName).toBe('H1');
		});
	});
});
