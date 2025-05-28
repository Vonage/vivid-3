import { attr, html, ref, ViewTemplate } from '@microsoft/fast-element';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { delegateAria, DelegatesAria } from '../aria/delegates-aria';
import type { BoundAriaProperties } from '../aria/delegate-aria-behavior';

/**
 * Mixin for components that can be links, inherits attributes from {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 */
export const Linkable = <T extends Constructor<VividElement>>(Base: T) => {
	class LinkableElement extends DelegatesAria(Base) {
		/**
		 * Prompts the user to save the linked URL. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: download
		 */
		@attr download?: string;

		/**
		 * The URL the hyperlink references. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: href
		 */
		@attr href?: string;

		/**
		 * Hints at the language of the referenced resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: hreflang
		 */
		@attr hreflang?: string;

		/**
		 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: ping
		 */
		@attr ping?: string;

		/**
		 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: referrerpolicy
		 */
		@attr referrerpolicy?: string;

		/**
		 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: rel
		 */
		@attr rel?: string;

		/**
		 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: target
		 */
		@attr target?: '_self' | '_blank' | '_parent' | '_top';

		/**
		 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
		 * @public
		 * @remarks
		 * HTML Attribute: type
		 */
		@attr type?: string;

		/**
		 * References the root element
		 */
		control!: HTMLAnchorElement;

		/**
		 * Helper function for rendering link elements
		 * @internal
		 */
		_renderLinkElement = <T extends LinkableElement>(
			content: ViewTemplate<T>,
			cssClass?: string | ((el: T) => string),
			boundAriaProperties?: BoundAriaProperties<unknown>
		) => {
			return html<T>`<a
				class="${(x) =>
					typeof cssClass === 'function' ? cssClass(x) : cssClass}"
				download="${(x) => x.download}"
				href="${(x) => x.href}"
				hreflang="${(x) => x.hreflang}"
				ping="${(x) => x.ping}"
				referrerpolicy="${(x) => x.referrerpolicy}"
				rel="${(x) => x.rel}"
				target="${(x) => x.target}"
				type="${(x) => x.type}"
				${ref('control')}
				${delegateAria?.call(this, boundAriaProperties)}
			>
				${content}
			</a>`;
		};
	}

	return LinkableElement;
};

export type LinkableElement = MixinType<typeof Linkable>;
