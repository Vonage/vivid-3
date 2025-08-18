import { attr } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Appearance } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of divider appearance.
 *
 * @public
 */
export type DividerAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Ghost | Appearance.Subtle
>;

/**
 * @deprecated This will be removed along with the divider's role attribute
 * Divider roles
 * @public
 */
export const DividerRole = {
	/**
	 * The divider semantically separates content
	 */
	separator: 'separator',

	/**
	 * The divider has no semantic value and is for visual presentation only.
	 */
	presentation: 'presentation',
} as const;

/**
 * @deprecated This will be removed along with the divider's role attribute
 * The types for Divider roles
 * @public
 */
type DividerRole = typeof DividerRole[keyof typeof DividerRole];

/**
 * @public
 * @component divider
 */
export class Divider extends HostSemantics(VividElement) {
	/**
	 * The role of the element. This property will be removed
	 *
	 * @deprecated This property will be deprecated, as divider shouldn't be announced by screen readers. Please update your usages.
	 * @public
	 * @remarks
	 * HTML Attribute: role
	 */
	override role: DividerRole = DividerRole.separator;

	/**
	 * The orientation of the divider.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	@attr orientation: Orientation = Orientation.horizontal;

	/**
	 * The appearance of the divider.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	// eslint-disable-next-line @repo/repo/no-attribute-default-value
	@attr appearance?: DividerAppearance = Appearance.Ghost;
}
