import { RTECore } from '../core';
import { setup } from '../../__tests__/test-utils';
import { RTEFreeformStructure } from '../freeform';
import { RTETextBlockStructure } from '../text-block';
import { RTEFontSizeFeature } from '../font-size';

describe('RTEPlaceholder', () => {
	it('should add placeholder widget when the document is empty', async () => {
		const { element, typeTextAtCursor } = await setup([
			new RTECore(),
			new RTEFreeformStructure(),
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
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEFontSizeFeature(),
		]);
		element.placeholder = 'Type here...';

		keydown('.', { ctrl: true, shift: true }); // Increase font size

		const placeholder = element.shadowRoot!.querySelector(
			'.placeholder'
		) as HTMLElement;
		expect(placeholder.style.getPropertyValue('--placeholder-font-size')).toBe(
			'18px'
		);
	});

	describe('with text block structure', () => {
		it('should add placeholder inside the block element', async () => {
			const { element } = await setup([
				new RTECore(),
				new RTETextBlockStructure({
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
