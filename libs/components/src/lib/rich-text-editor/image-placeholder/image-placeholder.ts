import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../../shared/foundation/vivid-element/vivid-element';

export class ImagePlaceholder extends VividElement {
	@attr({ attribute: 'file-name' })
	fileName?: string;

	@attr({ attribute: 'size' })
	size?: string;

	@attr({ attribute: 'error-message' })
	errorMessage?: string;

	@attr({ attribute: 'icon' })
	icon?: string;
}
