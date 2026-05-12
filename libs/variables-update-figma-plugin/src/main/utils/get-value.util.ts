import { hexToRgba } from '@main/utils/hex-to-rgba.util';
import type { DesignToken } from 'design-tokens-format-module';

export async function getValue(
	token: DesignToken
): Promise<VariableValue | undefined> {
	switch (token.$type) {
		case 'string':
		case 'fontFamily':
			return token.$value;
		case 'boolean':
			return typeof token.$value === 'boolean'
				? token.$value
				: token.$value === 'true';
		case 'color':
			const rgbaValue = hexToRgba(token.$value as string);
			if (rgbaValue) return rgbaValue;
			break;
		case 'number':
		case 'duration':
		case 'dimension':
			return typeof token.$value === 'number'
				? token.$value
				: Number.parseFloat(token.$value as string);
	}
}
