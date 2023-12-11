// @ts-ignore
import tokensVivid2CompatCss from '../../../../dist/libs/styles/tokens/vivid-2-compat.css?raw';
// @ts-ignore
import coreThemeCss from '../../../../dist/libs/styles/core/theme.css?raw';
// @ts-ignore
import coreTypographyCss from '../../../../dist/libs/styles/core/typography.css?raw';

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
