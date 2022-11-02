import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Switch } from './switch';

const getClasses = (_: Switch) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Switch} component.
 *
 * @param context
 * @public
 */
export const SwitchTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Switch> = (context: ElementDefinitionContext) => html` <span
	class="${getClasses}"
	>${context.name}
</span>`;
