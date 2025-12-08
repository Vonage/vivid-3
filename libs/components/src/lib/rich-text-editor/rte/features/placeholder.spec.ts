import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteFontSizePickerFeature } from './font-size-picker';
import { RtePlaceholderFeature } from './placeholder';

const { heading1 } = docFactories;

const features = [
	new RteBase({ heading1: true }),
	new RtePlaceholderFeature({ text: 'placeholder text' }),
];

describe('RtePlaceholder', () => {
	it('should add placeholder widget when the document is empty', async () => {
		const rte = await setup(features);

		expect(rte.placeholder()!.dataset.placeholder).toBe('placeholder text');

		await rte.typeTextAtCursor('Hello');

		expect(rte.placeholder()).toBeNull();
	});

	it('should apply font size to the placeholder', async () => {
		const rte = await setup([
			...features,
			new RteFontSizePickerFeature({
				options: [
					{ size: '100px', label: 'Large' },
					{ size: '10px', label: 'Small' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '10px' }],
			}),
		]);

		rte.keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(
			rte.placeholder()!.style.getPropertyValue('--placeholder-font-size')
		).toBe('100px');
	});

	it('should add placeholder inside the block element', async () => {
		const rte = await setup(features, [heading1('Heading')]);

		rte.selectText('[Heading]');
		rte.keydown('Backspace');

		expect(rte.placeholder()!.parentElement!.tagName).toBe('H1');
	});
});
