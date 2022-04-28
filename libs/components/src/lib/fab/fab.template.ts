import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Fab } from './fab';
import { Focus } from '../focus/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';

const getClasses = ({
  connotation, icon, label, iconTrailing
}: Fab) => classNames('control',
  [`connotation-${connotation}`, Boolean(connotation)],
  ['icon-only', !label && !!icon],
  ['icon-trailing', iconTrailing]);

const focusTemplate = (context: ElementDefinitionContext) => {
  const focusTag = context.tagFor(Focus);
  return html`<${focusTag} class="focus-indicator"></${focusTag}>`;
};

/**
 * The template for the {@link @microsoft/fast-foundation#Fab} component.
 *
 * @param context
 * @public
 */
export const FabTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Fab> = (context: ElementDefinitionContext) => {
      const affixIconTemplate = affixIconTemplateFactory(context);

      return html`
      <vwc-elevation>
        <button
          class="${getClasses}"
          ?disabled="${(x) => x.disabled}"
          aria-label="${(x) => x.ariaLabel}">
          ${() => focusTemplate(context)}
          ${x => affixIconTemplate(x.icon)}
          ${(x) => x.label}
        </button>
      </vwc-elevation>`;
      };
