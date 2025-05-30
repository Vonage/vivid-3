import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Connotation, Shape } from '../enums';
import { Localized } from '../../shared/patterns';
import type { ExtractFromEnum } from '../../shared/utils/enums';

export type OptionTagShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;

export type OptionTagConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

export class OptionTag extends Localized(VividElement) {
	@attr shape?: OptionTagShape;
	@observable connotation?: OptionTagConnotation;
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
