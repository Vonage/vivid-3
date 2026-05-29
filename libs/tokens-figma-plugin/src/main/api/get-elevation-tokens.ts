import {
	type DesignTokensFormat,
	type ShadowStop,
	type ShadowToken,
	rgbaToHexa,
} from 'figvar2dtcg';

export async function getElevationTokens(): Promise<DesignTokensFormat> {
	const styles = await figma.getLocalEffectStylesAsync();
	const out: Record<string, ShadowToken> = {};

	for (const style of styles) {
		const stops: ShadowStop[] = [];

		for (const effect of style.effects) {
			if (effect.type === 'DROP_SHADOW') {
				stops.push({
					blur: effect.radius,
					color: rgbaToHexa(effect.color),
					spread: effect.spread,
					offsetX: effect.offset.x,
					offsetY: effect.offset.y,
				} as unknown as ShadowStop);
			}
		}
		const token: ShadowToken = {
			$type: 'shadow',
			$value: stops,
		};

		out[style.name] = token;
	}

	return out;
}
