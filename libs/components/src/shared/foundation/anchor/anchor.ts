import { attr } from '@microsoft/fast-element';

/**
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 */
export class Anchor {
	/**
	 * Prompts the user to save the linked URL. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: download
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	download: string;

	/**
	 * The URL the hyperlink references. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: href
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	href: string;

	/**
	 * Hints at the language of the referenced resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: hreflang
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	hreflang: string;

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: ping
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	ping: string;

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: referrerpolicy
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	referrerpolicy: string;

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: rel
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	rel: string;

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: target
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	target: '_self' | '_blank' | '_parent' | '_top';

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: type
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	type: string;

	/**
	 * References the root element
	 */
	control: HTMLAnchorElement | undefined;
}
