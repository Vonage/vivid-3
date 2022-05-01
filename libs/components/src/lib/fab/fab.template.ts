import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Fab, FabAppearance } from './fab';
import { Focus } from '../focus/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';

const getAppearanceClassName = (appearance: FabAppearance, disabled: boolean) => {
	let className = `appearance-${appearance}`;
	disabled && (className += ' disabled');
	return className;
};

const getClasses = ({
  connotation, appearance, icon, label, iconTrailing, disabled
}: Fab) => classNames(
  'control',
  [`connotation-${connotation}`, Boolean(connotation)],
  [getAppearanceClassName(appearance as FabAppearance, disabled), Boolean(appearance)],
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
      <vwc-elevation dp="24">
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
