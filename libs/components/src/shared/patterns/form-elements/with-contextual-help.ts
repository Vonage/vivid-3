import { html, observable, slotted } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../../utils/mixins';
import type { VividElementDefinitionContext } from '../../design-system/defineVividComponent';
import { ContextualHelp } from '../../../lib/contextual-help/contextual-help';
import type { FormElementElement } from './form-element';

/**
 * Mixin for elements that can display optional contextual help for the label.
 */
export const WithContextualHelp = <T extends Constructor<FormElementElement>>(
	Base: T
) => {
	/**
	 * @public
	 * @slot contextual-help - The contextual help content.
	 * @slot contextual-help-icon - Override the default icon shown in the contextual-help button.
	 */
	class ElementWithContextualHelp extends Base {
		/**
		 * @internal
		 */
		@observable contextualHelpSlottedContent?: HTMLElement[];
		@observable contextualHelpIconSlottedContent?: HTMLElement[];

		/**
		 * @internal
		 * Computed property to determine if both label and contextual-help slot are present.
		 */
		get _shouldShowContextualHelp(): boolean {
			return !!(this.label && this.contextualHelpSlottedContent?.length);
		}

		/**
		 * @internal
		 * Helper function to render contextual-help with slots
		 */
		_renderContextualHelp(context: VividElementDefinitionContext) {
			const contextualHelpTag = context.tagFor(ContextualHelp);
			return html<ElementWithContextualHelp>`
				<${contextualHelpTag} ?hidden="${(x) => !x._shouldShowContextualHelp}">
					<slot 
						name="contextual-help-icon" 
						slot="${(x) =>
							x.contextualHelpIconSlottedContent?.length ? 'icon' : undefined}"
						${slotted('contextualHelpIconSlottedContent')}
					></slot>
					<slot name="contextual-help" ${slotted('contextualHelpSlottedContent')}></slot>
				</${contextualHelpTag}>
			`;
		}
	}

	return ElementWithContextualHelp;
};

export type ElementWithContextualHelp = MixinType<typeof WithContextualHelp>;
