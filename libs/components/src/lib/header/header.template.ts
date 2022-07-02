import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import type { Header } from './header';

const getPartAlternate = ({ alternate }: Header) => classNames(
	['vvd-theme-alternate', Boolean(alternate)],
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
) => ViewTemplate<Header> = (context) => {
	const elevationTag = context.tagFor(Elevation);

	return html<Header>`
    <${elevationTag} dp="4" ?no-shadow=${x => !x.elevationShadow}>
      <header class="base" part="base">
        <!-- a container is needed to distinguish the surface background color of the
        element from its shadow when applying elevation with alternate -->
        <div class="container" part="${getPartAlternate}">
          <section class="header-content start">
            <slot></slot>
          </section>
          <section class="header-content end" id="actions" role="toolbar">
            <slot name="actionItems"></slot>
          </section>
        </div>
      </header>
    </${elevationTag}>
    <div class="app-content">
      <slot name="app-content"></slot>
    </div>
	`;
};
