import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TopAppBar } from './top-app-bar';

const getClasses = ({ fixed, density }: TopAppBar) => classNames(
  'control',
  ['fixed', fixed],
	[`density-${density}`, Boolean(density)],
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
    <header class="${getClasses}">
        <section class="header-content start" id="navigation">
          <slot name="meta"></slot>
          <span class="heading">lalala</span>
        </section>
        <section class="header-content end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
    </header>
    <div class="app-content">
		  <slot></slot>
	  </div>
	`;
};

