import type { VariableResolvedDataType } from '@figma/plugin-typings/plugin-api-standalone';
import type { DesignToken } from 'design-tokens-format-module';

export function resolveVariableType(
	token: DesignToken
): VariableResolvedDataType | undefined {
	switch (token.$type) {
		case 'string':
		case 'fontFamily':
			return 'STRING';
		case 'boolean':
			return 'BOOLEAN';
		case 'color':
			return 'COLOR';
		case 'number':
		case 'duration':
		case 'dimension':
			return 'FLOAT';
	}
}
