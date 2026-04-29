import {
	Hct,
	argbFromHex,
	hexFromArgb,
} from '@material/material-color-utilities';
import type { ThemeConfig } from '@shared/color-theme.type';
import { hexaToFigmaRgba } from '@shared/hexa-to-figma-rgba.util';
import { rgbaToHexa } from '@shared/rgba-to-hexa.util';
import type { DesignToken } from 'design-tokens-format-module';

export function shadowTokens(themeConfig: ThemeConfig) {
	const neutralScale = themeConfig.colors[0];
	const color = Hct.fromInt(argbFromHex(neutralScale.baseColor));
	color.tone = themeConfig.isDarkMode ? 2 : 80;
	const hex = hexFromArgb(color.toInt());
	const rgba = hexaToFigmaRgba(hex);
	const shadows: Record<string, DesignToken> = {};

	let index = 0;
	for (const step of themeConfig.steps) {
		const alpha = step / 100;
		const token: DesignToken = {
			$type: 'color',
			$value: rgbaToHexa({ ...rgba, a: alpha }),
		};

		shadows[`_technical/shadow/${(index + 1) * 100}`] = token;
		index++;
	}

	return shadows;
}
