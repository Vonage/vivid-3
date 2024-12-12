import { attr, observable } from '@microsoft/fast-element';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Shape } from '../enums';
import { Localized } from '../../shared/patterns';

export type OptionTagShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

export class OptionTag extends VividElement {
	@attr shape?: OptionTagShape;
	@attr label?: string;
	@attr({ mode: 'boolean' }) removable = false;
	@attr({ mode: 'boolean' }) disabled = false;
	@observable hasIconPlaceholder = false;

	_onClickRemove() {
		this.$emit('remove', undefined, {
			bubbles: false,
		});
	}
}

export interface OptionTag extends Localized {}
applyMixins(OptionTag, Localized);
