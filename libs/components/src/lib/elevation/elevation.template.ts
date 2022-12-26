import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { Elevation } from './elevation';

const getClasses = ({
	dp, noShadow
}: Elevation) => classNames(
	'control',
	[`dp-${dp}`, Boolean(dp)],
	['no-shadow', Boolean(noShadow)],
);

/**
 *
 * @returns ViewTemplate<Elevation> -A template capable of creating HTMLView instances or rendering directly to DOM.
 */
export const elevationTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Elevation> = () => html`
        <div class="${getClasses}" part="base">
			<slot></slot>
		</div>`;
