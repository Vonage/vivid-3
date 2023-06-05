import { fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { FilePicker } from './file-picker';
import { filePickerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-file-picker';

describe('vwc-file-picker', () => {
	let element: FilePicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as FilePicker;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-file-picker', async () => {
			expect(filePickerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(FilePicker);
		});
	});
});
