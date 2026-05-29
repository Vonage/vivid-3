import type {
	DesignTokensFormat,
	TypographyToken,
	TypographyTokenValue,
} from 'figvar2dtcg';

export async function getTypographyTokens(): Promise<DesignTokensFormat> {
	const styles = await figma.getLocalTextStylesAsync();
	const out = {} as DesignTokensFormat;

	for (const style of styles) {
		const token: TypographyToken = {
			$type: 'typography',
			$value: {
				fontFamily: style.fontName.family,
				fontSize: {
					value: style.fontSize,
					unit: 'px',
				},
				lineHeight: Math.round(style.lineHeight.value / style.fontSize),
				letterSpacing: {
					value: style.letterSpacing.value,
					unit: 'px',
				},
				fontWeight: style.fontName.style,
			} as unknown as TypographyTokenValue,
		};

		const tokenName = style.name;

		out[tokenName] = token;
	}

	return out;
}
