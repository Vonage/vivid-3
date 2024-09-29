import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { Shape } from '../enums';
import { AffixIcon } from '../../shared/patterns/affix';
import { Localized } from '../../shared/patterns';

export type OptionTagShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

export class OptionTag extends FoundationElement {
	@attr shape?: OptionTagShape;
	@attr label?: string;
	@attr({ mode: 'boolean' }) removable = false;
	@attr({ mode: 'boolean' }) disabled = false;

	_onClickRemove() {
		this.$emit('remove', undefined, {
			bubbles: false,
		});
	}
}

export interface OptionTag extends AffixIcon, Localized {}
applyMixins(OptionTag, AffixIcon, Localized);
