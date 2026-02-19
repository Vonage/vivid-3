import { setup } from '../__tests__/test-utils';
import { RteConfig } from '../config';
import { RteBase } from './base';
import { RteToolbarFeature } from './toolbar';
import { RteToolbarButtonFeature } from './toolbar-button';
import { RteLinkFeature } from './link';

const featuresWithToolbarButton = (
	label: string,
	icon: string,
	text: string,
	order?: number
): ConstructorParameters<typeof RteConfig>[0] => [
	new RteBase(),
	new RteToolbarFeature(),
	new RteToolbarButtonFeature('test', {
		label,
		icon,
		action: { type: 'insert-text', text },
		order,
	}),
];

describe('RteToolbarButtonFeature', () => {
	it('should add a toolbar button with the specified label and icon', async () => {
		const rte = await setup(
			featuresWithToolbarButton('Insert @', 'at-line', '@')
		);

		const button = rte.toolbarButton('Insert @');

		expect(button).not.toBeNull();
	});

	describe('action: insert-text', () => {
		it('should insert the specified text at cursor position', async () => {
			const rte = await setup(
				featuresWithToolbarButton('Insert @', 'at-line', '@')
			);

			await rte.click(rte.toolbarButton('Insert @'));

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('@|')"`);
		});
	});

	describe('order', () => {
		it('should order buttons by their order option after built in buttons', async () => {
			const rte = await setup([
				new RteBase(),
				new RteToolbarFeature(),
				new RteLinkFeature(),
				new RteToolbarButtonFeature('second', {
					label: 'Second',
					icon: 'icon-2',
					action: { type: 'insert-text', text: '2' },
					order: 10,
				}),
				new RteToolbarButtonFeature('first', {
					label: 'First',
					icon: 'icon-1',
					action: { type: 'insert-text', text: '1' },
					order: -5,
				}),
				new RteToolbarButtonFeature('third', {
					label: 'Third',
					icon: 'icon-3',
					action: { type: 'insert-text', text: '3' },
					order: 15,
				}),
			]);

			const linkBtn = rte.toolbarButton('Hyperlink');
			const firstBtn = rte.toolbarButton('First');
			const secondBtn = rte.toolbarButton('Second');
			const thirdBtn = rte.toolbarButton('Third');

			const isBefore = (a: Element, b: Element) =>
				(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
			expect(isBefore(linkBtn, firstBtn)).toBe(true);
			expect(isBefore(firstBtn, secondBtn)).toBe(true);
			expect(isBefore(secondBtn, thirdBtn)).toBe(true);
		});
	});
});
