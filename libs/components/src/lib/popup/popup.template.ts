import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Elevation } from '../elevation/elevation';
// import { Button } from '../button/button';
import type { Popup } from './popup';

// const getClasses = ({
// 	_open: open, dismissible, alternate
// }: Popup) => classNames(
// 	'control',
// 	['open', Boolean(open)],
// 	['dismissible', Boolean(dismissible)],
// 	['alternate', Boolean(alternate)]
// );

/**
 * The template for the {@link @vonage/vivid#Popup} component.
 *
 * @param context
 * @returns {ViewTemplate<Popup>} A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const popupTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Popup> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	// const buttonTag = context.tagFor(Button);

	return html`<${elevationTag}></${elevationTag}>`;
};


