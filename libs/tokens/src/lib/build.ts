
import StyleDictionary, { formatHelpers } from 'style-dictionary';

import { sourceOnly } from './filters/source-only';

import { shadowShorthand } from './transforms/shadow-shorthand';
import { fontShorthand } from './transforms/font-shorthand';
import { referenceSizingBase } from './transforms/reference-sizing-base';
import { referenceFontFamilies } from './transforms/reference-font-families';
import { resolveMath } from './transforms/resolve-math';

import { scssConstants } from './formatters/scss-constants';
import { sizingScssVariables } from './formatters/sizing-scss-variables';
import { suffixPxCssVariables } from './formatters/suffix-px-css-variables';

import { scssConstantsConfig } from './configurations/scss-constants';
import { getThemeConfig } from './configurations/theme';
import { getTypographyConfig } from './configurations/typography';
import { sizeConfig } from './configurations/size';

import themes from '@vonage/vivid-figma-tokens/data/$themes.json';


StyleDictionary
	.registerTransform(shadowShorthand)
	.registerTransform(fontShorthand)
	.registerTransform(resolveMath)
	.registerFilter(sourceOnly)
	.registerFormat(scssConstants)
	.registerFormat(sizingScssVariables)
	.registerFormat(suffixPxCssVariables)
	.registerTransform(referenceSizingBase)
	.registerTransform(referenceFontFamilies);


StyleDictionary
	.extend(scssConstantsConfig	).buildPlatform('scssConstants');

themes.forEach(({ name }) =>
	StyleDictionary.extend(getThemeConfig(name)).buildPlatform('web')
);

['desktop'/*, 'mobile'*/].forEach(viewport =>
	StyleDictionary
		.extend(getTypographyConfig(viewport))
		.buildAllPlatforms()
);

StyleDictionary
	.extend(sizeConfig)
	.buildAllPlatforms();
