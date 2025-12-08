import { axe, fixture } from '@repo/shared';
import { RichTextEditor } from './rich-text-editor';
import '.';
import { RteBase } from './rte/features/base';
import { RteConfig } from './rte/config';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('a11y: vwc-rich-text-editor', () => {
	let element: RichTextEditor;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RichTextEditor;
		const config = new RteConfig([new RteBase()]);
		element.instance = config.instantiateEditor();
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
