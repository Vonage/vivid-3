import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TopAppBar } from './top-app-bar';

const getClasses = ({ fixed, density, alternate }: TopAppBar) => classNames(
  'control',
  ['fixed', fixed],
  [`density-${density}`, Boolean(density)],
  ['alternate', alternate],
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
    <header class="${getClasses}" part="${(x) => x.alternate ? 'vvd-theme-alternate' : ''}">
        <section class="header-content start" id="navigation">
          <slot name="meta"></slot>
          ${when(x => x.heading, html<TopAppBar>`<span class="heading">${x => x.heading}</span>`)}
        </section>
        <section class="header-content end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
    </header>
    <div class="app-content">
		  <slot name="app-content"></slot>
	  </div>
	`;
};
