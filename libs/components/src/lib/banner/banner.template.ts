import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Banner } from './banner';

const getClasses = (_: Banner) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Banner} component.
 *
 * @param context
 * @public
 */
export const BannerTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Banner> = () => html<Banner>`
      <div class="banner ${getClasses}" tabindex="0">
				<header class="header">
					<span class="user-content">
						<div class="banner--message">${x => x.message}</div>
					</span>
				</header>
			</div>
`;
