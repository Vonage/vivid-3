import {applyMixins, TextField as FoundationTextfield} from '@microsoft/fast-foundation';
import {attr, observable, volatile} from '@microsoft/fast-element';
import type {Appearance, Density, Shape} from '../enums';
import {AffixIcon} from '../../shared/patterns';

type TextFieldDensity = Extract<Density, Density.Normal | Density.Extended>;
type TextFieldAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for text-field
 *
 * @public
 */
export class TextField extends FoundationTextfield {
	@attr label?: string;
	@attr({attribute: 'helper-text'}) helperText?: string;
	@attr({
		attribute: 'char-count',
		mode: 'boolean'
	}) charCount = false;
	@attr density?: TextFieldDensity;
	@attr appearance?: TextFieldAppearance;
	@attr shape?: TextFieldShape;
	@observable userValid = true;

	@volatile
	get errorValidationMessage() {
		return this.userValid ? '' : this.validationMessage;
	}

	override validate() {
		super.validate();
		if (this.proxy instanceof HTMLElement) {
			this.userValid = this.dirtyValue ? !Boolean(this.validationMessage) : true;
		}
	}
}

export interface TextField extends AffixIcon {}
applyMixins(TextField, AffixIcon);
