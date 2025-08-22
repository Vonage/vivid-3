import {
	html,
	observable,
	slotted,
	ViewTemplate,
} from '@microsoft/fast-element';
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
		 * Helper function to render label and contextual-help, with customizable label template.
		 */
		_renderLabelWithContextualHelp(
			context: VividElementDefinitionContext,
			customLabelTemplate?: ViewTemplate<ElementWithContextualHelp>
		) {
			const contextualHelpTag = context.tagFor(ContextualHelp);
			const defaultLabelTemplate = html<ElementWithContextualHelp>`
				<label class="label" for="control">${(x) => x.label}</label>
			`;
			const labelTemplate = customLabelTemplate || defaultLabelTemplate;

			return html<ElementWithContextualHelp>`
				<div class="label-container">
					${labelTemplate}
					<${contextualHelpTag} ?hidden="${(x) => !x._shouldShowContextualHelp}">
          	<slot 
						name="contextual-help-icon" 
						slot="${(x) =>
							x.contextualHelpIconSlottedContent?.length ? 'icon' : undefined}"
							${slotted('contextualHelpIconSlottedContent')}
						></slot>
						<slot name="contextual-help" ${slotted('contextualHelpSlottedContent')}></slot>
					</${contextualHelpTag}>
				</div>
			`;
		}
	}

	return ElementWithContextualHelp;
};

export type ElementWithContextualHelp = MixinType<typeof WithContextualHelp>;
