import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import type { Header } from './header';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getPartAlternate = ({ alternate }: Header) =>
	classNames(['vvd-theme-alternate', Boolean(alternate)]);

export const headerTemplate = (context: VividElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);

	return html<Header>`
    <${elevationTag} dp="4" ?no-shadow=${(x) => !x.elevationShadow}>
      <header class="base" part="base">
        <!-- a container is needed to distinguish the surface background color of the
        element from its shadow when applying elevation with alternate -->
        <div class="container" part="${getPartAlternate}">
          <section class="header-content">
            <slot></slot>
          </section>
          <section class="header-content">
            <slot name="action-items"></slot>
          </section>
        </div>
      </header>
    </${elevationTag}>
    <div class="app-content">
      <slot name="app-content"></slot>
    </div>
	`;
};
