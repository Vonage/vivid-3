import {elementUpdated, fixture} from '@vivid-nx/shared';
import { TextArea } from './text-area';
import '.';

const COMPONENT_TAG_NAME = 'vwc-text-area';

// function getRootElement(element: TextArea) {
// 	return element.shadowRoot?.querySelector('.base') as HTMLElement;
// }
//
// function getTextareaElement(element: TextArea) {
// 	return element.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
// }

describe('vwc-text-area', () => {
	let element: TextArea;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG_NAME}></${COMPONENT_TAG_NAME}>`
		)) as TextArea;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-field', async () => {
			expect(element)
				.toBeInstanceOf(TextArea);
		});
	});

	describe(`label`, function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeTruthy();
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});
	});
});
