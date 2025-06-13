import tokensVivid2CompatCss from '@repo/styles/tokens/vivid-2-compat.css?raw';
import coreThemeCss from '@repo/styles/core/theme.css?raw';
import coreTypographyCss from '@repo/styles/core/typography.css?raw';

export interface Style {
	name: string;
	css: string;
}

const theme: Style = {
	name: 'core/theme',
	css: coreThemeCss,
};

const typography: Style = {
	name: 'core/typography',
	css: coreTypographyCss,
};

const vivid2Compat: Style = {
	name: 'tokens/vivid-2-compat',
	css: tokensVivid2CompatCss,
};

export const optionalStyles = {
	theme,
	typography,
	vivid2Compat,
};
