import { observable } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../../utils/mixins';
import type { FormElementElement } from './form-element';

/**
 * Mixin for elements that can display optional contextual help for the label.
 */
export const WithContextualHelp = <T extends Constructor<FormElementElement>>(
	Base: T
) => {
	/**
	 * @public
	 * @slot contextual-help - Slot for the contextual-help component, displayed next to the label.
	 */
	class ElementWithContextualHelp extends Base {
		/**
		 * @internal
		 */
		@observable _contextualHelpSlottedContent?: HTMLElement[];

		/**
		 * @internal
		 */
		get _hasContextualHelp(): boolean {
			return (this.contextualHelpSlottedContent?.length ?? 0) > 0;
		}
	}

	return ElementWithContextualHelp;
};

export type ElementWithContextualHelp = MixinType<typeof WithContextualHelp>;
