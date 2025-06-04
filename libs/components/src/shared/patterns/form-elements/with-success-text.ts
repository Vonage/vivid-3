import { attr } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../../utils/mixins';
import type { VividElement } from '../../foundation/vivid-element/vivid-element';

/**
 * Mixin for elements that can display a success text.
 */
export const WithSuccessText = <T extends Constructor<VividElement>>(
	Base: T
) => {
	class ElementWithSuccessText extends Base {
		/**
		 * Provides a custom success message. Any current error state will be overridden.
		 * @public
		 * @remarks
		 * HTML Attribute: success-text
		 */
		@attr({ attribute: 'success-text' }) successText?: string;
	}

	return ElementWithSuccessText;
};

export type ElementWithSuccessText = MixinType<typeof WithSuccessText>;
