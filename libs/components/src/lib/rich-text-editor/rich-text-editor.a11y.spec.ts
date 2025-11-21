import { axe, fixture } from '@repo/shared';
import { RichTextEditor } from './rich-text-editor';
import '.';
import { RTECore } from './rte/features/core';
import { RTEConfig } from './rte/config';
import { RTEFreeformStructure } from './rte/features/freeform';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('a11y: vwc-rich-text-editor', () => {
	let element: RichTextEditor;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RichTextEditor;
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure()]);
		element.instance = config.instantiateEditor();
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
