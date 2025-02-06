import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import type { Button } from '../button/button';
import { Size } from '../enums';
import { setLocale } from '../../shared/localization';
import deDE from '../../locales/de-DE';
import enUS from '../../locales/en-US';
import { FilePicker } from './file-picker';
import '.';

const COMPONENT_TAG = 'vwc-file-picker';

async function generateFile(
	fileName: string,
	sizeMb: number,
	type = 'text/plain'
): Promise<File> {
	const blob = new Blob(['x'.repeat(sizeMb * 1024 * 1024)], { type });
	return new File([blob], fileName, { type: blob.type });
}

function getHiddenInput() {
	return document.querySelector('input[type=file]') as HTMLInputElement;
}

function addFiles(files: File[]) {
	// Use hidden input element that dropzone adds to the body to add files
	const hiddenInput = getHiddenInput();
	Object.defineProperty(hiddenInput, 'files', {
		value: files,
	});
	hiddenInput.dispatchEvent(new Event('change'));
}

describe('a11y: vwc-file-picker', () => {
	let element: FilePicker;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

	beforeEach(async () => {
		element = fixture(
			`<${COMPONENT_TAG}>Drag & drop or click to upload</${COMPONENT_TAG}>`
		) as FilePicker;
	});

	it('should pass html a11y test', async () => {
    element.label = 'Test label';
    element.helperText = 'Helper text';
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});