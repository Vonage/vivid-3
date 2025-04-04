import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Shape } from '../enums';
import { Localized } from '../../shared/patterns';
import type { ExtractFromEnum } from '../../shared/utils/enums';

export type OptionTagShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;

export class OptionTag extends Localized(VividElement) {
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
