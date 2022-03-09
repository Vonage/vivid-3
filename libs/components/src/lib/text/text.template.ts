import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Text } from './text';

const getClasses = ({connotation, fontFace}: Text) =>
	classNames(
		'control',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`font-face-${fontFace}`, Boolean(fontFace)],

	);

/**
 * The template for the {@link @microsoft/fast-foundation#Text} component.
 *
 * @param context
 * @public
 */
export const TextTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Text> = () => html`<slot class="${getClasses}"></slot>`;
