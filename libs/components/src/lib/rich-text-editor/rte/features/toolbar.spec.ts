import { setup } from '../__tests__/test-utils';
import { Divider } from '../../../divider/divider';
import { RTECore } from './core';
import { RTEToolbarFeature } from './toolbar';
import { RTETextBlockStructure } from './text-block';

const features = [
	new RTECore(),
	new RTETextBlockStructure(),
	new RTEToolbarFeature(),
];

describe('RTEToolbarFeature', () => {
	it('should render toolbar items in order and separated by dividers', async () => {
		const { element, toolbarButton, toolbarSelect } = await setup(features);

		const toolbar = element.shadowRoot!.querySelector('.toolbar')!;

		expect(toolbar.children[0].contains(toolbarButton('Undo'))).toBe(true);
		expect(toolbar.children[1].contains(toolbarButton('Redo'))).toBe(true);
		expect(toolbar.children[2]).toBeInstanceOf(Divider);
		expect(
			toolbar.children[3].contains(toolbarSelect('Paragraph styles'))
		).toBe(true);
		expect(
			toolbar.querySelectorAll('[data-vvd-component="divider"]').length
		).toBe(1);
	});
});
