import {TextField as FoundationTextfield} from '@microsoft/fast-foundation';
import {attr, observable, volatile} from '@microsoft/fast-element';
import type {Appearance, BlockSize, Shape} from '../enums';

type TextFieldSize = Extract<BlockSize, BlockSize.Condensed | BlockSize.Normal | BlockSize.Extended>;
type TextFieldAppearance = Extract<Appearance,  Appearance.Outlined | Appearance.Ghost>;
type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for textfield
 *
 * @public
 */
export class Textfield extends FoundationTextfield {
	@attr label?: string;
	@attr({attribute: 'helper-text'}) helperText?: string;
	@attr({attribute: 'char-count', mode: 'boolean'}) charCount = false;
	@attr density?: TextFieldSize;
	@attr appearance?: TextFieldAppearance;
	@attr shape?: TextFieldShape;
	@observable isValid = true;

	@volatile
	get errorValidationMessage() {
		return this.isValid ? '' : this.validationMessage;
	}

	override validate() {
		super.validate();
		if (this.proxy instanceof HTMLElement) {
			this.isValid = this.dirtyValue ? !Boolean(this.validationMessage) : true;
		}
	}
}
