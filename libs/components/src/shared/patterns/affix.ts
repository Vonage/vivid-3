import type { ViewTemplate } from '@microsoft/fast-element';
import { attr, html, observable, slotted } from '@microsoft/fast-element';
import { Icon } from '../../lib/icon/icon';
import type { VividElementDefinitionContext } from '../design-system/defineVividComponent';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor, MixinType } from '../utils/mixins';

/**
 * A mixin class implementing prefix elements.
 * These are generally used to decorate text elements with icons or other visual indicators.
 */
export const AffixIcon = <T extends Constructor<VividElement>>(Base: T) => {
	/**
	 * @testQuery icon affixIcon
	 */
	class AffixIconElement extends Base {
		/**
		 * A decorative icon the custom element should have.
		 * @deprecated Use the icon slot instead. This attribute will be removed in a future versions.
		 * @public
		 * @remarks
		 * HTML Attribute: icon
		 */
		@attr icon?: string;
		/**
		 * @internal
		 */
		@observable iconSlottedContent?: HTMLElement[];
	}

	return AffixIconElement;
};

export type AffixIconElement = MixinType<typeof AffixIcon>;

/**
 * A mixin class implementing icon affix (prefix or suffix) alignment.
 */
export const AffixIconWithTrailing = <T extends Constructor<VividElement>>(
	Base: T
) => {
	class AffixIconWithTrailingElement extends AffixIcon(Base) {
		/**
		 * Indicates the icon affix alignment.
		 *
		 * @public
		 * @remarks
		 * HTML Attribute: icon-trailing
		 */
		@attr({
			mode: 'boolean',
			attribute: 'icon-trailing',
		})
		iconTrailing = false;
	}

	return AffixIconWithTrailingElement;
};

export const IconWrapper = {
	Slot: false,
	Span: true,
};

export const IconAriaHidden = {
	Hidden: 'true',
	Visible: 'false',
};

type affixIconTemplateFactoryReturnType = (
	context: VividElementDefinitionContext
) => (
	icon?: string,
	slottedState?: boolean,
	ariaHidden?: string,
	announcement?: {
		label: string;
		announceOnUpdate?: boolean;
	}
) => ViewTemplate<AffixIconElement> | null;
/**
 * The template for the prefixed element.
 * For use with {@link AffixIcon}
 *
 * @param context - element definition context
 * @public
 */
export const affixIconTemplateFactory: affixIconTemplateFactoryReturnType = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	return (
		icon,
		slottedState = IconWrapper.Span,
		ariaHidden = IconAriaHidden.Hidden,
		announcement = { label: '', announceOnUpdate: false }
	) => {
		if (!icon && !slottedState) {
			return html`<slot
				name="icon"
				aria-hidden="${() => ariaHidden}"
				${slotted('iconSlottedContent')}
			></slot>`;
		}
		if (!icon && slottedState) {
			return null;
		}

		const iconTemplate = html`<${iconTag} :name="${() => icon}" :label="${() =>
			announcement?.label || undefined}"></${iconTag}>`;
		const wrapperTag = html.partial(slottedState ? 'span' : 'slot');

		return html`<${wrapperTag}
					class="${() => (slottedState ? 'icon' : undefined)}"
					:name="${() => (slottedState ? undefined : 'icon')}"
					aria-hidden="${() => (announcement?.label ? false : ariaHidden)}"
					:role="${() => (announcement?.announceOnUpdate ? 'status' : undefined)}"
					:ariaLive="${() => (announcement?.announceOnUpdate ? 'polite' : undefined)}"
			  >
					${iconTemplate}
			  </${wrapperTag}>`;
	};
};
