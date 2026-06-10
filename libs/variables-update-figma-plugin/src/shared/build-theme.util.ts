import type { ThemeConfig } from '@shared/color-theme.type';
import { getTunedColorScale } from '@shared/get-tuned-color-scale.util';
import { shadowTokens } from '@shared/shadow-tokens.util';
import type { JSONTokenTree } from 'design-tokens-format-module';

export function buildThemeDtcg(config: ThemeConfig): JSONTokenTree {
	const steps = config.steps;

	const output = config.colors
		.map(({ name, baseColor, hueOverrides, chromaOverrides }) => {
			return getTunedColorScale({
				name,
				baseColor,
				hueOverrides,
				chromaOverrides,
				steps,
				isDarkMode: config.isDarkMode,
			});
		})
		.flat()
		.map(({ name, hex }) => [name, { $type: 'color', $value: hex }]);

	const tokens = Object.fromEntries(output);
	const shadows = shadowTokens(config);

	return {
		...tokens,
		...shadows,
		canvas: {
			type: '$color',
			$value: config.isDarkMode ? '#000000' : '#ffffff',
		},
	};
}
