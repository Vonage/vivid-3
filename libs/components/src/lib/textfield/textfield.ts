import { TextField as FoundationTextfield } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for textfield
 *
 * @public
 */
export class Textfield extends FoundationTextfield {
	@attr label?: string;
}
