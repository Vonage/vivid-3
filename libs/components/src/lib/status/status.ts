import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of status connotation.
 *
 * @public
 */
export type StatusConnotation = ExtractFromEnum<
	Connotation,
	| Connotation.Success
	| Connotation.Information
	| Connotation.Warning
	| Connotation.Alert
>;

/**
 * @public
 * @component status
 * @slot - Description text below the title.
 * @slot icon - Optional custom icon. When not set, icon is derived from connotation.
 */
export class Status extends AffixIcon(VividElement) {
	/**
	 * The status title (e.g. "Positive", "Info", "Warning", "Alert").
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: status
	 */
	@attr status?: string;

	/**
	 * The connotation the status should have. Determines icon and color.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: StatusConnotation;
}
