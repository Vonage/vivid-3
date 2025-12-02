import { RteCore } from '../core';
import { setup } from '../../__tests__/test-utils';
import { RteFreeformStructure } from '../freeform';
import { RteTextBlockStructure } from '../text-block';
import { RteFontSizeFeature } from '../font-size';

describe('RtePlaceholder', () => {
	it('should add placeholder widget when the document is empty', async () => {
		const { element, typeTextAtCursor } = await setup([
			new RteCore(),
			new RteFreeformStructure(),
		]);

		element.placeholder = 'Type here...';

		const placeholder = element.shadowRoot!.querySelector(
			'.placeholder'
		) as HTMLElement;
		expect(placeholder.dataset.placeholder).toBe('Type here...');

		await typeTextAtCursor('Hello');

		expect(element.shadowRoot!.querySelector('.placeholder')).toBeNull();
	});

	it('should apply font size to the placeholder', async () => {
		const { element, keydown } = await setup([
			new RteCore(),
			new RteFreeformStructure(),
			new RteFontSizeFeature({
				options: [
					{ size: '100px', label: 'Large' },
					{ size: '10px', label: 'Small' },
				],
				defaultSize: '10px',
			}),
		]);
		element.placeholder = 'Type here...';

		keydown('.', { ctrl: true, shift: true }); // Increase font size

		const placeholder = element.shadowRoot!.querySelector(
			'.placeholder'
		) as HTMLElement;
		expect(placeholder.style.getPropertyValue('--placeholder-font-size')).toBe(
			'100px'
		);
	});

	describe('with text block structure', () => {
		it('should add placeholder inside the block element', async () => {
			const { element } = await setup([
				new RteCore(),
				new RteTextBlockStructure({
					blocks: [
						{ id: 'heading', label: 'Heading', semanticRole: 'heading-1' },
					],
				}),
			]);

			element.placeholder = 'Type here...';

			expect(
				element.shadowRoot!.querySelector('h1 > .placeholder')
			).toBeInstanceOf(HTMLElement);
		});
	});
});
