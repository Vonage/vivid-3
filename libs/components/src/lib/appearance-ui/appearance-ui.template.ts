import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { AppearanceUi } from './appearance-ui';

const getClasses = ({connotation, appearance, hovered, active, selected, disabled, readonly} : AppearanceUi) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	['hover', Boolean(hovered)],
	['active', Boolean(active)],
	['checked selected', Boolean(selected)],
	['disabled', Boolean(disabled)],
	['readonly', Boolean(readonly)],
);


/**
 * The template for the AppearanceUi component.
 *
 * @param context - element definition context
 * @public
 */
export const AppearanceUiTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AppearanceUi> = (
) => html` <span class="${getClasses}">VIVID</span>`;
