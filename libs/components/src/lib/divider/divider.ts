import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { Orientation } from '@microsoft/fast-web-utilities';

/**
 * Divider roles
 * @public
 */
const DividerRole = {
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
 * The types for Divider roles
 * @public
 */
type DividerRole = typeof DividerRole[keyof typeof DividerRole];

/**
 * @public
 * @component divider
 */
export class Divider extends FoundationElement {
	/**
	 * The role of the element.
	 *
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
