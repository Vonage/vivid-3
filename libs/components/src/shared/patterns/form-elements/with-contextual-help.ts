import { attr, html, ViewTemplate } from '@microsoft/fast-element';
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
	class ElementWithContextualHelp extends Base {
		/**
		 * Optional string content for the helper, exposed as `contextual-help` attribute.
		 * @public
		 * @remarks
		 * HTML Attribute: contextual-help
		 */
		@attr({ attribute: 'contextual-help' }) contextualHelp?: string;

		/**
		 * @internal
		 * Computed property to determine if both label and contextual-help attribute are present
		 */
		get _shouldShowContextualHelp(): boolean {
			return !!(this.label && this.contextualHelp);
		}

		/**
		 * @internal
		 * Helper to render label + contextual-help, with customizable label template
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
					${(x) =>
						x._shouldShowContextualHelp
							? html`
                  <${contextualHelpTag}>
                    ${(x) => x.contextualHelp}
                  </${contextualHelpTag}>
                `
							: null}
				</div>
			`;
		}
	}

	return ElementWithContextualHelp;
};

export type ElementWithContextualHelp = MixinType<typeof WithContextualHelp>;
