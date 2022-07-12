import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { Layout } from './layout';

const getClasses = ({
	columnBasis, gutters, columnSpacing, autoSizing
}: Layout) => classNames(
	'control',
	[`column-basis-${columnBasis}`, Boolean(columnBasis)],
	[`gutters-${gutters}`, Boolean(gutters)],
	[`column-spacing-${columnSpacing}`, Boolean(columnSpacing)],
	[`auto-sizing-${autoSizing}`, Boolean(autoSizing)],
);

/**
 * The template for the {@link @vonage/vivid#Layout} component.
 *
 * @returns {ViewTemplate<Layout>} A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const layoutTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Layout> = () => html`
        <div class="${getClasses}">
			<slot></slot>
		</div>`;
