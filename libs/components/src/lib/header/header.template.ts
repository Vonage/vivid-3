import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Header } from './header';

const getClasses = ({ fixed, alternate, elevated }: Header) => classNames(
	'base',
	['fixed', Boolean(fixed)],
	['alternate', Boolean(alternate)],
	['elevated', Boolean(elevated)],
);

/**
 * The template for the {@link @microsoft/fast-foundation#header} component.
 *
 * @param context
 * @public
 */
export const headerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Header> = () => {
	return html<Header>`
    <header class="${getClasses}" part="${(x) => x.alternate ? 'vvd-theme-alternate' : ''}">
        <section class="header-content start" id="navigation">
          <slot></slot>
          ${when(x => x.heading, html<Header>`<span class="heading">${x => x.heading}</span>`)}
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
