import {html, ref, when} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type {Textfield} from './textfield';

function renderLabel() {
	return html<Textfield>`
	  <label for="control">
		  ${x => x.label}
	  </label>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Textfield} component.
 *
 * @param context
 * @public
 */
export const TextfieldTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Textfield> = () => html<Textfield>`
	<template>
		${when(x => x.label, renderLabel())}
	</template>`;
