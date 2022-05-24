import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import '../button';
import '../text-anchor';
import type { TopAppBar } from './top-app-bar';

const getClasses = (_: TopAppBar) => classNames(
  'control',
);

/**
 * The template for the {@link @microsoft/fast-foundation#TopAppBar} component.
 *
 * @param context
 * @public
 */
export const TopAppBarTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<TopAppBar> = () => {
  return html<TopAppBar>`
    <header class="top-app-bar ${getClasses}">
      <div class="top-app-bar__row">
        <section class="top-app-bar__section top-app-bar__section--align-start" id="navigation">
          <slot name="navigationIcon"></slot>
          <span class="top-app-bar__title"><slot name="title"></slot></span>
        </section>
        <section class="top-app-bar__section top-app-bar__section--align-end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
      </div>
    </header>
    <div class="top-app-bar--fixed-adjust">
      <slot></slot>
    </div>
	`;
};

