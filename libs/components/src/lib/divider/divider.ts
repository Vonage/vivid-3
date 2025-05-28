import { attr } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

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
export class Divider extends DelegatesAria(VividElement) {
	/**
	 * The role of the element. This property will be removed
	 *
	 * @deprecated This property will be deprecated, as divider shouldn't be announced by screen readers. Please update your usages.
	 * @public
	 * @remarks
	 * HTML Attribute: role
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr override role: DividerRole = DividerRole.separator;

	/**
	 * The orientation of the divider.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr orientation: Orientation = Orientation.horizontal;
}
