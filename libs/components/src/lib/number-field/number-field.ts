import {attr} from '@microsoft/fast-element';
import {TextField} from '../text-field/text-field';

/**
 * Base class for number-field
 *
 * @public
 */
export class NumberField extends TextField {
	@attr() step?: number;
}
