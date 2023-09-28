import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { html } from '@microsoft/fast-element';
import { registerFactory } from '../../shared/design-system';
import { Value } from './value';

export const valueDefinition =
	Value.compose<FoundationElementDefinition>({
		baseName: 'value',
		template: html``,
	});

/**
 * @internal
 */
export const valueRegistries = [
	valueDefinition(),
];

/**
 * Registers the value element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerValue = registerFactory(
	valueRegistries
);
